'use client'
import { useState } from 'react'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import themes from './themesStore.js'
import { ImCross } from "react-icons/im";

const OurThemes = () => {
    const [cart, setCart] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 })
    const addCart = (id) => {
        setCart({ ...cart, [id]: cart[id] + 1 })
    }
    const subFormCart = (id) => {
        return (
            setCart({ ...cart, [id]: cart[id] - 1 })
        )
    }
    const removeCart = (id) => {
        return (
            setCart({ ...cart, [id]: 0 })
        )
    }
    const totalAmount = () => {
        let amount = 0;

        for (const key in cart) {
            if (cart[key] > 0) {
                let productInfo = themes.find(e => e.id === Number(key))
                amount += Math.floor(cart[key] * productInfo.price)
            }
        }
        return amount;
    }
    // console.log(cart)
    return (
        <div>
            <div className='flex flex-col gap-14 lg:px-40 md:px-20 px-7 py-40 bg-slate-100'>
                <div className='flex justify-between gap-4 flex-wrap'>
                    <h3 className='text-5xl font-semibold'>Our themes</h3>
                    <button className='font-semibold py-3 px-6 bg-white border border-indigo-500 hover:bg-indigo-500 transition duration-300 hover:text-white rounded-md'>View all themes</button>
                </div>
                <div className='flex flex-wrap gap-y-12 justify-center items-center'>
                    {
                        themes.map((e) => {
                            return (
                                <div key={e.id} className='flex flex-wrap flex-col justify-center text-center w-96 px-2'>
                                    <Link href='#'>
                                        <Image src={e.img} className='w-96 h-auto' />
                                        <h1 className='my-2 font-medium'>{e.name}</h1>
                                    </Link>
                                    <p className='opacity-90'>${e.price}</p>
                                    <button className='hover:bg-indigo-500 bg-indigo-400 bottom-8 w-32 m-auto rounded mt-3 p-x-8 py-2 text-white font-bold' onClick={() => { addCart(e.id) }}>Add cart</button>

                                </div>
                            )
                        })
                    }

                </div>
                <div className='flex gap-12 flex-wrap justify-center items-center'>
                    {themes.map((e) => {
                        if (cart[e.id] > 0) {
                            return <div className='flex flex-col w-32 justify-center items-center gap-2'>
                                <div className='relative'>
                                    <Image src={e.img} className='' />
                                    <button onClick={() => { removeCart(e.id) }} className='absolute -right-2 -top-2 bg-red-500 p-2 rounded-full text-sm'><ImCross className=' text-white' /></button>
                                </div>
                                <div className='flex justify-between w-full'>
                                    <p className='text-xs'>Quantity: {cart[e.id]}</p>
                                    <p className='text-xs'>Price: ${e.price}</p>
                                </div>
                                <button onClick={() => { addCart(e.id) }} className='font-bold text-green-400 hover:text-green-600 text-2xl'>+</button>
                                <button onClick={() => { subFormCart(e.id) }} className='font-bold text-red-400 hover:text-red-600 text-2xl'>-</button>

                            </div>
                        }
                    })}
                </div>
                <div className='flex justify-center items-center'><div className='font-bold'>Total price :</div> ${totalAmount()}</div>

            </div>
        </div>
    )
}

export default OurThemes