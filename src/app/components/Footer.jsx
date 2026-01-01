import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-wrap justify-center lg:px-40 md:px-20 px-7 py-24 gap-32 text-center '>
        <div>
          <h2 className='text-xl font-semibold mb-9'>Company</h2>
          <div className='flex flex-col gap-3'>
            <Link href='/about' className='hover:text-indigo-600 transition'>About</Link>
            <Link href='/contact' className='hover:text-indigo-600 transition'>Contact</Link>
            <Link href='/orders' className='hover:text-indigo-600 transition'>Orders</Link>
          </div>
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-9'>Shop</h2>
          <div className='flex flex-col gap-3'>
            <Link href='/products' className='hover:text-indigo-600 transition'>All Products</Link>
            <Link href='/products?category=Electronics' className='hover:text-indigo-600 transition'>Electronics</Link>
            <Link href='/products?category=Fashion' className='hover:text-indigo-600 transition'>Fashion</Link>
            <Link href='/products?category=Home & Kitchen' className='hover:text-indigo-600 transition'>Home & Kitchen</Link>
            <Link href='/wishlist' className='hover:text-indigo-600 transition'>Wishlist</Link>
          </div>
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-9'>Account</h2>
          <div className='flex flex-col gap-3'>
            <Link href='/auth/signin' className='hover:text-indigo-600 transition'>Sign In</Link>
            <Link href='/auth/signup' className='hover:text-indigo-600 transition'>Sign Up</Link>
            <Link href='/cart' className='hover:text-indigo-600 transition'>Shopping Cart</Link>
          </div>
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-9'>Support</h2>
          <div className='flex flex-col gap-3'>
            <Link href='/contact' className='hover:text-indigo-600 transition'>Contact Us</Link>
            <Link href='#' className='hover:text-indigo-600 transition'>Help Center</Link>
            <Link href='#' className='hover:text-indigo-600 transition'>Privacy Policy</Link>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className='flex flex-wrap xs:justify-between md:justify-between lg:justify-between justify-center lg:px-40 md:px-20 px-7 py-20 gap-5'>
        <Link href='/'><h1 className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>ShopActive</h1></Link>
        <p className='font-light text-xs text-center'>© 2024 ShopActive. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer