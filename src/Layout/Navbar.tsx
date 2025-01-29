import {Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Tooltip} from "@heroui/react";
import Logo from "../assets/brand.png"
import { BsCart2 } from "react-icons/bs";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

import SearchBar from "./SearchBar";
import { Link } from "react-router";

const Icons = [
    {icon:BsCart2, tooltip:"Cart"}, 
    {icon:MdOutlineDarkMode, tooltip:"Dark Mode"}, 
    {icon:FaRegUser, tooltip:"Profile"}
]


export default function AppNavbar() {


    return (
        <Navbar className="shadow-md dark:bg-red-100 py-6 sm:py-2 " shouldHideOnScroll>
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
                    {Icons.map((Icon, index) => (
                        <NavbarItem key={index}>
                        <Tooltip content={Icon.tooltip} showArrow={true} className="bg-gray-500 text-white">

                            <Button isIconOnly className="rounded-full cursor-pointer">

                                <Icon.icon size={24} className="text-gray-900"/>
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
