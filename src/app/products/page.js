'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { fetchAllProducts, fetchCategories } from '../services/productApi'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { FaShoppingCart, FaHeart, FaSearch, FaStar, FaMinus, FaPlus, FaSpinner } from 'react-icons/fa'
import { formatPrice } from '../lib/currency'

export default function ProductsPage() {
    const searchParams = useSearchParams()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All')
    const [sortBy, setSortBy] = useState('featured')
    const { cart, addToCart, updateQuantity, addToWishlist, isInWishlist, removeFromWishlist } = useCart()
    const { showToast } = useToast()

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const [productsData, categoriesData] = await Promise.all([
                    fetchAllProducts(),
                    fetchCategories()
                ])
                setProducts(productsData)
                setCategories(categoriesData)
            } catch (error) {
                console.error('Error loading products:', error)
                showToast('Failed to load products. Please try again later.', 'error')
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [showToast])

    useEffect(() => {
        const category = searchParams.get('category')
        if (category) {
            setSelectedCategory(category)
        }
    }, [searchParams])

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

    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    // Sort products
    if (sortBy === 'price-low') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'name') {
        filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
    }

    return (
        <div className='min-h-screen lg:px-40 md:px-20 px-7 py-20 bg-gradient-to-b from-slate-50 to-white'>
            <div className='mb-12'>
                <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Shop All Products</h1>
                <p className='text-gray-600 text-lg'>Discover amazing products at unbeatable prices</p>

                <div className='flex flex-col md:flex-row gap-4 mt-8'>
                    <div className='flex-1 relative'>
                        <FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        <input
                            type='text'
                            placeholder='Search products...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm'
                        />
                    </div>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className='px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm'
                    >
                        <option value='All'>All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className='px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm'
                    >
                        <option value='featured'>Featured</option>
                        <option value='price-low'>Price: Low to High</option>
                        <option value='price-high'>Price: High to Low</option>
                        <option value='rating'>Highest Rated</option>
                        <option value='name'>Name A-Z</option>
                    </select>
                </div>

                {!loading && (
                    <p className='text-gray-600 mt-4'>{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found</p>
                )}
            </div>

            {loading ? (
                <div className='flex justify-center items-center py-20'>
                    <FaSpinner className='text-4xl text-indigo-600 animate-spin' />
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className='text-center py-20'>
                    <p className='text-xl text-gray-600'>No products found matching your criteria.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {filteredProducts.map((product) => {
                        const inWishlist = isInWishlist(product.id, 'products')
                        const quantity = getCartQuantity(product.id)

                        return (
                            <div key={product.id} className='bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1'>
                                <Link href={`/products/${product.slug}`} className='relative block'>
                                    <div className='relative h-64 overflow-hidden'>
                                        <Image
                                            src={product.img}
                                            alt={product.name}
                                            fill
                                            className='object-cover transition-transform group-hover:scale-110 duration-300'
                                        />
                                    </div>
                                    <div className='absolute top-3 right-3'>
                                        <button
                                            onClick={(event) => {
                                                event.preventDefault()
                                                handleWishlistToggle(product, inWishlist)
                                            }}
                                            className={`p-2 rounded-full bg-white shadow-lg transition ${inWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                                }`}
                                        >
                                            <FaHeart className={inWishlist ? 'fill-current' : ''} />
                                        </button>
                                    </div>
                                </Link>
                                <div className='p-5'>
                                    <div className='mb-2'>
                                        <span className='text-xs text-indigo-600 font-semibold uppercase tracking-wide'>{product.category}</span>
                                    </div>
                                    <Link href={`/products/${product.slug}`}>
                                        <h3 className='text-lg font-bold mb-2 hover:text-indigo-600 transition line-clamp-2'>{product.name}</h3>
                                    </Link>
                                    <p className='text-gray-600 text-sm mb-3 line-clamp-2'>{product.description}</p>
                                    <div className='flex items-center gap-2 mb-3'>
                                        <div className='flex items-center'>
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar
                                                    key={i}
                                                    className={i < Math.floor(product.rating) ? 'text-yellow-400 text-xs' : 'text-gray-300 text-xs'}
                                                />
                                            ))}
                                        </div>
                                        <span className='text-sm text-gray-600'>({product.rating.toFixed(1)})</span>
                                        <span className='text-sm text-gray-400'>({product.reviews})</span>
                                    </div>
                                    <div className='flex items-center gap-3 mb-4'>
                                        <span className='text-2xl font-bold text-indigo-600'>{formatPrice(product.price)}</span>
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
                                            onClick={() => handleAddToCart(product)}
                                            className='w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition font-semibold shadow-md hover:shadow-lg'
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
            )}
        </div>
    )
}
