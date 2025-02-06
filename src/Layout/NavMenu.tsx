import { NavbarMenu, NavbarMenuItem } from "@heroui/react";
import { Link } from "react-router";

import { categories } from "../categories";
interface NavMenuProps {
    setIsMenuOpen: (val:boolean)=>void
}

const NavMenu = ({setIsMenuOpen}:NavMenuProps) => {
    return (
        <NavbarMenu className="mt-10 p-10">
        {categories.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="py-2 w-full bg-red-100" onClick={()=>setIsMenuOpen(false)}>
            <Link
              className="w-full text-xl"
              to={`/category/${item}`}

            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    );
}

export default NavMenu;