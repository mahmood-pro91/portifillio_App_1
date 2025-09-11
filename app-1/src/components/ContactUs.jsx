import React from 'react'
import Title from './Title'
import assets from '../assets/assets/assets'



const ContactUs = () => {
  
  const onSubmit = async (e)=>{
    e.preventDefault();

  }
  
  return (
    <div id='contact-us'
    className='flex flex-col items-center gap-7 px-7 
    sm:px-12 lg:-24 xl:px-40 pt-30 text-gray-700
     dark:text-white'>
      <Title title={`Reach out to Us`} desc={`From strategy to execution, we craft digital 
        solutions that move your ideas forwords . `} />
      
      <form onSubmit={onSubmit}
       action="" method="post" 
      className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full'>
          {/* see videio again at 1:33:00 to 1:42:00 for form submit */}
          <div>  
            <label htmlFor='name' 
            className='mb-4 block text-sm font-medium'>Your name</label>
            <div className='flex pl-3 rounded-lg border
             border-gray-300 dark:border-gray-600'>
              <img src={assets.person_icon} alt="person-img" />
              <input id='name' 
               type="text" placeholder='Enter your name'
              className='w-full p-3 text-sm outline-none'
              required />
            </div>
          </div>
          <div>  
            <label htmlFor='email' 
            className='mb-4 block text-sm font-medium'>E-mail id</label>
            <div className='flex pl-3 rounded-lg border
             border-gray-300 dark:border-gray-600'>
              <img src={assets.email_icon} alt="person-img" />
              <input id='email' 
               type='email' placeholder='Enter your E-mail'
              className='w-full p-3 text-sm outline-none' 
              required/>
            </div>
          </div>
          
          <div className='sm:col-span-2' >
            <label htmlFor='textarea' 
            className='mb-4 block text-sm font-medium'>Massage</label>
            <textarea name="textare" id="textarea" 
             rows={8}  placeholder='Enter your massage'
             className='w-full p-3 text-sm outline-none rounded-lg 
             border border-gray-300 dark:border-gray-600 '>

            </textarea>

          </div>
          <button type="submit" className='w-max mb-8 flex gap-2
          bg-blue-500 text-white text-sm px-10 py-3 
          rounded-full cursor-pointer 
          hover:scale-103 transition-all'>
            Submit <img src={assets.arrow_icon} alt='arrow '  className='w-5 '/>
          </button>
      </form>
      
    </div>
  )
}

export default ContactUs
