import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import { convertToNpr } from '@/app/lib/currency'
import sql from 'mssql'

export async function POST(request) {
    try {
        const body = await request.json()
        const { orderData, items } = body
        const {
            userId,
            total,
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            state,
            zipCode,
            country,
            paymentMethod,
            orderId // We might generate this here or use the one from client
        } = orderData

        if (!userId || !items || items.length === 0) {
            return NextResponse.json({ error: 'Invalid order data' }, { status: 400 })
        }


        const pool = await connectDB()
        const transaction = new sql.Transaction(pool)

        try {
            await transaction.begin()

            // Convert total to NPR
            const totalInNpr = convertToNpr(total)

            // 1. Create Order
            const orderRequest = new sql.Request(transaction)
            orderRequest.input('orderId', sql.NVarChar, orderId)
            orderRequest.input('userId', sql.Int, userId)
            orderRequest.input('total', sql.Decimal(10, 2), total)
            orderRequest.input('status', sql.NVarChar, 'pending')
            orderRequest.input('firstName', sql.NVarChar, firstName)
            orderRequest.input('lastName', sql.NVarChar, lastName)
            orderRequest.input('email', sql.NVarChar, email)
            orderRequest.input('phone', sql.NVarChar, phone)
            orderRequest.input('address', sql.NVarChar, address)
            orderRequest.input('city', sql.NVarChar, city)
            orderRequest.input('state', sql.NVarChar, state)
            orderRequest.input('zipCode', sql.NVarChar, zipCode)
            orderRequest.input('country', sql.NVarChar, country)
            orderRequest.input('paymentMethod', sql.NVarChar, paymentMethod)

            const orderResult = await orderRequest.query(`
                INSERT INTO Orders (OrderId, UserId, Total, Status, FirstName, LastName, Email, Phone, Address, City, State, ZipCode, Country, PaymentMethod)
                OUTPUT INSERTED.Id
                VALUES (@orderId, @userId, @total, @status, @firstName, @lastName, @email, @phone, @address, @city, @state, @zipCode, @country, @paymentMethod)
            `)

            const dbOrderId = orderResult.recordset[0].Id

            // 2. Create Order Items
            for (const item of items) {
                const itemRequest = new sql.Request(transaction)
                itemRequest.input('orderId', sql.Int, dbOrderId)
                itemRequest.input('productId', sql.Int, item.id)
                itemRequest.input('productName', sql.NVarChar, item.name)
                itemRequest.input('productImage', sql.NVarChar, item.img || item.image)
                itemRequest.input('price', sql.Decimal(10, 2), item.price)
                itemRequest.input('quantity', sql.Int, item.quantity)
                itemRequest.input('subtotal', sql.Decimal(10, 2), item.price * item.quantity)

                await itemRequest.query(`
                    INSERT INTO OrderItems (OrderId, ProductId, ProductName, ProductImage, Price, Quantity, Subtotal)
                    VALUES (@orderId, @productId, @productName, @productImage, @price, @quantity, @subtotal)
                `)
            }

            // 3. If eSewa, prepare payment
            if (paymentMethod === 'esewa') {
                try {
                    const crypto = require('crypto');
                    const esewaSecretKey = '8gBm/:&EnhH.1/q';
                    const esewaProductCode = process.env.ESEWA_PRODUCT_CODE || 'EPAYTEST';
                    const esewaBaseUrl = process.env.ESEWA_BASE_URL || 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

                    const totalInNpr = convertToNpr(total);
                    // eSewa v2 signature: total_amount,transaction_uuid,product_code
                    const amountStr = totalInNpr.toFixed(1);
                    const signatureString = `total_amount=${amountStr},transaction_uuid=${orderId},product_code=${esewaProductCode}`;
                    const signature = crypto.createHmac('sha256', esewaSecretKey)
                        .update(signatureString)
                        .digest('base64');

                    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

                    const esewaParams = {
                        amount: amountStr,
                        tax_amount: "0",
                        total_amount: amountStr,
                        transaction_uuid: orderId,
                        product_code: esewaProductCode,
                        product_service_charge: "0",
                        product_delivery_charge: "0",
                        success_url: `${origin}/api/payment/esewa/callback`,
                        failure_url: `${origin}/checkout?error=payment_failed`,
                        signed_field_names: "total_amount,transaction_uuid,product_code",
                        signature: signature
                    };

                    await transaction.commit();

                    // We'll return a helper URL that will render a form and auto-submit it to eSewa
                    // This keeps the client-side logic simple (just a redirect)
                    const queryString = new URLSearchParams(esewaParams).toString();
                    const paymentUrl = `${esewaBaseUrl}?${queryString}`;

                    // Actually eSewa v2 accepts GET too for initiation (even though docs say POST)
                    // But to be safe, we can return the params and the URL
                    return NextResponse.json({
                        success: true,
                        payment_url: paymentUrl,
                        params: esewaParams
                    });

                } catch (esewaError) {
                    console.error('eSewa Initiation Failed:', esewaError.message);
                    throw new Error('eSewa payment initiation failed');
                }
            }

            await transaction.commit()
            return NextResponse.json({ success: true, orderId })

        } catch (error) {
            await transaction.rollback()
            throw error
        }
    } catch (error) {
        console.error('Order creation error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
