import React from 'react'
import supports from './supportsStore'
import Image from 'next/image'


const Supports = () => {
    return (
        <div className='bg-slate-100 lg:px-40 md:px-20 px-7 py-36 flex flex-wrap justify-between gap-y-12'>
            <div className='lg:text-5xl md:text-4xl text-3xl font-semibold opacity-95 flex flex-col gap-4 flex-wrap'><h1>Free WordPress</h1><h1>resources & support</h1> </div>
            <div className='flex gap-5 flex-wrap justify-center'>
                {
                    supports.map((e) => {
                        return (
                            <div key={e.id} className='card flex flex-col text-start gap-4 sm:w-96 h-auto p-10 rounded-xl border border-slate-500 border-opacity-35 hover:bg-white hover:shadow-md transition duration-300'>
                                <div className='text-indigo-500 text-2xl'>
                                    {e.icon}
                                </div>
                                <h1 className='text-2xl font-semibold opacity-95'>{e.name}</h1>
                                <p className='opacity-70'>
                                    {e.desc}
                                </p>
                                <div className='flex gap-3'>

                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default Supports