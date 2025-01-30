
import { useEffect } from 'react'
import './App.css'


function Home() {
  
  useEffect(()=>{
    const theme  = localStorage.getItem("theme")
    const html = document.querySelector("html")
    if(theme=='1'){
      html?.classList.add("dark")
    }
  })

  return (
    <div className='container mx-auto min-h-screen '>

    </div>
  )
}

export default Home
