import { Outlet } from "react-router"
import AppNavbar from "./Navbar"
import Footer from "./Footer"
import { useEffect } from "react"

const Layout = () => {

    useEffect(()=>{
  
      const theme  = localStorage.getItem("theme")
      const html = document.querySelector("html")
      if(theme=='1'){
        html?.classList.add("dark")
      }
    },[])
  

  return (
    <>
        <AppNavbar/>
        <div className='m-4 min-h-screen '>
          <Outlet/>
        </div>
        <Footer/>
    
    </>
  )
}

export default Layout