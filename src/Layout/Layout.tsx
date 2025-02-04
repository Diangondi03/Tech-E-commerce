import { Outlet, useLocation } from "react-router"
import AppNavbar from "./Navbar"
import Footer from "./Footer"
import { useEffect } from "react"

const Layout = () => {

  const location = useLocation();


  useEffect(()=>{

    const theme  = localStorage.getItem("theme")
    const html = document.querySelector("html")
    if(theme=='1'){
      html?.classList.add("dark")
    }
  },[])

  useEffect(()=>{
    window.scrollTo(0, 0)
  },[location])

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