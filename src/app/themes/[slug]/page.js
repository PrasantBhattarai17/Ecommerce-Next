'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import themes from '../../components/themesStore'
import { useCart } from '../../context/CartContext'
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa'

export default function ThemeDetailPage() {
    const params = useParams()
    const slug = params.slug
    const theme = themes.find(t => t.slug === slug)
    const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart()

    if (!theme) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-semibold mb-4'>Theme Not Found</h1>
                <Link href='/themes' className='text-indigo-600 hover:text-indigo-800'>
                    Back to Themes
                </Link>
            </div>
        )
    }

    const inWishlist = isInWishlist(theme.id, 'themes')

    const handleAddToCart = () => {
        addToCart({ ...theme, type: 'themes' })
    }

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(theme.id, 'themes')
        } else {
            addToWishlist({ ...theme, type: 'themes' })
        }
    }

    return (
        <div className='min-h-screen lg:px-40 md:px-20 px-7 py-20'>
            <div className='mb-6'>
                <Link href='/themes' className='text-indigo-600 hover:text-indigo-800'>
                    ← Back to Themes
                </Link>
            </div>

            <div className='flex flex-col lg:flex-row gap-12'>
                <div className='lg:w-1/2'>
                    <div className='relative rounded-lg overflow-hidden shadow-lg'>
                        <Image 
                            src={theme.img} 
                            alt={theme.name}
                            width={800}
                            height={600}
                            className='w-full h-auto'
                        />
                    </div>
                </div>

                <div className='lg:w-1/2'>
                    <div className='mb-4'>
                        <span className='inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium'>
                            {theme.category}
                        </span>
                    </div>
                    <h1 className='text-4xl font-semibold mb-4'>{theme.name}</h1>
                    
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex items-center gap-1'>
                            {[...Array(5)].map((_, i) => (
                                <FaStar 
                                    key={i} 
                                    className={i < Math.floor(theme.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                                />
                            ))}
                        </div>
                        <span className='text-gray-600'>({theme.rating})</span>
                        <span className='text-gray-600'>{theme.reviews} reviews</span>
                    </div>

                    <p className='text-2xl font-bold text-indigo-600 mb-6'>${theme.price.toFixed(2)}</p>

                    <p className='text-lg text-gray-700 mb-8'>{theme.description}</p>

                    <div className='flex gap-4 mb-8'>
                        <button
                            onClick={handleAddToCart}
                            className='flex-1 flex items-center justify-center gap-2 py-3 px-6 text-white rounded-md bg-indigo-500 font-medium hover:bg-indigo-600 transition duration-300'
                        >
                            <FaShoppingCart />
                            Add to Cart
                        </button>
                        <button
                            onClick={handleWishlistToggle}
                            className={`p-3 rounded-md border-2 transition duration-300 ${
                                inWishlist 
                                    ? 'bg-red-50 border-red-500 text-red-600' 
                                    : 'border-gray-300 hover:border-red-500'
                            }`}
                        >
                            <FaHeart className={inWishlist ? 'fill-current' : ''} />
                        </button>
                    </div>

                    {theme.inStock ? (
                        <p className='text-green-600 font-medium mb-8'>✓ In Stock</p>
                    ) : (
                        <p className='text-red-600 font-medium mb-8'>✗ Out of Stock</p>
                    )}
                </div>
            </div>

            <div className='mt-16'>
                <h2 className='text-3xl font-semibold mb-6'>Description</h2>
                <p className='text-lg text-gray-700 leading-relaxed mb-8'>{theme.longDescription}</p>

                <h2 className='text-3xl font-semibold mb-6'>Features</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {theme.features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-2 p-4 bg-white rounded-lg shadow-sm'>
                            <span className='text-green-500 font-bold'>✓</span>
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

