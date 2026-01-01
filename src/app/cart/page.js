'use client'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import Image from 'next/image'
import Link from 'next/link'
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import { formatPrice } from '../lib/currency'

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()
    const { showToast } = useToast()

    const handleRemove = (item) => {
        removeFromCart(item.id, item.type)
        showToast(`${item.name} removed from cart`, 'success')
    }

    const handleQuantityChange = (item, change) => {
        const newQty = item.quantity + change
        if (newQty <= 0) {
            handleRemove(item)
        } else {
            updateQuantity(item.id, item.type, newQty)
            showToast(`Quantity updated to ${newQty}`, 'success')
        }
    }

    const handleClearCart = () => {
        clearCart()
        showToast('Cart cleared', 'success')
    }

    if (cart.length === 0) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center lg:px-40 md:px-20 px-7 py-20'>
                <h1 className='text-4xl font-semibold mb-6'>Your Cart is Empty</h1>
                <p className='text-xl opacity-80 mb-8'>Start adding products to your cart!</p>
                <div className='flex gap-4'>
                    <Link href='/products' className='py-3 px-7 text-white rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 font-medium hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-md'>
                        Browse Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen lg:px-40 md:px-20 px-7 py-20 bg-gradient-to-b from-slate-50 to-white'>
            <h1 className='text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Shopping Cart</h1>

            <div className='flex flex-col lg:flex-row gap-8'>
                <div className='flex-1'>
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                        {cart.map((item) => (
                            <div key={`${item.type}-${item.id}`} className='flex flex-col sm:flex-row gap-4 py-6 border-b last:border-b-0'>
                                <Link href={`/products/${item.slug}`} className='flex-shrink-0'>
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        width={150}
                                        height={150}
                                        className='rounded-lg object-cover'
                                    />
                                </Link>
                                <div className='flex-1 flex flex-col justify-between'>
                                    <div>
                                        <Link href={`/products/${item.slug}`}>
                                            <h3 className='text-xl font-semibold hover:text-indigo-600 transition'>{item.name}</h3>
                                        </Link>
                                        <p className='text-sm text-gray-500 capitalize mt-1'>{item.category || item.type}</p>
                                        <p className='text-lg font-semibold text-indigo-600 mt-2'>{formatPrice(item.price)}</p>
                                    </div>
                                    <div className='flex items-center gap-4 mt-4'>
                                        <div className='flex items-center gap-3 border rounded-lg'>
                                            <button
                                                onClick={() => handleQuantityChange(item, -1)}
                                                className='p-2 hover:bg-gray-100 transition'
                                            >
                                                <FaMinus className='text-sm' />
                                            </button>
                                            <span className='px-4 py-2 font-semibold'>{item.quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(item, 1)}
                                                className='p-2 hover:bg-gray-100 transition'
                                            >
                                                <FaPlus className='text-sm' />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => handleRemove(item)}
                                            className='p-2 text-red-500 hover:bg-red-50 rounded transition'
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <p className='text-xl font-semibold'>{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            </div>
                        ))}
                        <div className='mt-6 pt-6 border-t flex justify-between items-center'>
                            <button
                                onClick={handleClearCart}
                                className='text-red-500 hover:text-red-700 font-medium transition'
                            >
                                Clear Cart
                            </button>
                            <Link href='/' className='text-indigo-600 hover:text-indigo-800 font-medium transition'>
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='lg:w-96 w-full'>
                    <div className='bg-white rounded-xl shadow-lg p-6 sticky top-20 border-2 border-indigo-100'>
                        <h2 className='text-2xl font-semibold mb-6'>Order Summary</h2>
                        <div className='space-y-4 mb-6'>
                            <div className='flex justify-between'>
                                <span>Subtotal</span>
                                <span>{formatPrice(getCartTotal())}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Tax</span>
                                <span>{formatPrice(getCartTotal() * 0.1)}</span>
                            </div>
                            <div className='border-t pt-4 flex justify-between font-semibold text-lg'>
                                <span>Total</span>
                                <span>{formatPrice(getCartTotal() * 1.1)}</span>
                            </div>
                        </div>
                        <Link
                            href='/checkout'
                            className='block w-full py-3 px-6 text-center text-white rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg'
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

