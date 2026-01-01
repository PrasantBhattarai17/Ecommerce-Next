import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import sql from 'mssql'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const pidx = searchParams.get('pidx')
        const status = searchParams.get('status')
        const purchase_order_id = searchParams.get('purchase_order_id')
        const transaction_id = searchParams.get('transaction_id')

        if (!pidx) {
            return NextResponse.json({ error: 'Missing pidx' }, { status: 400 })
        }

        // 1. Verify with Khalti
        const khaltiResponse = await fetch(`${process.env.KHALTI_BASE_URL}/epayment/lookup/`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pidx })
        })

        const khaltiData = await khaltiResponse.json()

        const pool = await connectDB()

        if (khaltiResponse.ok && khaltiData.status === 'Completed') {
            // Update Order Status in DB
            const request = pool.request()
            request.input('pidx', sql.NVarChar, pidx)
            request.input('tid', sql.NVarChar, khaltiData.transaction_id || transaction_id)
            request.input('orderId', sql.NVarChar, purchase_order_id)

            await request.query(`
                UPDATE Orders 
                SET Status = 'completed', 
                    KhaltiTransactionId = @tid 
                WHERE OrderId = @orderId OR KhaltiPidx = @pidx
            `)

            // Redirect to success page
            return NextResponse.redirect(new URL(`/order-confirmation/${purchase_order_id || pidx}`, request.url))
        } else {
            // Update Order Status to failed
            const request = pool.request()
            request.input('pidx', sql.NVarChar, pidx)
            await request.query(`
                UPDATE Orders SET Status = 'failed' WHERE KhaltiPidx = @pidx
            `)

            // Redirect to failure page or back to checkout
            return NextResponse.redirect(new URL(`/checkout?error=payment_failed&pidx=${pidx}`, request.url))
        }

    } catch (error) {
        console.error('Khalti callback error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
