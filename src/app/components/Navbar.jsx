'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BsBag, BsPerson } from "react-icons/bs";
import { IoMdMenu, IoMdClose, IoMdLogOut } from "react-icons/io";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { formatPrice } from '../lib/currency';

export default function Navbar() {
    const [click, setClick] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { getCartItemCount, getCartTotal } = useCart()
    const { user, logout, isAuthenticated } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    function handleClick() {
        setClick(!click)
    }

    const cartCount = getCartItemCount()
    const cartTotal = getCartTotal()

    return (
        <>
            <div className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-slate-100'}`}>
                <div className='lg:px-40 lg:py-4 py-3 md:px-20 px-7'>
                    <nav className='flex justify-between lg:h-14 md:h-12 h-10 items-center'>
                        <Link href='/'>
                            <h1 className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent' onClick={() => { setClick(false) }}>
                                ShopActive
                            </h1>
                        </Link>

                        <ul className='lg:flex gap-9 font-medium hidden'>
                            <li>
                                <Link href='/products' className='hover:text-indigo-600 transition'>All Products</Link>
                            </li>
                            <li>
                                <Link href='/products?category=Electronics' className='hover:text-indigo-600 transition text-sm'>Electronics</Link>
                            </li>
                            <li>
                                <Link href='/products?category=Fashion' className='hover:text-indigo-600 transition text-sm'>Fashion</Link>
                            </li>
                            <li>
                                <Link href='/about' className='hover:text-indigo-600 transition'>About</Link>
                            </li>
                            <li>
                                <Link href='/contact' className='hover:text-indigo-600 transition'>Contact</Link>
                            </li>
                        </ul>

                        <ul className='lg:flex hidden gap-8 items-center'>
                            <li>
                                <Link href='/wishlist' className='hover:text-indigo-600 transition text-gray-600'>
                                    Wishlist
                                </Link>
                            </li>

                            {isAuthenticated ? (
                                <li className='flex items-center gap-6'>
                                    <Link href='/profile' className='flex items-center gap-2 hover:text-indigo-600 transition group'>
                                        <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors'>
                                            <BsPerson className='text-lg' />
                                        </div>
                                        <span className='font-medium max-w-[100px] truncate text-gray-700'>{user?.Name}</span>
                                    </Link>
                                    <button onClick={logout} className='text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium'>
                                        <IoMdLogOut /> Logout
                                    </button>
                                </li>
                            ) : (
                                <li>
                                    <Link href='/auth/signin' className='px-6 py-2 rounded-full border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-600 hover:text-white transition-all'>
                                        Sign In
                                    </Link>
                                </li>
                            )}

                            <li>
                                <Link href='/cart' className='flex justify-center items-center gap-3 text-indigo-600 font-bold relative bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all'>
                                    <p className='text-sm'>{formatPrice(cartTotal)}</p>
                                    <div className='relative'>
                                        <BsBag className='text-xl' />
                                        {cartCount > 0 && (
                                            <span className='absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white'>
                                                {cartCount}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        </ul>

                        <ul className='lg:hidden flex items-center gap-6'>
                            <Link href='/cart' className='relative text-indigo-600'>
                                <BsBag className='text-2xl' />
                                {cartCount > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white'>
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <button onClick={handleClick} className='text-3xl text-gray-700'>
                                {click ? <IoMdClose /> : <IoMdMenu />}
                            </button>
                        </ul>
                    </nav>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${click ? 'max-h-[600px] border-t' : 'max-h-0'}`}>
                    <div className='bg-white px-7 py-8 shadow-inner'>
                        <ul className='flex flex-col gap-6 font-medium'>
                            <li><Link href='/products' onClick={handleClick} className='block py-2 text-lg hover:text-indigo-600' >All Products</Link></li>
                            <li><Link href='/products?category=Electronics' onClick={handleClick} className='block py-2 text-lg hover:text-indigo-600'>Electronics</Link></li>
                            <li><Link href='/products?category=Fashion' onClick={handleClick} className='block py-2 text-lg hover:text-indigo-600'>Fashion</Link></li>
                            <li><Link href='/about' onClick={handleClick} className='block py-2 text-lg hover:text-indigo-600'>About</Link></li>
                            <hr className='border-gray-100' />
                            <li><Link href='/wishlist' onClick={handleClick} className='block py-2 text-lg hover:text-indigo-600'>Wishlist</Link></li>

                            {isAuthenticated ? (
                                <>
                                    <li>
                                        <Link href='/profile' onClick={handleClick} className='flex items-center gap-3 py-2 text-lg text-indigo-600'>
                                            <BsPerson /> My Profile ({user?.Name})
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={() => { logout(); handleClick(); }} className='flex items-center gap-3 py-2 text-lg text-red-500'>
                                            <IoMdLogOut /> Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Link href='/auth/signin' onClick={handleClick} className='block py-4 text-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200'>
                                        Sign In
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}