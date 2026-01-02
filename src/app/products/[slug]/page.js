'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { fetchAllProducts } from '../../services/productApi'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import { FaStar, FaHeart, FaShoppingCart, FaTruck, FaShieldAlt, FaUndo, FaSpinner } from 'react-icons/fa'
import { formatPrice } from '../../lib/currency'

export default function ProductDetailPage() {
    const params = useParams()
    const slug = params.slug
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart()
    const { showToast } = useToast()

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true)
                const products = await fetchAllProducts()
                // Use a more robust slug comparison
                const foundProduct = products.find(p => p.slug === slug || p.slug.includes(slug) || slug.includes(p.slug))
                setProduct(foundProduct)
            } catch (error) {
                console.error('Error loading product:', error)
                showToast('Failed to load product. Please try again later.', 'error')
            } finally {
                setLoading(false)
            }
        }
        loadProduct()
    }, [slug, showToast])

    if (loading) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center'>
                <FaSpinner className='text-4xl text-indigo-600 animate-spin mb-4' />
                <p className='text-gray-600'>Loading product...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-semibold mb-4'>Product Not Found</h1>
                <Link href='/products' className='text-indigo-600 hover:text-indigo-800'>
                    Back to Products
                </Link>
            </div>
        )
    }

    const inWishlist = isInWishlist(product.id, 'products')

    const handleAddToCart = () => {
        addToCart({ ...product, type: 'products' })
        showToast(`${product.name} added to cart!`, 'success')
    }

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(product.id, 'products')
            showToast(`${product.name} removed from wishlist`, 'success')
        } else {
            addToWishlist({ ...product, type: 'products' })
            showToast(`${product.name} added to wishlist!`, 'success')
        }
    }

    return (
        <div className='min-h-screen lg:px-40 md:px-20 px-7 py-20 bg-gradient-to-b from-slate-50 to-white'>
            <div className='mb-6'>
                <Link href='/products' className='text-indigo-600 hover:text-indigo-800 font-medium'>
                    ← Back to Products
                </Link>
            </div>

            <div className='flex flex-col lg:flex-row gap-12 mb-16'>
                <div className='lg:w-1/2'>
                    <div className='relative rounded-2xl overflow-hidden shadow-2xl bg-white p-4'>
                        <div className='relative w-full h-[500px]'>
                            <Image
                                src={product.img}
                                alt={product.name}
                                fill
                                className='object-contain rounded-xl'
                            />
                        </div>
                    </div>
                </div>

                <div className='lg:w-1/2'>
                    <div className='mb-4'>
                        <span className='inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold uppercase tracking-wide'>
                            {product.category}
                        </span>
                    </div>
                    <h1 className='text-4xl font-bold mb-4'>{product.name}</h1>

                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex items-center gap-1'>
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className={i < Math.floor(product.rating) ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}
                                />
                            ))}
                        </div>
                        <span className='text-gray-600 text-lg'>({product.rating.toFixed(1)})</span>
                        <span className='text-gray-600'>{product.reviews} reviews</span>
                    </div>

                    <div className='flex items-center gap-4 mb-6'>
                        <span className='text-4xl font-bold text-indigo-600'>{formatPrice(product.price)}</span>
                    </div>

                    <p className='text-lg text-gray-700 mb-8 leading-relaxed'>{product.description}</p>

                    <div className='flex gap-4 mb-8'>
                        <button
                            onClick={handleAddToCart}
                            className='flex-1 flex items-center justify-center gap-3 py-4 px-6 text-white rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:from-indigo-600 hover:to-purple-700 transition shadow-lg hover:shadow-xl text-lg'
                        >
                            <FaShoppingCart />
                            Add to Cart
                        </button>
                        <button
                            onClick={handleWishlistToggle}
                            className={`p-4 rounded-xl border-2 transition duration-300 ${inWishlist
                                ? 'bg-red-50 border-red-500 text-red-600'
                                : 'border-gray-300 hover:border-red-500'
                                }`}
                        >
                            <FaHeart className={`text-2xl ${inWishlist ? 'fill-current' : ''}`} />
                        </button>
                    </div>

                    {product.inStock ? (
                        <p className='text-green-600 font-semibold mb-8 text-lg flex items-center gap-2'>
                            <span className='text-2xl'>✓</span> In Stock - Ready to Ship
                        </p>
                    ) : (
                        <p className='text-red-600 font-semibold mb-8 text-lg'>✗ Out of Stock</p>
                    )}

                    <div className='grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl'>
                        <div className='text-center'>
                            <FaTruck className='text-2xl text-indigo-600 mx-auto mb-2' />
                            <p className='text-sm font-semibold'>Free Shipping</p>
                        </div>
                        <div className='text-center'>
                            <FaShieldAlt className='text-2xl text-indigo-600 mx-auto mb-2' />
                            <p className='text-sm font-semibold'>Secure Payment</p>
                        </div>
                        <div className='text-center'>
                            <FaUndo className='text-2xl text-indigo-600 mx-auto mb-2' />
                            <p className='text-sm font-semibold'>Easy Returns</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-16 bg-white rounded-2xl shadow-lg p-8'>
                <h2 className='text-3xl font-bold mb-6'>Product Details</h2>
                <p className='text-lg text-gray-700 leading-relaxed mb-8'>{product.longDescription || product.description}</p>

                <h2 className='text-3xl font-bold mb-6'>Product Information</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg'>
                        <span className='font-semibold text-gray-700'>Category: </span>
                        <span className='text-indigo-600'>{product.category}</span>
                    </div>
                    <div className='p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg'>
                        <span className='font-semibold text-gray-700'>Rating: </span>
                        <span className='text-indigo-600'>{product.rating.toFixed(1)} / 5.0</span>
                    </div>
                    <div className='p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg'>
                        <span className='font-semibold text-gray-700'>Reviews: </span>
                        <span className='text-indigo-600'>{product.reviews}</span>
                    </div>
                    <div className='p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg'>
                        <span className='font-semibold text-gray-700'>Price: </span>
                        <span className='text-indigo-600'>{formatPrice(product.price)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
