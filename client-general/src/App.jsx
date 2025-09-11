import React from 'react'
import './App.css'
import { useState } from 'react'
import ThemeTogglebtn from './componants/ThemeTogglebtn'


const App = () => {
  
    const [theme , setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme'):'light')
  
  
  return (
    <div>
      <div className=''>
        hello world
      {/*<ThemeTogglebtn theme={theme} setTheme={setTheme} />*/}
      </div>
      
    </div>
  )
}



export default App
