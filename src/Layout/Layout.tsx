import { Outlet } from "react-router"
import AppNavbar from "./Navbar"
import Footer from "./Footer"

const Layout = () => {
  return (
    <>
        <AppNavbar/>
        <Outlet/>
        <Footer/>
    
    </>
  )
}

export default Layout