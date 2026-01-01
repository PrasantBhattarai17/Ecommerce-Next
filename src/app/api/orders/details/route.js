import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/db'
import sql from 'mssql'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const orderId = searchParams.get('orderId')
        const pidx = searchParams.get('pidx')

        if (!orderId && !pidx) {
            return NextResponse.json({ error: 'Order ID or pidx is required' }, { status: 400 })
        }

        const pool = await connectDB()
        const dbRequest = pool.request()

        let query = 'SELECT * FROM Orders WHERE 1=1'
        if (orderId) {
            dbRequest.input('orderId', sql.NVarChar, orderId)
            query += ' AND OrderId = @orderId'
        } else if (pidx) {
            dbRequest.input('pidx', sql.NVarChar, pidx)
            query += ' AND KhaltiPidx = @pidx'
        }

        const orderResult = await dbRequest.query(query)

        if (orderResult.recordset.length === 0) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 })
        }

        const order = orderResult.recordset[0]

        // Fetch items
        const itemsRequest = pool.request()
        itemsRequest.input('dbOrderId', sql.Int, order.Id)
        const itemsResult = await itemsRequest.query('SELECT * FROM OrderItems WHERE OrderId = @dbOrderId')

        return NextResponse.json({
            ...order,
            items: itemsResult.recordset
        })
    } catch (error) {
        console.error('Fetch order error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
