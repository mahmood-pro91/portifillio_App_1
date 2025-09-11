import React from 'react';
import Title from './Title';
import assets from '../assets/assets/assets';


const Works = () => {
  
  const workData = [
    {
      title:'Mobile app markting',
      desc:'We turn bold ideas into power digital solutions that connect , engage ...',
      image:assets.work_mobile_app
    },
    {
      title:'Dashbord mangement',
      desc:'We help you excute your plan and deliver results .',
      image:assets.work_dashboard_management
    },
    {
      title:'Fitness app promotion ',
      desc:'We help you create a marketing strtegy that drives results . ',
      image:assets.work_fitness_app

    }

  ]



  return (
    <div id="works" className="flex flex-col items-center gap-7
    px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700
    dark:text-white">
      <Title title="Our latest Work"  desc='From strategy to execution , we craft digital solutions that
      move your business forword .' />
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6
        w-full max-w-5xl'>
            {workData.map((work,index)=>(
              <div key={index} className='hover:scale-102 duration-500
              transition-all cursor-pointer'>
                <img src={work.image} 
                className='w-full rounded-xl'
                alt="work-img" />
                <h3 className='mt-3 mb-2 text-lg font-semibold'>
                  {work.title}
                </h3>
                <p className='
                text-sm opacity-60 w-5/6'>
                  {work.desc}</p>

              </div>
            ))}
        </div>
    
    </div>
  )
}

export default Works
