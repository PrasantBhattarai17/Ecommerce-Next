'use client'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import Image from 'next/image'
import Link from 'next/link'
import { FaTrash, FaShoppingCart, FaHeart } from 'react-icons/fa'
import { formatPrice } from '../lib/currency'

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, addToCart } = useCart()
    const { showToast } = useToast()

    const handleRemove = (item) => {
        removeFromWishlist(item.id, item.type)
        showToast(`${item.name} removed from wishlist`, 'success')
    }

    const handleAddToCart = (item) => {
        addToCart({ ...item, type: item.type })
        removeFromWishlist(item.id, item.type)
        showToast(`${item.name} added to cart!`, 'success')
    }

    if (wishlist.length === 0) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center lg:px-40 md:px-20 px-7 py-20'>
                <FaHeart className='text-6xl text-gray-300 mb-6' />
                <h1 className='text-4xl font-semibold mb-4'>Your Wishlist is Empty</h1>
                <p className='text-xl opacity-80 mb-8'>Start adding products to your wishlist!</p>
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
            <h1 className='text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>My Wishlist</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {wishlist.map((item) => (
                    <div key={`${item.type}-${item.id}`} className='bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                        <Link href={`/products/${item.slug}`} className='relative block'>
                            <Image
                                src={item.img}
                                alt={item.name}
                                className='w-full h-64 object-cover transition-transform group-hover:scale-105'
                            />
                            <div className='absolute top-4 right-4'>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault()
                                        handleRemove(item)
                                    }}
                                    className='p-2 rounded-full bg-white shadow-md text-red-500 hover:bg-red-50 transition'
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </Link>
                        <div className='p-6'>
                            <div className='mb-2'>
                                <span className='text-xs text-indigo-600 font-medium capitalize'>{item.category || item.type}</span>
                            </div>
                            <Link href={`/products/${item.slug}`}>
                                <h3 className='text-xl font-semibold mb-2 hover:text-indigo-600 transition'>{item.name}</h3>
                            </Link>
                            <p className='text-gray-600 text-sm mb-4 line-clamp-2'>{item.description}</p>
                            <div className='flex items-center justify-between mb-4'>
                                <span className='text-2xl font-bold text-indigo-600'>{formatPrice(item.price)}</span>
                                <div className='flex items-center gap-1'>
                                    <span className='text-yellow-400'>★</span>
                                    <span className='text-sm text-gray-600'>{item.rating}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAddToCart(item)}
                                className='w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition font-semibold shadow-md hover:shadow-lg'
                            >
                                <FaShoppingCart />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

