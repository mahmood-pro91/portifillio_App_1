import React from 'react'

const Title = ({title,desc,icon}) => {
  return (
    <>
      <h2 className='text-3xl sm:text-5xl font-medium'>{title}</h2>
    <p className='text-gray-500 
    max-w-lg text-center dark:text-white/75 mb-6'>{desc}</p>
    </>
  )
}

export default Title
