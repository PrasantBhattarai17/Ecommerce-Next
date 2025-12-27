'use client'
import { useState } from 'react'
import Link from 'next/link'
import { BsBag } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
export default function Navbar() {
    const [click, setClick] = useState(false)
    function handleClick(){
        if(click){
            setClick(false)
        }else{
            setClick(true)
        }
    }
    return (
        <> <div className='lg:px-40 lg:py-6 py-3 md:px-20 px-7 bg-slate-100'>
            <nav className='flex justify-between lg:h-14 md:h-12 h-10 items-center'>
                <Link href='/'><h1 className='text-xl font-semibold' onClick={()=>{setClick(false)}}>WPVANTAGE</h1></Link>
                <ul className='lg:flex gap-9 font-medium hidden'>
                    <li>
                        <Link href='/themes'>Themes</Link>
                    </li>
                    <li>
                        <Link href='/plugins'>Plugins</Link>
                    </li>
                    <li>
                        <Link href='/about'>About</Link>
                    </li>
                    <li>
                        <Link href='/contact'>Contact</Link>
                    </li>
                </ul>
                <ul className='lg:flex hidden gap-10'>
                    <li>
                        <Link href='#'>Sign In</Link>
                    </li>
                    <li>
                        <Link href='#' className='flex justify-center items-center gap-2 text-indigo-600 font-semibold'>
                            <p>$00.0</p>
                            <BsBag></BsBag>
                        </Link>
                    </li>
                </ul>
                <ul className='lg:hidden flex gap-10'>
                    <IoMdMenu onClick={handleClick} />
                </ul>
            </nav>
        </div>
            {
                click &&
                <div className=''>
                    <div className=''>
                        <nav className=''>
                            <ul className='flex flex-col lg:px-40 md:px-20 px-7 gap-5 py-7 bg-slate-100'>
                                <li>
                                    <Link href='/themes' onClick={handleClick}>Themes</Link>
                                </li>
                                <li>
                                    <Link href='/plugins' onClick={handleClick}>Plugins</Link>
                                </li>
                                <li>
                                    <Link href='/about' onClick={handleClick}>About</Link>
                                </li>
                                <li>
                                    <Link href='/contact' onClick={handleClick}>Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            }
        </>
    )
}