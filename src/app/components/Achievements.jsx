'use client'

import React,{useState} from 'react'
import Image from 'next/image'
import founder from '../../../public/founder.jpg'
import founderIcon1 from '../../../public/founderIcon.png'
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger'
const Achievements = () => {
    const [countOn, setCountOn] = useState(false)
    return (
        <div className='flex flex-col justify-center items-center gap-12 text-white text-center relative bg-gradient-to-b from-gray-700 to-slate-900 rounded-b-300px lg:px-40 md:px-20 px-7 pt-40 pb-80'>
            <div className='lg:text-5xl md:text-4xl text-3xl flex flex-col justify-center items-center font-semibold'><h1>We bring innovation and creative </h1><h1>freedom to the WordPress ecosystem</h1></div>
            <p className='w-3/4'>Sapien sagittis interdum quisque urna luctus eget morbi vivamus eget cras scelerisque lectus proin aliquam erat pellentesque pellentesque sed lectus volutpat semper pellentesque aliquam in metus.</p>
            <ScrollTrigger onEnter={()=>{setCountOn(true)}} onExit={()=>{setCountOn(false)}}>
                <div className='flex lg:text-5xl md:text-4xl text-3xl font-semibold flex-wrap justify-center items-center'>
                    <div className='w-60'>
                        <h2>{countOn && <CountUp start={0.0} end={2.4} duration={2} delay={0}/>}M+</h2>
                        <h3 className='text-xs font-light'>LICSENCE SOLD</h3>
                    </div>
                    <p className='px-4 text-5xl font-extralight opacity-30 hidden lg:block'>|</p>
                    <div className='w-60'>
                        <h2>{countOn && <CountUp start={0} end={12} duration={2} delay={0}/>}M+</h2>
                        <h3 className='text-xs font-light'>END USERS</h3>
                    </div>
                    <p className='px-4 text-5xl font-extralight opacity-30 hidden lg:block'>|</p>
                    <div className='w-60'>
                        <h2>{countOn && <CountUp start={0} end={5} duration={2} delay={0}/>}K+</h2>
                        <h3 className='text-xs font-light'>5 STAR RATINGS</h3>
                    </div>
                    <p className='px-4 text-5xl font-extralight opacity-30 hidden lg:block'>|</p>
                    <div className='w-60'>
                        <h2>{countOn && <CountUp start={0} end={12} duration={2} delay={0}/>}</h2>
                        <h3 className='text-xs font-light'>YEARS ON MARKET</h3>
                    </div>
                </div>
            </ScrollTrigger>
            <div className='absolute lg:flex flex flex-col lg:flex-row bg-white text-black sm:w-3/4 w-full -bottom-3/4 rounded-3xl lg:-bottom-96'>
                <Image src={founder} className='flex-1 rounded-3xl' />
                <div className='flex-2 flex flex-col gap-5 justify-center items-start text-left pr-7  sm:p-0 p-4'>
                    <Image src={founderIcon1} />
                    <h1 className='text-3xl font-semibold'>Top WordPress theme because not only does it look great, but it's also optimized for performance.</h1>
                    <p className='opacity-90'>Habitant faucibus sollicitudin fames quam scelerisque amet urna non risus diam netus pellentesque ac sit malesuada risus nisi, aliquet rutrum scelerisque cras habitant lorem tortor sit mauris eu ac id enim urna, adipiscing convallis viverra egestas.</p>
                    <div>
                        <h3>Chris Greenfelder</h3>
                        <p className='opacity-90'>Founder WPBiz</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Achievements