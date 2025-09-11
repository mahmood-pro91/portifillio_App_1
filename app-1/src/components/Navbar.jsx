import React ,{useState} from 'react'
import assets ,{colors} from "../assets/assets/assets.js"
import {ThemeTogglebtn} from './indexCom.js';


const Navbar = ({theme ,setTheme}) => {

    const [sidebarOpen,setSidebarOpen] =useState(false);
    
    const bg = colors.bgprimary
    const handleShownav =(pre)=>{
        setSidebarOpen((pre)=>!pre)
        console.log(sidebarOpen);

    }


    return (

    <>
    {/*chnge the route to cors or proper routing */ }
    <div className={
    `flex  justify-between items-center p-4
     sm:px-12 lg:px-24 xl:px-40 sticky top-0
     z-20 backdrop-blur-xl font-medium 
     bg-white/50
      dark:bg-gray-900/70 `}>
        <img src={theme === 'dark' ?assets.logo_dark:assets.logo } 
        alt="logo"  className="w-32 sm:w-40 "/>
         
        <div  className={
            `text-gray-700 dark:text-white max-sm:bg-blue-500 sm:text-sm
            ${sidebarOpen ===false ?'max-sm:w-0 overflow-hidden':'max-sm:w-60 max-sm:pl-10'} max-sm:fixed top-0 bottom-0 right-0
            max-sm:min-h-screen max-sm:h-full max-sm:flex-col 
             max-sm:text-white max-sm:pt-20 flex sm:items-center
            gap-5 transition-all duration-300  `
            }>
            <img onClick={handleShownav} src={assets.close_icon} alt="close"
            className={`w-5 
            absolute right-4 cursor-pointer top-4 sm:hidden`}/>
                
                <a href="#" onClick={handleShownav} 
                className={`sm:hover:border-b`}
                >Home</a>
                <a href="#services" onClick={handleShownav}
                className={`sm:hover:border-b`}
                >Services</a>
                <a href="#works" onClick={handleShownav}
                className={`sm:hover:border-b`}
                >Works</a>
                <a href="#contact-us" onClick={handleShownav}
                className={`sm:hover:border-b`}
                >Contact us</a>
                
            </div>  
        
        <div className={`flex items-center gap-2 sm:gap-4`}>

            <ThemeTogglebtn theme={theme} setTheme={setTheme} />
           { <img src={theme==='dark' ? assets.menu_icon_dark :assets.menu_icon} 
            alt='menu_icon' className={`w-8 sm:hidden cursor-pointer`}
            onClick={handleShownav}/>}
            <a href="#contact-us" 
            className={`text-sm max-sm:hidden flex ${colors.bgprimary} items-center
            gap-2  text-white px-6 py-2 
            rounded-full cursor-pointer hover:scale-100 transition-all`}>

                Connect 
                <img src={assets.arrow_icon} width={14} alt="icon-1" />
            </a>
        </div>
    </div>
    </>
  )
}

export default Navbar ;
