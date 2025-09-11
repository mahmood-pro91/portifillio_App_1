import React from 'react'
import assets from '../assets/assets/assets'

const Hero = () => {
    
    const Ptext = {
        textP1:"Turning imagination into ",
        textP2:"Creating meaningful connections and turning big ideas into inertactive digital experiences .",
        textP3:'We are a team of passionate designers and developers dedicated to crafting beautiful and functional digital experiences.'
    }
    


  return (
    <div id='hero'
    className={`flex flex-col items-center gap-6 py-20 
    px-4 sm:px-12 lg:px-24 xl:px-40 text-center
    w-full overflow-hidden text-gray-700 dark:text-white`}
    >
        <div className='inline-flex items-center gap-2
        border-gray-300 p-1.5 pr-4 rounded-full '>
            <img className='w-20' src={assets.group_profile} alt="profile-group" />
            <p className='text-xs font-medium'>Trusted by 10K+ people</p>
        </div> 
         <h1 className={`text-4xl sm:text-5xl md:text-6xl xl:text-[84px]
            font-medium xl:leading-[90px] max-w-5xl`}>
            {Ptext.textP1} 
            <span className={`bg-gradient-to-r from-[#5044E5]
                 to-[#4d8cea] bg-clip-text text-transparent`}>
                    digital 
            </span> impact .
         </h1>
         <p className={`text-sm sm:text-lg font-medium  
            text-gray-500 dark:text-white/75 max-w-4/5 sm:max-w-lg pb-3`}>
            {Ptext.textP2}
         </p>
         <div>
            <img src={assets.hero_img} alt="hero-img" />
            {/* <img src={assets.bgImage1} alt="bg-hero"
            className='absolute   top-40 -right-40 transparent   sm:top-50 sm:-right-70   ' /> */}
         
            </div>
    </div>
  )
}

export default Hero
