import { Outlet } from "react-router"
import AppNavbar from "./Navbar"

const Layout = () => {
  return (
    <>
        <AppNavbar/>
        <Outlet/>

    
    </>
  )
}

export default Layout