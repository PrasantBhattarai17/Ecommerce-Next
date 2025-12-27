import React from 'react'

const Form = () => {
    return (
        <div className='font-semibold'>
            <h1 className='sm:text-4xl text-2xl'>Get in touch !</h1>
            <form className='flex flex-col gap-6 mt-4'>
                <div>
                    <div>Name<span className='text-red-500'>*</span></div>
                    <div><input type="text" className='sm:w-1/2 w-full text-xl p-2 rounded-sm' /></div>
                </div>
                <div>
                    <div>Email<span className='text-red-500'>*</span></div>
                    <div><input type="email" className='sm:w-1/2 w-full text-xl p-2 rounded-sm' /></div>
                </div>
                <div>
                    <div>Subject<span className='text-red-500'>*</span></div>
                    <div><input type="text" className='sm:w-1/2 w-full text-xl p-2 rounded-sm' /></div>
                </div>
                <div>
                    <div>Message<span className='text-red-500'>*</span></div>
                    <div><textarea type="text" className='sm:w-1/2 w-full text-xl p-2 rounded-sm' ></textarea></div>
                </div>
                <div>
                    <button className='bg-indigo-400 text-white px-6 py-3 rounded-md hover:bg-indigo-500'>Send</button>
                </div>
            </form>
        </div>
    )
}

export default Form