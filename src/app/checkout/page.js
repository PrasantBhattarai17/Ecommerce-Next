'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Link from 'next/link'
import { FaLock } from 'react-icons/fa'
import { formatPrice } from '../lib/currency'

export default function CheckoutPage() {
    const router = useRouter()
    const { cart, getCartTotal, clearCart } = useCart()
    const { user, loading, requireAuth } = useAuth()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        paymentMethod: 'esewa'
    })
    const [errors, setErrors] = useState({})
    const [isProcessing, setIsProcessing] = useState(false)

    // Require authentication
    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/signin?redirect=/checkout')
        }
    }, [user, loading, router])

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    // Redirect if not authenticated
    if (!user) {
        return null
    }

    if (cart.length === 0) {
        return (
            <div className='min-h-screen flex flex-col items-center justify-center lg:px-40 md:px-20 px-7 py-20'>
                <h1 className='text-4xl font-semibold mb-6'>Your Cart is Empty</h1>
                <Link href='/cart' className='py-3 px-7 text-white rounded-md bg-indigo-500 font-medium hover:bg-indigo-600 transition duration-300'>
                    Go to Cart
                </Link>
            </div>
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
        if (!formData.address.trim()) newErrors.address = 'Address is required'
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.state.trim()) newErrors.state = 'State is required'
        if (!formData.zipCode.trim()) newErrors.zipCode = 'Zip code is required'
        if (!formData.country.trim()) newErrors.country = 'Country is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsProcessing(true)

        // Generate order ID
        const orderId = `ORD-${Date.now()}`

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderData: {
                        ...formData,
                        orderId,
                        userId: user.Id || user.id,
                        total
                    },
                    items: cart
                })
            })

            const data = await response.json()

            if (response.ok) {
                if (formData.paymentMethod === 'esewa' && data.params) {
                    // eSewa v2 requires a POST request via an HTML form
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = process.env.NEXT_PUBLIC_ESEWA_BASE_URL || 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';

                    Object.entries(data.params).forEach(([key, value]) => {
                        const input = document.createElement('input');
                        input.type = 'hidden';
                        input.name = key;
                        input.value = value;
                        form.appendChild(input);
                    });

                    document.body.appendChild(form);
                    form.submit();
                    return;
                }

                // For other methods (simulated)
                // Clear cart
                clearCart()

                // Redirect to order confirmation
                router.push(`/order-confirmation/${orderId}`)
            } else {
                alert(data.error || 'Something went wrong')
                setIsProcessing(false)
            }
        } catch (error) {
            console.error('Checkout error:', error)
            alert('Failed to place order. Please try again.')
            setIsProcessing(false)
        }
    }

    const subtotal = getCartTotal()
    const tax = subtotal * 0.1
    const total = subtotal + tax

    return (
        <div className='min-h-screen lg:px-40 md:px-20 px-7 py-20 bg-gradient-to-b from-slate-50 to-white'>
            <h1 className='text-4xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Checkout</h1>

            <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row gap-8'>
                <div className='flex-1'>
                    <div className='bg-white rounded-xl shadow-lg p-6 mb-6 border-2 border-indigo-100'>
                        <h2 className='text-2xl font-bold mb-6 text-indigo-600'>Shipping Information</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium mb-2'>First Name *</label>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.firstName && <p className='text-red-500 text-sm mt-1'>{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>Last Name *</label>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.lastName && <p className='text-red-500 text-sm mt-1'>{errors.lastName}</p>}
                            </div>
                            <div className='md:col-span-2'>
                                <label className='block text-sm font-medium mb-2'>Email *</label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                            </div>
                            <div className='md:col-span-2'>
                                <label className='block text-sm font-medium mb-2'>Phone *</label>
                                <input
                                    type='tel'
                                    name='phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.phone && <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>}
                            </div>
                            <div className='md:col-span-2'>
                                <label className='block text-sm font-medium mb-2'>Address *</label>
                                <input
                                    type='text'
                                    name='address'
                                    value={formData.address}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.address ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.address && <p className='text-red-500 text-sm mt-1'>{errors.address}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>City *</label>
                                <input
                                    type='text'
                                    name='city'
                                    value={formData.city}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.city ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.city && <p className='text-red-500 text-sm mt-1'>{errors.city}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>State *</label>
                                <input
                                    type='text'
                                    name='state'
                                    value={formData.state}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.state ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.state && <p className='text-red-500 text-sm mt-1'>{errors.state}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>Zip Code *</label>
                                <input
                                    type='text'
                                    name='zipCode'
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.zipCode && <p className='text-red-500 text-sm mt-1'>{errors.zipCode}</p>}
                            </div>
                            <div>
                                <label className='block text-sm font-medium mb-2'>Country *</label>
                                <input
                                    type='text'
                                    name='country'
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.country ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.country && <p className='text-red-500 text-sm mt-1'>{errors.country}</p>}
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-100'>
                        <h2 className='text-2xl font-bold mb-6 text-indigo-600'>Payment Method</h2>
                        <div className='space-y-4'>
                            <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'esewa' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                                <input
                                    type='radio'
                                    name='paymentMethod'
                                    value='esewa'
                                    checked={formData.paymentMethod === 'esewa'}
                                    onChange={handleChange}
                                    className='w-5 h-5 text-indigo-600'
                                />
                                <div className='flex items-center gap-3'>
                                    <div className='w-10 h-10 bg-green-600 rounded-md flex items-center justify-center text-white font-bold text-xs uppercase'>eSewa</div>
                                    <span className='font-semibold text-gray-800'>Pay with eSewa</span>
                                </div>
                            </label>
                            <label className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.paymentMethod === 'card' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                                <input
                                    type='radio'
                                    name='paymentMethod'
                                    value='card'
                                    checked={formData.paymentMethod === 'card'}
                                    onChange={handleChange}
                                    className='w-5 h-5'
                                />
                                <span className='font-medium'>Credit/Debit Card</span>
                            </label>
                        </div>
                    </div>
                </div>


                <div className='lg:w-96 w-full'>
                    <div className='bg-white rounded-xl shadow-lg p-6 sticky top-20 border-2 border-indigo-100'>
                        <h2 className='text-2xl font-bold mb-6 text-indigo-600'>Order Summary</h2>
                        <div className='space-y-2 mb-6'>
                            {cart.map((item) => (
                                <div key={`${item.type}-${item.id}`} className='flex justify-between text-sm'>
                                    <span>{item.name} x{item.quantity}</span>
                                    <span>{formatPrice(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                        <div className='border-t pt-4 space-y-2 mb-6'>
                            <div className='flex justify-between'>
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span>Tax (10%)</span>
                                <span>{formatPrice(tax)}</span>
                            </div>
                            <div className='border-t pt-4 flex justify-between font-semibold text-lg'>
                                <span>Total</span>
                                <span>{formatPrice(total)}</span>
                            </div>
                        </div>
                        <button
                            type='submit'
                            disabled={isProcessing}
                            className='w-full flex items-center justify-center gap-2 py-3 px-6 text-white rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold hover:from-indigo-600 hover:to-purple-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg'
                        >
                            {isProcessing ? (
                                <>
                                    <span className='animate-spin'>⏳</span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FaLock />
                                    Place Order
                                </>
                            )}
                        </button>
                        <p className='text-xs text-gray-500 text-center mt-4'>
                            Your payment information is secure and encrypted
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}
