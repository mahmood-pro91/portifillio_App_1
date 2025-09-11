import React,{useState,useEffect,useRef} from 'react'
import './App.css'
import {Footer, Header,Navbar ,Hero,Trusted ,Services,Works ,Teams, ContactUs} from './components/indexCom.js'


const App = () => {
  const dotRef =useRef(null);
  const  outlineRef = useRef(null)
  // ref for custom cursor which created position tracking
  const mouse = useRef({x:0,y:0})
  const postion = useRef({x:0,y:0})
    useEffect(()=>{
      const handleMouseMove = (e)=>{
        mouse.current.x =e.clientX ; 
        mouse.current.y =e.clientY ;

      }
      document.addEventListener('mousemove',handleMouseMove);
      const animate =()=>{
        postion.current.x += (mouse.current.x -postion.current.x) * 0.1 ;
        postion.current.y += (mouse.current.y -postion.current.y) * 0.1 ;

        if(dotRef.current && outlineRef.current){
          dotRef.current.style.transform = `translate3d(${mouse.current.x - 6}px,${mouse.current.y - 6}px,0 )`;
          outlineRef.current.style.transform = `translate3d(${postion.current.x - 20}px,${postion.current.y - 20}px,0 )` ;
        } ;

        requestAnimationFrame(animate)
         
      }
      animate()

      return ()=>{
        document.removeEventListener('mousemove',handleMouseMove)
      }

    },[])


  const [theme , setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme'):'light')
  
  
  return (
    <div className={`dark:bg-black relative`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Hero />
      <Trusted />
      <Services />
      <Works />
      <Teams />
      <ContactUs />
      <Footer theme={theme} />
      {/* custom cursor ring */}
      <div ref={outlineRef} className='fixed top-0 left-0 h-10 w-10 rounded-full
      border border-blue-400 pointer-events-none z-[9999]'
      ></div>
      {/* cursor dot */}
      <div ref={dotRef} className='fixed top-0 left-0 h-3 w-3 rounded-full
      bg-blue-400 pointer-events-none z-[9999]'>

      </div>
    </div>
  )
}

export default App
