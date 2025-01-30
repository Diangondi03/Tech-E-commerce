import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Tooltip} from "@heroui/react";
import Logo from "../assets/brand.png"
import { BsCart2 } from "react-icons/bs";
import { MdOutlineDarkMode,MdOutlineLightMode } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import SearchBar from "./SearchBar";
import { Link } from "react-router";
import { useEffect, useState } from "react";



export default function AppNavbar() {
    const [isDark,setIsDark] = useState<boolean | null>(null)
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
        <Navbar className="shadow-md dark:bg-near-black py-6 sm:py-2 " shouldHideOnScroll>
            
            <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">

            <div className="w-full flex">

                <NavbarBrand>
                    <Link to={"/"}>
                        <img src={Logo} className="max-h-10"/>
                    </Link>
                </NavbarBrand>

                    <NavbarContent justify="center" className="flex-grow hidden sm:flex">

                        <SearchBar/>
                    </NavbarContent>
                
                <NavbarContent justify="end">
                    {isDark!==null && Icons.map((Icon, index) => (
                        <NavbarItem key={index}>
                        <Tooltip content={Icon.tooltip} showArrow={true} className="bg-gray-500 text-white">

                            <Button isIconOnly className="rounded-full cursor-pointer" onPress={Icon.action}>

                                <Icon.icon size={24} className="text-gray-900 dark:text-neutral-200"/>
                            </Button>
                        </Tooltip>
                    </NavbarItem>
                    ))}
                </NavbarContent>
            </div>
            <div className="w-full rounded-xl overflow-hidden sm:hidden mt-2">
                <SearchBar/>
            </div>
            </div>
        </Navbar>
    );
}
