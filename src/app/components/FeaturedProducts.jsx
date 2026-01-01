'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import products from './productsStore'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { FaShoppingCart, FaHeart, FaStar, FaMinus, FaPlus } from 'react-icons/fa'
import { formatPrice } from '../lib/currency'

const FeaturedProducts = () => {
    const { cart, addToCart, updateQuantity, addToWishlist, isInWishlist, removeFromWishlist } = useCart()
    const { showToast } = useToast()
    const featuredProducts = products.slice(0, 8)

    const getCartQuantity = (productId) => {
        const item = cart.find(item => item.id === productId && item.type === 'products')
        return item ? item.quantity : 0
    }

    const handleAddToCart = (product) => {
        addToCart({ ...product, type: 'products' })
        showToast(`${product.name} added to cart!`, 'success')
    }

    const handleQuantityChange = (product, change) => {
        const currentQty = getCartQuantity(product.id)
        const newQty = currentQty + change

        if (newQty <= 0) {
            updateQuantity(product.id, 'products', 0)
            showToast(`${product.name} removed from cart`, 'success')
        } else {
            updateQuantity(product.id, 'products', newQty)
            showToast(`Quantity updated to ${newQty}`, 'success')
        }
    }

    const handleWishlistToggle = (product, inWishlist) => {
        if (inWishlist) {
            removeFromWishlist(product.id, 'products')
            showToast(`${product.name} removed from wishlist`, 'success')
        } else {
            addToWishlist({ ...product, type: 'products' })
            showToast(`${product.name} added to wishlist!`, 'success')
        }
    }

    return (
        <div className='bg-gradient-to-b from-white to-slate-50 py-20'>
            <div className='lg:px-40 md:px-20 px-7'>
                <div className='flex justify-between items-center mb-12'>
                    <div>
                        <h3 className='text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Featured Products</h3>
                        <p className='text-gray-600 text-lg'>Handpicked favorites from our collection</p>
                    </div>
                    <Link href='/products' className='font-semibold py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition duration-300 shadow-md hover:shadow-lg'>
                        View All Products
                    </Link>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {featuredProducts.map((product) => {
                        const inWishlist = isInWishlist(product.id, 'products')
                        const quantity = getCartQuantity(product.id)
                        const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0

                        return (
                            <div key={product.id} className='bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                                <Link href={`/products/${product.slug}`} className='relative block'>
                                    {discount > 0 && (
                                        <div className='absolute top-3 left-3 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold'>
                                            -{discount}%
                                        </div>
                                    )}
                                    <Image
                                        src={product.img}
                                        alt={product.name}
                                        className='w-full h-48 object-cover transition-transform group-hover:scale-110 duration-300'
                                    />
                                    <div className='absolute top-3 right-3'>
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault()
                                                handleWishlistToggle(product, inWishlist)
                                            }}
                                            className={`p-2 rounded-full bg-white shadow-md transition ${inWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                                }`}
                                        >
                                            <FaHeart className={inWishlist ? 'fill-current' : ''} />
                                        </button>
                                    </div>
                                </Link>
                                <div className='p-4'>
                                    <div className='mb-1'>
                                        <span className='text-xs text-indigo-600 font-semibold uppercase'>{product.category}</span>
                                    </div>
                                    <Link href={`/products/${product.slug}`}>
                                        <h3 className='font-semibold mb-1 hover:text-indigo-600 transition line-clamp-2 text-sm'>{product.name}</h3>
                                    </Link>
                                    <div className='flex items-center gap-1 mb-2'>
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={i < Math.floor(product.rating) ? 'text-yellow-400 text-xs' : 'text-gray-300 text-xs'}
                                            />
                                        ))}
                                        <span className='text-xs text-gray-500 ml-1'>({product.rating})</span>
                                    </div>
                                    <div className='flex items-center gap-2 mb-3'>
                                        <span className='text-lg font-bold text-indigo-600'>{formatPrice(product.price)}</span>
                                        {product.originalPrice && (
                                            <span className='text-xs text-gray-400 line-through'>{formatPrice(product.originalPrice)}</span>
                                        )}
                                    </div>
                                    {quantity > 0 ? (
                                        <div className='flex items-center justify-center gap-3 border-2 border-indigo-500 rounded-lg p-2'>
                                            <button
                                                onClick={() => handleQuantityChange(product, -1)}
                                                className='p-1 hover:bg-indigo-50 rounded transition'
                                            >
                                                <FaMinus className='text-sm text-indigo-600' />
                                            </button>
                                            <span className='font-semibold text-indigo-600 min-w-[30px] text-center'>{quantity}</span>
                                            <button
                                                onClick={() => handleQuantityChange(product, 1)}
                                                className='p-1 hover:bg-indigo-50 rounded transition'
                                            >
                                                <FaPlus className='text-sm text-indigo-600' />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className='w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition font-medium text-sm shadow-md hover:shadow-lg'
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <FaShoppingCart />
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FeaturedProducts
