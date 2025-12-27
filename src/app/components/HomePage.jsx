import Image from 'next/image'
import img from '../../../public/sampleWeb/img1.png'
import Img from '../../../public/vercel.svg'
import Wordpress from '../../../public/wordpress.png'
import Star from '../../../public/star.jpg'
import 'swiper/css';
import 'swiper/css/pagination';
// components imported 
import OurPlugins from './OurPlugins'
import OurThemes from './OurThemes'
import Achievements from './Achievements'
import Ratings from './Ratings'
import Supports from './Supports'
// end
// imported arrays
import services from './servicesStore'
//end
//imported icons
import { FaStar } from "react-icons/fa6";
//end
export default function HomePage() {
    return (
        <>
            <div className='lg:flex bg-slate-100 lg:px-40 md:px-20 px-7 py-20 justify-center items-center'>
                <div className='flex flex-col gap-8 flex-wrap lg:w-full justify-center items-center lg:justify-start lg:items-start'>
                    <h1 className=' lg:text-6xl md:text-5xl text-4xl font-semibold lg:text-left text-center'>Awesome themes & plugins for WordPress</h1>
                    <p className='lg:mr-36 mr-0 text-xl opacity-90 lg:text-left text-center'>Easily build a beautiful WordPress website with our premium themes and plugins.</p>
                    <div className='flex gap-4 flex-wrap lg:justify-start lg:items-start items-center justify-center'>
                        <button className='py-3 px-7 text-white rounded-md bg-indigo-500 font-medium hover:bg-indigo-600 transition duration-300'>Explore our products</button>
                        <button className='py-3 px-7 rounded-md text-indigo-500 font-medium hover:text-black transition duration-300'>Why choose us ?</button>
                    </div>
                </div>
                <div className='lg:w-full lg:mt-0 mt-5 flex lg:items-start lg:justify-start justify-center items-center'>
                    <Image src={img} />
                </div>
            </div>
            <div className='flex justify-center items-center flex-col lg:px-40 md:px-20 px-7 py-14 bg-slate-100 '>
                <h4 className='tracking-widest'>Powering 12,653,898+ of websites</h4>
                <div className=' overflow-hidden opacity-35'>
                    <div className='flex mt-12 space-x-16 animate-loop-scroll'>
                        <Image src={Img} />
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center text-center flex-col lg:px-40 md:px-20 px-7 py-40'>
                <h2 className='font-semibold lg:text-5xl md:text-4xl text-3xl'>WP Vantage is a complete solutions to make it easy for anyone to create awesome WordPress websites.</h2>
                <div className='flex my-20 gap-16 justify-center items-center flex-wrap'>
                    <div className='flex'>
                        <Image src={Wordpress} className='h-12 w-auto' />
                        <div className='pl-2 flex flex-col justify-center items-start'>
                            <div className='flex text-yellow-400'>
                                <FaStar className='' />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className='opacity-90'>5 of 5 (6500 reviews)</div>
                        </div>
                    </div>
                    <div className='sm:block hidden'>
                        <h1 className='text-4xl opacity-30'>|</h1>
                    </div>
                    <div className='flex'>
                        <Image src={Star} className='h-12 w-auto' />
                        <div className='pl-2 flex flex-col justify-center items-start'>
                            <div className='flex text-yellow-400'>
                                <FaStar className='' />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <div className='opacity-90'>4.9 of 5 (4800 reviews)</div>
                        </div>
                    </div>
                </div>
                {/* <div className=''>
                    <iframe width="1200" height="675" className='rounded-3xl' src="https://www.youtube.com/embed/XHOmBV4js_E" title="Video Placeholder" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div> */}
            </div>
            <div className='flex justify-center items-center flex-col gap-8 lg:px-40 md:px-20 px-7 pb-40'>
                <h2 className='lg:text-5xl md:text-4xl text-3xl font-semibold mb-11'>Why people love us</h2>
                <div className='flex flex-wrap justify-center gap-y-12 gap-x-4'>
                    {
                        services.map((e) => {
                            return (
                                <div key={e.id} className='card sm:w-96 h-auto sm:p-10 p-4 rounded-xl border border-slate-500 border-opacity-35 hover:bg-white hover:shadow-md transition duration-300'>
                                    {e.icon}
                                    <h2 className='font-medium text-2xl mb-1'>{e.name}</h2>
                                    <p className='opacity-80'>{e.desc}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
            <OurThemes />
            <div className='px-40'>
                <hr/>
            </div>
            <OurPlugins />
            <Achievements />
            <Ratings />
            <Supports/>
            <div className=' text-center lg:px-40 md:px-20 px-7 py-32 bg-gradient-to-b from-indigo-500 to-indigo-700 text-white flex flex-col gap-4 justify-center items-center'>
                <h1 className='text-4xl font-semibold'>Start building awesome websites</h1>
                <p className='text-xl'>Join over 12,653,898 of customers that already building amazing websites</p>
                <button className='py-3 w-60 rounded-lg text-indigo-600 bg-slate-50 font-semibold hover:bg-slate-900 hover:text-white transition duration-300'>Explore our products</button>
            </div>
        </>
    )
}