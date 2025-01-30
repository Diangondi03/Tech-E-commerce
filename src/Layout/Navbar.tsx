import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Tooltip} from "@heroui/react";
import Logo from "../assets/brand.png"
import { BsCart2 } from "react-icons/bs";
import { MdOutlineDarkMode,MdOutlineLightMode } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import SearchBar from "./SearchBar";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import NavDropdown from "./NavDropdown";
import NavMenu from "./NavMenu";


export default function AppNavbar() {
    const [isDark,setIsDark] = useState<boolean | null>(null)
    const [isMenuOpen,setIsMenuOpen] = useState<boolean>(false)

    useEffect(()=>{
        const isItemDark = localStorage.getItem("theme") == '1'
        setIsDark(isItemDark)
    },[])

    
    const Icons = [
        {icon:BsCart2, tooltip:"Cart",action:()=>{}}, 
        {icon:isDark ? MdOutlineLightMode : MdOutlineDarkMode, tooltip:"Dark Mode",action:()=>{
            const theme : string | null = localStorage.getItem("theme")
            document.querySelector("html")?.classList.toggle("dark")
            if(theme){
                localStorage.setItem("theme",theme=='0' ? "1" : "0")
                setIsDark(!isDark)
            }
            else{
                localStorage.setItem("theme","1")
                setIsDark(true)
            }
        }}, 
        {icon:FaRegUser, tooltip:"Profile",action:()=>{}}
    ]

    
    return (
        <Navbar className="bg-blue-200 dark:bg-near-black shadow-md py-6 md:py-2" isMenuOpen={isMenuOpen} onMenuOpenChange={()=>{setIsMenuOpen(!isMenuOpen)}}>
            
            <div className="container flex flex-col md:flex-row items-center">

            <div className="w-full flex items-center ">
                    <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="md:hidden text-gray-900 dark:text-white mr-4 cursor-pointer"/>
                    <NavbarBrand>
                        <Link to={"/"}>
                            <img src={Logo} className="max-h-10"/>
                        </Link>
                    </NavbarBrand>
                <NavbarContent justify="start" className="ml-4">

                <NavDropdown/>
                    
                </NavbarContent>

                    <NavbarContent justify="center" className="flex-grow   hidden md:flex ">

                        <SearchBar/>
                    </NavbarContent>
                
                <NavbarContent justify="end">
                    {isDark!==null && Icons.map((Icon, index) => (
                        <NavbarItem key={index}>
                        <Tooltip content={Icon.tooltip} showArrow={true} className="bg-gray-500 text-white">

                            <Button isIconOnly className="rounded-full cursor-pointer" onPress={Icon.action}>

                                <Icon.icon size={20} className="text-gray-900 dark:text-neutral-200"/>
                            </Button>
                        </Tooltip>
                    </NavbarItem>
                    ))}
                </NavbarContent>
            </div>
            <div className="w-full rounded-xl overflow-hidden md:hidden mt-2">
                <SearchBar/>
            </div>
            </div>

            <NavMenu setIsMenuOpen={setIsMenuOpen}/>
        </Navbar>
    );
}
