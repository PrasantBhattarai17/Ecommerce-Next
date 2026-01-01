'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import themes from './themesStore.js'
import { useCart } from '../context/CartContext'
import { FaShoppingCart, FaHeart } from 'react-icons/fa'
import { formatPrice } from '../lib/currency'

const OurThemes = () => {
    const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useCart()

    return (
        <div>
            <div className='flex flex-col gap-14 lg:px-40 md:px-20 px-7 py-40 bg-slate-100'>
                <div className='flex justify-between gap-4 flex-wrap'>
                    <h3 className='text-5xl font-semibold'>Our Themes</h3>
                    <Link href='/themes' className='font-semibold py-3 px-6 bg-white border border-indigo-500 hover:bg-indigo-500 transition duration-300 hover:text-white rounded-md'>
                        View all themes
                    </Link>
                </div>
                <div className='flex flex-wrap gap-y-12 justify-center items-center'>
                    {
                        themes.slice(0, 6).map((e) => {
                            const inWishlist = isInWishlist(e.id, 'themes')
                            return (
                                <div key={e.id} className='flex flex-wrap flex-col justify-center text-center w-96 px-2 group'>
                                    <Link href={`/themes/${e.slug}`} className='relative'>
                                        <Image src={e.img} className='w-96 h-auto rounded-lg transition-transform group-hover:scale-105' alt={e.name} />
                                        <div className='absolute top-4 right-4'>
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    if (inWishlist) {
                                                        removeFromWishlist(e.id, 'themes')
                                                    } else {
                                                        addToWishlist({ ...e, type: 'themes' })
                                                    }
                                                }}
                                                className={`p-2 rounded-full bg-white shadow-md transition ${inWishlist ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                                                    }`}
                                            >
                                                <FaHeart className={inWishlist ? 'fill-current' : ''} />
                                            </button>
                                        </div>
                                    </Link>
                                    <Link href={`/themes/${e.slug}`}>
                                        <h1 className='my-2 font-medium text-lg hover:text-indigo-600 transition'>{e.name}</h1>
                                    </Link>
                                    <p className='opacity-90 text-xl font-semibold text-indigo-600'>{formatPrice(e.price)}</p>
                                    <button
                                        className='hover:bg-indigo-500 bg-indigo-400 bottom-8 w-32 m-auto rounded mt-3 p-x-8 py-2 text-white font-bold flex items-center justify-center gap-2 transition'
                                        onClick={() => addToCart({ ...e, type: 'themes' })}
                                    >
                                        <FaShoppingCart />
                                        Add to Cart
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default OurThemes
