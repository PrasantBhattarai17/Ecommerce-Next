import React from 'react'
import Form from '../components/Form.jsx'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaQuestionCircle } from 'react-icons/fa'

const Contact = () => {
    return (
        <div className='bg-white'>
            {/* Header Section */}
            <div className='flex flex-col gap-6 lg:px-40 md:px-20 px-7 py-32 bg-gradient-to-br from-slate-50 to-indigo-50 border-b overflow-hidden relative'>
                <div className='relative z-10 max-w-2xl'>
                    <h2 className='text-indigo-600 font-bold tracking-widest uppercase mb-4 text-sm'>Connect With Us</h2>
                    <h1 className='sm:text-7xl text-5xl font-black text-slate-900 leading-tight mb-8'>
                        We're here to <span className='text-indigo-600'>help</span> you.
                    </h1>
                    <p className='text-xl text-slate-600 leading-relaxed'>
                        Have a question about an order or a product? Our dedicated support team is ready to assist you 24/7.
                    </p>
                </div>
                {/* Abstract shape */}
                <div className='absolute right-0 top-0 w-1/2 h-full bg-indigo-600/5 -skew-x-12 transform translate-x-20'></div>
            </div>

            <div className='lg:px-40 md:px-20 px-7 py-24'>
                <div className='flex flex-col lg:flex-row gap-20'>
                    {/* Left Side: Contact Info & Info */}
                    <div className='lg:w-1/3 flex flex-col gap-12'>
                        <div>
                            <h3 className='text-2xl font-bold mb-8 text-slate-900'>Contact Information</h3>
                            <div className='space-y-8'>
                                <div className='flex items-start gap-6'>
                                    <div className='w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0 shadow-sm'>
                                        <FaPhoneAlt />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500 font-medium mb-1'>Call us directly</p>
                                        <p className='text-lg font-bold text-slate-900'>+977 1234567890</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-6'>
                                    <div className='w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shrink-0 shadow-sm'>
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500 font-medium mb-1'>Send us an email</p>
                                        <p className='text-lg font-bold text-slate-900'>support@shopactive.com</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-6'>
                                    <div className='w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm'>
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <p className='text-sm text-gray-500 font-medium mb-1'>Our Headquarter</p>
                                        <p className='text-lg font-bold text-slate-900'>Kathmandu, Nepal</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='p-8 bg-indigo-600 rounded-3xl text-white relative overflow-hidden group hover:shadow-2xl hover:shadow-indigo-200 transition-all duration-500'>
                            <h4 className='text-2xl font-bold mb-4 relative z-10'>Newsletter</h4>
                            <p className='text-indigo-100 mb-6 relative z-10'>Get the latest updates on new products and upcoming sales directly to your inbox.</p>
                            <div className='flex gap-2 relative z-10'>
                                <input type="text" placeholder='Email' className='bg-white/10 border border-white/20 rounded-xl px-4 py-2 w-full outline-none placeholder:text-white/40' />
                                <button className='bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold'>Join</button>
                            </div>
                            <div className='absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700'></div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className='lg:w-2/3'>
                        <div className='bg-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100'>
                            <Form />
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className='mt-40'>
                    <div className='text-center mb-20'>
                        <h2 className='text-indigo-600 font-bold uppercase tracking-widest text-sm mb-4'>Got Questions?</h2>
                        <h1 className='text-5xl font-black text-slate-900'>Frequently Asked Questions</h1>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                        <div className='p-8 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all duration-300'>
                            <h3 className='text-xl font-bold text-slate-900 mb-4 flex items-center gap-3'>
                                <FaQuestionCircle className='text-indigo-500' />
                                How long does shipping take?
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>
                                For customers within Kathmandu, delivery typically takes 24-48 hours. For outside-valley locations, expect your package within 3-5 business days.
                            </p>
                        </div>
                        <div className='p-8 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all duration-300'>
                            <h3 className='text-xl font-bold text-slate-900 mb-4 flex items-center gap-3'>
                                <FaQuestionCircle className='text-indigo-500' />
                                What payment methods are accepted?
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>
                                We accept eSewa, Credit/Debit Cards, and Cash on Delivery for most locations. All digital payments are processed through secure encrypted gateways.
                            </p>
                        </div>
                        <div className='p-8 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all duration-300'>
                            <h3 className='text-xl font-bold text-slate-900 mb-4 flex items-center gap-3'>
                                <FaQuestionCircle className='text-indigo-500' />
                                How do I track my order?
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>
                                Once your order is shipped, you'll receive an SMS/Email with a tracking code. You can use this on our "Track Order" page or through the delivery partner's portal.
                            </p>
                        </div>
                        <div className='p-8 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all duration-300'>
                            <h3 className='text-xl font-bold text-slate-900 mb-4 flex items-center gap-3'>
                                <FaQuestionCircle className='text-indigo-500' />
                                Can I return a product?
                            </h3>
                            <p className='text-gray-600 leading-relaxed'>
                                Yes! We offer a 7-day easy return policy for most items. The product must be in its original packaging and unused condition. Check our "Refund Policy" for more details.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact