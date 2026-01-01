'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export default function SignUpPage() {
    const router = useRouter()
    const { signup, isAuthenticated } = useAuth()
    const { showToast } = useToast()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, router])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        setIsLoading(true)

        const result = await signup(formData.name, formData.email, formData.password)
        
        setIsLoading(false)

        if (result.success) {
            showToast('Account created successfully!', 'success')
            router.push('/')
        } else {
            showToast(result.error || 'Signup failed', 'error')
            setErrors({ email: result.error || 'Signup failed' })
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center lg:px-40 md:px-20 px-7 py-20'>
            <div className='w-full max-w-md'>
                <h1 className='text-4xl font-semibold mb-2 text-center'>Sign Up</h1>
                <p className='text-gray-600 text-center mb-8'>Create your account to get started.</p>

                <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow-md p-8'>
                    <div className='mb-6'>
                        <label className='block text-sm font-medium mb-2'>Full Name</label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder='John Doe'
                        />
                        {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
                    </div>

                    <div className='mb-6'>
                        <label className='block text-sm font-medium mb-2'>Email</label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder='your@email.com'
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                    </div>

                    <div className='mb-6'>
                        <label className='block text-sm font-medium mb-2'>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder='••••••••'
                        />
                        {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
                    </div>

                    <div className='mb-6'>
                        <label className='block text-sm font-medium mb-2'>Confirm Password</label>
                        <input
                            type='password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder='••••••••'
                        />
                        {errors.confirmPassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmPassword}</p>}
                    </div>

                    <button
                        type='submit'
                        disabled={isLoading}
                        className='w-full py-3 px-6 text-white rounded-md bg-indigo-500 font-medium hover:bg-indigo-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isLoading ? 'Creating account...' : 'Sign Up'}
                    </button>

                    <p className='text-center mt-6 text-sm text-gray-600'>
                        Already have an account?{' '}
                        <Link href='/auth/signin' className='text-indigo-600 hover:text-indigo-800 font-medium'>
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
