import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import sql from 'mssql'
import crypto from 'crypto'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const encodedData = searchParams.get('data')

        if (!encodedData) {
            return NextResponse.json({ error: 'Missing data parameter' }, { status: 400 })
        }

        // 1. Decode the data
        const decodedDataString = Buffer.from(encodedData, 'base64').toString('utf-8')
        const decodedData = JSON.parse(decodedDataString)

        const {
            transaction_code,
            status,
            total_amount,
            transaction_uuid,
            product_code,
            signed_field_names,
            signature
        } = decodedData

        // 2. Verify Signature
        // eSewa UAT secret key is specific: 8gBm/:&EnhH.1/q
        const esewaSecretKey = '8gBm/:&EnhH.1/q';

        const fields = signed_field_names.split(',')
        const message = fields.map(field => `${field}=${decodedData[field]}`).join(',')

        const localSignature = crypto.createHmac('sha256', esewaSecretKey)
            .update(message)
            .digest('base64')

        const isSignatureValid = localSignature === signature
        const isSuccess = isSignatureValid && status.toUpperCase() === 'COMPLETE'

        const pool = await connectDB()

        if (isSuccess) {
            // Update Order Status in DB
            const sqlRequest = pool.request()
            sqlRequest.input('tid', sql.NVarChar, transaction_code)
            sqlRequest.input('orderId', sql.NVarChar, transaction_uuid)

            await sqlRequest.query(`
                UPDATE Orders 
                SET Status = 'completed', 
                    EsewaStatus = 'COMPLETE',
                    EsewaTransactionCode = @tid 
                WHERE OrderId = @orderId
            `)

            // Redirect to success page
            return NextResponse.redirect(new URL(`/order-confirmation/${transaction_uuid}`, request.url))
        } else {
            // Update Order Status to failed
            const sqlRequest = pool.request()
            sqlRequest.input('orderId', sql.NVarChar, transaction_uuid)
            await sqlRequest.query(`
                UPDATE Orders SET Status = 'failed' WHERE OrderId = @orderId
            `)

            // Redirect back to checkout
            return NextResponse.redirect(new URL(`/checkout?error=payment_failed&orderId=${transaction_uuid}`, request.url))
        }

    } catch (error) {
        console.error('eSewa callback error details:', {
            message: error.message,
            stack: error.stack
        })
        return NextResponse.json({
            error: 'Internal server error',
            details: error.message
        }, { status: 500 })
    }
}
