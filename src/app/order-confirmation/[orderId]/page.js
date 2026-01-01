'use client'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { useCart } from '../../context/CartContext'
import { formatPrice } from '../../lib/currency'

export default function OrderConfirmationPage() {
    const params = useParams()
    const searchParams = useSearchParams()
    const { clearCart } = useCart()
    const orderId = params.orderId
    const pidx = searchParams.get('pidx')

    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const query = orderId ? `orderId=${orderId}` : `pidx=${pidx}`
                const response = await fetch(`/api/orders/details?${query}`)
                const data = await response.json()

                if (response.ok) {
                    setOrder(data)
                    // Clear cart on success
                    if (data.Status === 'completed' || data.status === 'completed') {
                        clearCart()
                    }
                } else {
                    setError(data.error || 'Order not found')
                }
            } catch (err) {
                setError('Failed to fetch order details')
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [orderId, pidx, clearCart])

    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
            </div>
        )
    }

    if (error || !order) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center lg:px-40 md:px-20 px-7 py-20'>
                <FaTimesCircle className='text-6xl text-red-500 mb-6' />
                <h1 className='text-4xl font-semibold mb-4'>{error || 'Order Not Found'}</h1>
                <Link href='/' className='text-indigo-600 hover:text-indigo-800 font-medium'>
                    Return to Home
                </Link>
            </div>
        )
    }

    const isSuccess = order.Status === 'completed' || order.status === 'completed'

    return (
        <div className='min-h-screen lg:px-40 md:px-20 px-7 py-20'>
            <div className='max-w-3xl mx-auto'>
                <div className='text-center mb-12'>
                    <div className='flex justify-center mb-6'>
                        <div className={`${isSuccess ? 'bg-green-100' : 'bg-yellow-100'} rounded-full p-6`}>
                            {isSuccess ? (
                                <FaCheckCircle className='text-6xl text-green-500' />
                            ) : (
                                <div className='animate-pulse'><FaCheckCircle className='text-6xl text-yellow-500' /></div>
                            )}
                        </div>
                    </div>
                    <h1 className='text-4xl font-semibold mb-4'>
                        {isSuccess ? 'Order Confirmed!' : 'Order Pending'}
                    </h1>
                    <p className='text-xl text-gray-600 mb-2'>
                        {isSuccess ? 'Thank you for your purchase' : 'We are waiting for payment confirmation'}
                    </p>
                    <p className='text-gray-500'>Order ID: <span className='font-semibold'>{order.OrderId || order.orderId}</span></p>
                </div>

                <div className='bg-white rounded-xl shadow-lg border border-slate-100 p-8 mb-8'>
                    <h2 className='text-2xl font-bold mb-6 text-gray-800'>Order Details</h2>
                    <div className='space-y-4 mb-6'>
                        {order.items.map((item, index) => (
                            <div key={index} className='flex justify-between items-center py-4 border-b border-slate-50 last:border-b-0'>
                                <div className='flex items-center gap-4'>
                                    {item.ProductImage && (
                                        <img src={item.ProductImage} alt={item.ProductName} className='w-16 h-16 object-cover rounded-lg' />
                                    )}
                                    <div>
                                        <h3 className='font-bold text-gray-800'>{item.ProductName}</h3>
                                        <p className='text-sm text-gray-500'>Quantity: {item.Quantity}</p>
                                    </div>
                                </div>
                                <p className='font-bold text-gray-900'>{formatPrice(item.Price * item.Quantity)}</p>
                            </div>
                        ))}
                    </div>
                    <div className='border-t border-slate-100 pt-6 space-y-3 font-medium'>
                        <div className='flex justify-between text-gray-500'>
                            <span>Subtotal</span>
                            <span>{formatPrice(order.Total / 1.1)}</span>
                        </div>
                        <div className='flex justify-between text-gray-500'>
                            <span>Tax (10%)</span>
                            <span>{formatPrice(order.Total - (order.Total / 1.1))}</span>
                        </div>
                        <div className='flex justify-between font-bold text-xl text-gray-900 border-t border-slate-100 pt-4'>
                            <span>Total Paid</span>
                            <span>{formatPrice(order.Total)}</span>
                        </div>
                    </div>
                </div>

                <div className='bg-white rounded-xl shadow-lg border border-slate-100 p-8 mb-8'>
                    <h2 className='text-2xl font-bold mb-6 text-gray-800'>Shipping Information</h2>
                    <div className='grid md:grid-cols-2 gap-8 text-gray-700'>
                        <div>
                            <p className='text-xs font-bold text-slate-400 uppercase mb-1'>Customer</p>
                            <p className='font-medium text-gray-900'>{order.FirstName} {order.LastName}</p>
                            <p className='text-sm'>{order.Email}</p>
                            <p className='text-sm'>{order.Phone}</p>
                        </div>
                        <div>
                            <p className='text-xs font-bold text-slate-400 uppercase mb-1'>Address</p>
                            <p className='font-medium text-gray-900'>{order.Address}</p>
                            <p className='text-sm'>{order.City}, {order.State} {order.ZipCode}</p>
                            <p className='text-sm'>{order.Country}</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                    <Link
                        href='/profile'
                        className='py-4 px-8 text-white rounded-full bg-indigo-600 font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 text-center'
                    >
                        View My Orders
                    </Link>
                    <Link
                        href='/'
                        className='py-4 px-8 rounded-full text-indigo-600 font-bold border-2 border-indigo-600 hover:bg-indigo-50 transition text-center'
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}


