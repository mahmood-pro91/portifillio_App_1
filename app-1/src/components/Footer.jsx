import React from 'react'
import assets from '../assets/assets/assets'

const Footer = ({theme}) => {

  return (
    <div className='bg-slate-50 dark:bg-gray-900 pt-10 
    sm:pt-10 mt-20 sm:mt-40 px-4 sm:px-10 lg:px-24 xl:px-40'>
      {/**footer top */}
      <div className='flex justify-between lg:items-center 
      max-lg:flex-col gap-10'>
        {/**left part  */}
        <div className='space-y-5 text-sm text-gray-800 
        dark:text-gray-200'>
            <img src={theme==='dark' ?assets.logo_dark:assets.logo} className='w-32 sm:w-44' alt="" />
            <p className='max-w-md' >From strategy to execution , we craft digital solutions that move your business forword .</p>
            <ul className='flex gap-8 mb-8'>
                <li ><a className="hover:text-blue-500" href='#hero'>Home </a></li>
                <li ><a className="hover:text-blue-500" href='#services'>Services </a></li>
                <li ><a className="hover:text-blue-500" href='#works'>Works </a></li>
                <li ><a className="hover:text-blue-500" href='#contact-us'>Contact us </a></li>
            </ul>
        </div>
            {/** right part */}
        <div className='text-gray-800 dark:text-gray-200'>
            <h3 className='font-semibold'>
                Subscribe to our newslatter 
            </h3>
            <p className='text-sm mt-2 mb-6'>
                The latest news, articles , and resources,sent to your inbox weekly.
            </p>
            <div className='flex gap-2  mb-2 '>
                <input type="email" placeholder='Enter your email.... '
                className='w-full p-3 text-sm outline-none border border-gray-300 rounded 
                dark:text-gray-200 dark:border-gray-200' />
                <button type="button" 
                className='px-4 bg-blue-500 text-white  rounded 
                text-sm hover:scale-110 '>
                  Subscribe</button>
            </div>
        </div>
      </div>
      <hr className='border border-gray-300 dark:border-gray-600 my-6' />
      {/** bottom footer */}
      <div className='pb-6 text-sm text-gray-500 flex justify-center
      sm:justify-between gap-4 flex-wrap'>
        <p>Copyright 2025  @ mahmorta.com - All Right Reserved . </p>
        <div className='flex items-center justify-between gap-4'>
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.instagram_icon} alt="" />
          <img src={assets.linkedin_icon } alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer
