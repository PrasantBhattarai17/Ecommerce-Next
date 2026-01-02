import React from 'react'

const Form = () => {
    return (
        <div>
            <div className='mb-10'>
                <h2 className='text-3xl font-black text-slate-900 mb-2'>Send us a Message</h2>
                <div className='h-1 w-20 bg-indigo-600 rounded-full'></div>
            </div>
            <form className='flex flex-col gap-8'>
                <div className='flex flex-col md:flex-row gap-6'>
                    <div className='flex-1'>
                        <label className='block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight'>Full Name<span className='text-red-500 ml-1'>*</span></label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className='w-full bg-slate-50 border border-slate-200 text-slate-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300'
                        />
                    </div>
                    <div className='flex-1'>
                        <label className='block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight'>Email Address<span className='text-red-500 ml-1'>*</span></label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className='w-full bg-slate-50 border border-slate-200 text-slate-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300'
                        />
                    </div>
                </div>
                <div>
                    <label className='block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight'>Inquiry Subject<span className='text-red-500 ml-1'>*</span></label>
                    <input
                        type="text"
                        placeholder="How can we help?"
                        className='w-full bg-slate-50 border border-slate-200 text-slate-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300'
                    />
                </div>
                <div>
                    <label className='block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight'>Your Message<span className='text-red-500 ml-1'>*</span></label>
                    <textarea
                        rows="5"
                        placeholder="Tell us more about your inquiry..."
                        className='w-full bg-slate-50 border border-slate-200 text-slate-900 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all duration-300 resize-none'
                    ></textarea>
                </div>
                <div>
                    <button className='w-full md:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transform hover:-translate-y-1 transition-all duration-300'>
                        Shoot your message
                    </button>
                    <p className='text-xs text-slate-400 mt-4 text-center md:text-left'>
                        By clicking send, you agree to our terms and privacy policy.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Form