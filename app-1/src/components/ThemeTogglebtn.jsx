import React, { useEffect } from 'react'
import assets from '../assets/assets/assets'



const ThemeTogglebtn = ({theme,setTheme}) => {


  useEffect(()=>{
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(theme || (prefersDark ? 'dark' : 'light') );
  },[])



  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme])
  

  return (
    <>
      <button>
          {theme ==="dark" ? (
            <img onClick={()=>{
              setTheme('light')
            
            }}
             src={assets.sun_icon}  alt='sun_icon'
             className={`size-8 p-1 border 
                border-gray-500 rounded-full`} />
          ):( <img  onClick={()=>{
              setTheme('dark')
            
            }}
             src={assets.moon_icon}  alt='moon_icon'
             className={`size-8 p-1 border 
                border-gray-500 rounded-full`} />)}
      </button>
    </>
  )
}
<button>
      
</button>
export default ThemeTogglebtn ;