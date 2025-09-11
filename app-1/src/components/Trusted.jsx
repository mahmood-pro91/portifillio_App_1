import React from 'react'

import {company_logos} from "../assets/assets/assets.js"

const Trusted = () => {
  const texts = {
    title:"Trusted by leading companies",

  }
  
    return (
    <div className='flex flex-col justify-center items-center
    px-4 sm:px-12 lg:px-24 xl:px-40'>
      <h3 className='font-semibold mb-5 '>{texts.title}</h3>
      <div className='flex justify-center items-center flex-wrap m-4 gap-10'>
        {/* add the logos of the companies */}
        {company_logos.map((logo ,index)=>(
          <img key={index} src={logo} alt="company logo" 
          className='max-h-5 sm:max-h-6 dark:drop-shadow-xl opacity-60 hover:opacity-100 transition-all duration-300'/>
        ))}
         
      </div>
    </div>
  )
}

export default Trusted
