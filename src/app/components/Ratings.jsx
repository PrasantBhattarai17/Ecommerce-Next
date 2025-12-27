import React from 'react'
import { FaStar } from "react-icons/fa6";
import ratings from './ratingsStore'
import { FaQuoteLeft } from "react-icons/fa";
import Image from 'next/image'
const Ratings = () => {
  return (
    <div className='lg:px-40 md:px-20 px-7 lg:mt-96 sm:mt-40rem mt-50rem'>
      <div className='pt-40 flex justify-center items-center text-center flex-col'>
        <div className='text-center'>
          <div className='flex justify-center text-yellow-500 my-2 text-xl'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <h2 className='font-semibold text-2xl'>Excellent 4.9 of 5 stars rating</h2>
          <p className='opacity-80'>Based on 5,000+ real users reviews</p>
        </div>
        <div>
          <div className='py-28'>
            <div className='flex flex-wrap justify-center gap-x-5 gap-y-12'>
              {
                ratings.map((e) => {
                  return (
                    <div key={e.id} className='card flex flex-col justify-start text-start gap-4 sm:w-96 h-auto sm:p-10 p-4 rounded-xl border border-slate-500 border-opacity-35'>
                      <div className='text-indigo-500'>
                        <FaQuoteLeft />
                      </div>
                      <p>
                        Adipiscing vestibulum, nec augue orci est est dui nulla imperdiet diam habitant consequat hac.
                      </p>
                      <div className='flex gap-3'>
                        <Image src={e.img}  className='rounded-full'/>
                        <div className='opacity-80'>
                          <h2>{e.name}</h2>
                          <p className='text-xs'>Designer</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Ratings