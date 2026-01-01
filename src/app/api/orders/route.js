import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
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

        const CONVERSION_RATE = 130

        const pool = await connectDB()
        const transaction = new sql.Transaction(pool)

        try {
            await transaction.begin()

            // Convert total to NPR
            const totalInNpr = total * CONVERSION_RATE

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

            // 3. If Khalti, initiate payment
            if (paymentMethod === 'khalti') {
                const payload = {
                    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/khalti/callback`,
                    website_url: process.env.NEXT_PUBLIC_APP_URL,
                    amount: Math.round(totalInNpr * 100), // convert to paisa
                    purchase_order_id: orderId,
                    purchase_order_name: `Order #${orderId}`,
                    customer_info: {
                        name: `${firstName} ${lastName}`,
                        email: email,
                        phone: phone
                    }
                }

                console.log('Initiating Khalti payment with payload:', JSON.stringify(payload, null, 2))

                const khaltiResponse = await fetch(`${process.env.KHALTI_BASE_URL}/epayment/initiate/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })

                const khaltiData = await khaltiResponse.json()
                console.log('Khalti response:', JSON.stringify(khaltiData, null, 2))

                if (khaltiResponse.ok && khaltiData.pidx) {
                    // Update order with pidx
                    const updateRequest = new sql.Request(transaction)
                    updateRequest.input('pidx', sql.NVarChar, khaltiData.pidx)
                    updateRequest.input('orderId', sql.Int, dbOrderId)
                    await updateRequest.query(`
                        UPDATE Orders SET KhaltiPidx = @pidx WHERE Id = @orderId
                    `)

                    await transaction.commit()
                    return NextResponse.json({
                        success: true,
                        pidx: khaltiData.pidx,
                        payment_url: khaltiData.payment_url
                    })
                } else {
                    throw new Error(khaltiData.message || 'Khalti initiation failed')
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
