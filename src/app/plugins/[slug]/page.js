'use client'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import plugins from '../../components/pluginsStore'
import { useCart } from '../../context/CartContext'
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa'

export default function PluginDetailPage() {
    const params = useParams()
    const slug = params.slug
    const plugin = plugins.find(p => p.slug === slug)
    const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart()

    if (!plugin) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center'>
                <h1 className='text-4xl font-semibold mb-4'>Plugin Not Found</h1>
                <Link href='/plugins' className='text-indigo-600 hover:text-indigo-800'>
                    Back to Plugins
                </Link>
            </div>
        )
    }

    const inWishlist = isInWishlist(plugin.id, 'plugins')

    const handleAddToCart = () => {
        addToCart({ ...plugin, type: 'plugins' })
    }

    const handleWishlistToggle = () => {
        if (inWishlist) {
            removeFromWishlist(plugin.id, 'plugins')
        } else {
            addToWishlist({ ...plugin, type: 'plugins' })
        }
    }

    return (
        <div className='min-h-screen lg:px-40 md:px-20 px-7 py-20'>
            <div className='mb-6'>
                <Link href='/plugins' className='text-indigo-600 hover:text-indigo-800'>
                    ← Back to Plugins
                </Link>
            </div>

            <div className='flex flex-col lg:flex-row gap-12'>
                <div className='lg:w-1/2'>
                    <div className='relative rounded-lg overflow-hidden shadow-lg'>
                        <Image 
                            src={plugin.img} 
                            alt={plugin.name}
                            width={800}
                            height={600}
                            className='w-full h-auto'
                        />
                    </div>
                </div>

                <div className='lg:w-1/2'>
                    <div className='mb-4'>
                        <span className='inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium'>
                            {plugin.category}
                        </span>
                    </div>
                    <h1 className='text-4xl font-semibold mb-4'>{plugin.name}</h1>
                    
                    <div className='flex items-center gap-4 mb-6'>
                        <div className='flex items-center gap-1'>
                            {[...Array(5)].map((_, i) => (
                                <FaStar 
                                    key={i} 
                                    className={i < Math.floor(plugin.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                                />
                            ))}
                        </div>
                        <span className='text-gray-600'>({plugin.rating})</span>
                        <span className='text-gray-600'>{plugin.reviews} reviews</span>
                    </div>

                    <p className='text-2xl font-bold text-indigo-600 mb-6'>${plugin.price.toFixed(2)}</p>

                    <p className='text-lg text-gray-700 mb-8'>{plugin.description}</p>

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

                    {plugin.inStock ? (
                        <p className='text-green-600 font-medium mb-8'>✓ In Stock</p>
                    ) : (
                        <p className='text-red-600 font-medium mb-8'>✗ Out of Stock</p>
                    )}
                </div>
            </div>

            <div className='mt-16'>
                <h2 className='text-3xl font-semibold mb-6'>Description</h2>
                <p className='text-lg text-gray-700 leading-relaxed mb-8'>{plugin.longDescription}</p>

                <h2 className='text-3xl font-semibold mb-6'>Features</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {plugin.features.map((feature, index) => (
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

