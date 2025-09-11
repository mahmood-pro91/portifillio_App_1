import React from 'react'
import {Sparkles } from "lucide-react"



const Header = () => {
  return (
    <header className={`fixed top-0 left-0  right-0 z-50 transition-all duration`}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between py-4'>
                <div className='flex items-center space-x-2'>
                <div className='relative'>
                    <Sparkles className={`w-8 h-8 transition-all duration-300`} />
                    {/* <div className='absolute top-1  right-1 w-3 h-3 
                    bg-gradient-to-r from-pin-500 to-purple-500  rounded-full shadow-lg animate-pulse'></div> */}
                        
                </div>
                <h1 className='text-2xl  font-black 
                     bg-gradient-to-r from-purple-600 to-pink-600 
                     text-transparent bg-clip-text transition-all duration-300 '>Nexus
                </h1>
                </div>
                {/* Add any additional header content here, like navigation links or buttons */}
                <nav className='hidden md:flex  space-x-8'>
                    <button type='button'
                    className={`capitalize text-sm font-semibold  transition-all duration-300 
                    hover:scale-105 realative group`}
                    
                    >
                           <p className='mb-1'>Home</p> 
                        {/* Hover effect for the button */}
                        <span className='absolute bottom-1 left-0 w-1 mt-2 h-0.5 
                        bg-gradient-to-r from-purple-500 to-pink-500
                        transition-all duration-300
                        group-hover:w-full '></span> 

                    </button>
                        </nav>
                            {/* mobile menu Btn */}
                        <button className='md:hidden p-2 rounded-lg
                        transition-all duration-300 '>
                            
                        </button>
                </div>
                {/* mobile navaigation menu */}
                <div className='md:hidden bg-white/95 
                backdrop-blur-lg mt-2 py-6
                shadow-2xl rounded-2xl p-4
                border-purple-100 '>
                    <button className='block w-full
                    text-left px-6 py-3 text-gray-700
                    hover:bg-gradient-to-r hover:from-purpule-50
                    hover:to-pink-50 hover:text-purple capitalize
                    transition-all duration-300 rounded-lg 
                    font-medium'>
                        Home
                    </button>
                
                </div>    
        </div>
      
    </header>
  )
}

export default Header
