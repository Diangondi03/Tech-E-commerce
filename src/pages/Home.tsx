
import { useEffect } from 'react'


function Home() {
  
  useEffect(()=>{
    const theme  = localStorage.getItem("theme")
    const html = document.querySelector("html")
    if(theme=='1'){
      html?.classList.add("dark")
    }
  })

  return (
    <>
    hola
    </>
  )
}

export default Home
