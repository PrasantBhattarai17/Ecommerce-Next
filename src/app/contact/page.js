import React from 'react'
import Form from '../components/Form.jsx'

const Contact = () => {
    return (
        <div className='flex flex-col gap-14 lg:px-40 md:px-20 px-7 py-40 bg-slate-100'>
            <div>
                <h2 className='my-3'>Contact us</h2>
                <h1 className='sm:text-6xl text-4xl font-semibold'>Can’t find what you’re looking for?</h1>
            </div>
            <Form />
            <div className='mt-24'>
                <h1 className='text-center text-4xl font-semibold'>Frequently asked questions</h1>
                <div className='flex flex-col my-24 flex-wrap sm:gap-24 gap-6'>
                    <div className='flex justify-between flex-wrap gap-6'>
                        <div className='sm:w-2/5 w-full'>
                            <h2 className='text-2xl font-semibold my-1'>How many sites can I use the theme on?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Vitae netus nisi.</p>
                        </div>
                        <div className='sm:w-2/5 w-full'>
                            <h2 className='text-2xl font-semibold my-1'>How do I get updates?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        </div>
                    </div>
                    <div className='flex justify-between flex-wrap gap-6'>
                        <div className='sm:w-2/5 w-full'>
                            <h2 className='text-2xl font-semibold my-1'>What's your refund policy?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
                        </div>
                        <div className='sm:w-2/5 w-full'>
                            <h2 className='text-2xl font-semibold my-1'>What kind of support do you offer?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Vitae netus nisi, vitae augue duis eu accumsan ut phasellus sit tempor habitasse leo hendrerit amet laoreet ornare .</p>
                        </div>
                    </div>
                    <div className='flex justify-between flex-wrap gap-6'>
                        <div className='sm:w-2/5 w-full'>
                            <h2 className='text-2xl font-semibold my-1'>Which page builder is used to create ready websites?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Vitae netus nisi.</p>
                        </div>
                        <div className='sm:w-2/5 w-full'>
                            <h2 className='text-2xl font-semibold my-1'>Will you add more ready sites in the library?</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Vitae netus nisi, vitae augue duis eu accumsan.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Contact