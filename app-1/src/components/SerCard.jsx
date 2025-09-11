import React from 'react'

const SerCard = ({title,desc,icon}) => {
  
  return (
    <div  className={`relative  max-w-lg m-2 sm:m-4 
    rounded-xl border border-gray-200  shadow-2xl
     shadow-gray-200 bg-white  
      dark:bg-gray-800 dark:border-gray-700
      dark:shadow-white/10`}>
        
            <div className='flex items-center gap-10 p-8 hover:p-7.5
            hover:m-0.5 z-10 
            transition-all rounded-[10px] bg-white dark:bg-gray-700'>
                
                <div className='bg-gray-100 dark:bg-gray-700
                rounded-full'>
                  <img src={icon} alt="icooon"
                  className='max-w-24 rounded-full m-2
                   bg-white dark:bg-gray-900' />
                </div>
                <div className='flex-1'>
                  <h3 className='font-bold 
                    '>{title}</h3>
                  <p className='text-sm mt-2'>{desc}</p>

                </div>
            </div>
        
      
    </div>
  )
}

export default SerCard ;
