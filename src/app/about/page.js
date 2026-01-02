import React from 'react'
import Image from 'next/image'
import { FaRocket, FaHeart, FaShieldAlt } from 'react-icons/fa'

const About = () => {
    return (
        <div className='bg-white'>
            {/* Hero Section */}
            <div className='relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white lg:px-40 md:px-20 px-7 py-32'>
                <div className='max-w-4xl relative z-10'>
                    <h2 className='text-indigo-200 font-semibold tracking-wider uppercase mb-4'>Our Story</h2>
                    <h1 className='sm:text-7xl text-5xl font-extrabold mb-8 leading-tight'>
                        Elevating your shopping <span className='text-indigo-200'>experience</span> beyond boundaries.
                    </h1>
                    <p className='text-xl text-indigo-100 max-w-2xl leading-relaxed'>
                        ShopActive was born out of a simple idea: to make premium products accessible to everyone,
                        everywhere. We believe that shopping should be more than just a transaction—it should be an inspiration.
                    </p>
                </div>
                {/* Decorative Elements */}
                <div className='absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl'></div>
                <div className='absolute -left-20 -bottom-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl'></div>
            </div>

            {/* Content Section */}
            <div className='flex gap-20 lg:px-40 md:px-20 px-7 py-32 flex-wrap items-center'>
                <div className='flex flex-col gap-8 flex-1 min-w-[300px]'>
                    <div className='h-1.5 w-20 bg-indigo-600 rounded-full'></div>
                    <h2 className='text-4xl font-bold text-gray-900'>What drives us?</h2>
                    <h3 className='text-2xl font-semibold text-indigo-600 leading-snug'>
                        Consistency, Quality, and a Customer-First Mentality.
                    </h3>
                    <p className='text-lg text-gray-600 leading-relaxed'>
                        At ShopActive, we curate only the finest electronics, fashion, and lifestyle essentials.
                        Our team works tirelessly to bridge the gap between world-class brands and your doorstep.
                        Every product in our catalog undergoes rigorous quality checks to ensure you receive nothing but the best.
                    </p>
                    <p className='text-lg text-gray-600 leading-relaxed'>
                        Founded in 2024, we've rapidly grown from a small local boutique to a leading digital marketplace.
                        Our commitment remains the same: providing a seamless, secure, and delightful experience for every shopper.
                    </p>
                </div>
                <div className='flex-1 min-w-[300px] grid grid-cols-2 gap-6'>
                    <div className='bg-indigo-50 p-8 rounded-3xl transform hover:scale-105 transition duration-500'>
                        <FaRocket className='text-4xl text-indigo-600 mb-4' />
                        <h4 className='text-xl font-bold mb-2'>Fast Delivery</h4>
                        <p className='text-gray-600 text-sm'>Getting your products to you in record time, safely.</p>
                    </div>
                    <div className='bg-purple-50 p-8 rounded-3xl mt-8 transform hover:scale-105 transition duration-500'>
                        <FaHeart className='text-4xl text-purple-600 mb-4' />
                        <h4 className='text-xl font-bold mb-2'>Quality First</h4>
                        <p className='text-gray-600 text-sm'>Hand-picked items that meet our high standards.</p>
                    </div>
                    <div className='bg-blue-50 p-8 rounded-3xl transform hover:scale-105 transition duration-500'>
                        <FaShieldAlt className='text-4xl text-blue-600 mb-4' />
                        <h4 className='text-xl font-bold mb-2'>Secure Pay</h4>
                        <p className='text-gray-600 text-sm'>Multiple secure ways to pay, including eSewa.</p>
                    </div>
                    <div className='bg-indigo-600 p-8 rounded-3xl mt-8 text-white transform hover:scale-105 transition duration-500'>
                        <div className='text-4xl font-bold mb-2'>10k+</div>
                        <h4 className='text-xl font-bold mb-2'>Happy Users</h4>
                        <p className='text-indigo-100 text-sm'>A growing community of satisfied customers.</p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className='bg-slate-50 lg:px-40 md:px-20 px-7 py-32 text-center'>
                <h2 className='text-5xl font-black mb-12 text-gray-900'>Our Mission</h2>
                <div className='max-w-3xl mx-auto'>
                    <p className='text-2xl text-gray-700 italic leading-relaxed'>
                        "To revolutionize commerce by making premium technology and fashion accessible,
                        while building a sustainable and customer-centric future."
                    </p>
                    <div className='mt-12 flex justify-center gap-4'>
                        <div className='w-3 h-3 bg-indigo-600 rounded-full'></div>
                        <div className='w-3 h-3 bg-indigo-400 rounded-full'></div>
                        <div className='w-3 h-3 bg-indigo-200 rounded-full'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About