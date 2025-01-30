import { Outlet } from "react-router"
import AppNavbar from "./Navbar"
import Footer from "./Footer"

const Layout = () => {

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