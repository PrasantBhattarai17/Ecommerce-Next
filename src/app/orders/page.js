'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaReceipt } from 'react-icons/fa'
import { formatPrice } from '../lib/currency'

export default function OrdersPage() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
            setOrders(savedOrders.reverse()) // Most recent first
        }
    }, [])

    if (orders.length === 0) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center lg:px-40 md:px-20 px-7 py-20'>
                <FaReceipt className='text-6xl text-gray-300 mb-6' />
                <h1 className='text-4xl font-semibold mb-4'>No Orders Yet</h1>
                <p className='text-xl opacity-80 mb-8'>Your order history will appear here.</p>
                <Link href='/' className='py-3 px-7 text-white rounded-md bg-indigo-500 font-medium hover:bg-indigo-600 transition duration-300'>
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className='min-h-screen lg:px-40 md:px-20 px-7 py-20'>
            <h1 className='text-4xl font-semibold mb-8'>Order History</h1>

            <div className='space-y-6'>
                {orders.map((order) => (
                    <div key={order.orderId} className='bg-white rounded-lg shadow-md p-6'>
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                            <div>
                                <h2 className='text-xl font-semibold mb-2'>Order #{order.orderId}</h2>
                                <p className='text-gray-600 text-sm'>
                                    {new Date(order.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            <div className='mt-4 md:mt-0 text-right'>
                                <p className='text-2xl font-bold text-indigo-600'>{formatPrice(order.total)}</p>
                                <span className='inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mt-2'>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        <div className='border-t pt-4 mb-4'>
                            <h3 className='font-semibold mb-3'>Items ({order.items.length})</h3>
                            <div className='space-y-2'>
                                {order.items.map((item, index) => (
                                    <div key={index} className='flex justify-between text-sm'>
                                        <span>
                                            {item.name} <span className='text-gray-500'>x{item.quantity}</span>
                                        </span>
                                        <span>{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <Link
                                href={`/order-confirmation/${order.orderId}`}
                                className='py-2 px-4 text-indigo-600 border border-indigo-500 rounded-lg hover:bg-indigo-50 transition font-medium'
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

