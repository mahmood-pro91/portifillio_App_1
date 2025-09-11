import React from 'react';

import assets from "../assets/assets/assets.js";

import Title from './Title.jsx';
import SerCard from './SerCard.jsx';

const Services = () => {

  const servicesData =[
    {
      title:"App Development",
      desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      icon:assets.social_icon
    },
    {
      title:"Advertising",
      desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      icon:assets.ads_icon
    },
    {
      title:"Content marktiing",
      desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      icon:assets.marketing_icon
    }, 
    {
      title:"Web Development",
      desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      icon:assets.marketing_icon
    },
    
  ]


  return (
    <div id='services'
     className='relative flex flex-col items-center gap-7
     px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white'>
      <img src={assets.bgImage2} alt="img2"
      className='absolute -top-110 -left-70 -z-1   dark:hidden' 
      />
      <Title title='How can we help ?'
      desc={`From strategy to execution, we are here to help you achieve your goals.`} />
      <div className='flex flex-col md:grid grid-cols-2'>
      {servicesData.map((service,index) => (
        <div key={index}>
          <SerCard   title={service.title} desc={service.desc} icon={service.icon} />
        </div>
      ))}
      </div>
    
    </div>
  )
}

export default Services
