import { NavbarMenu, NavbarMenuItem } from "@heroui/react";
import { Link } from "react-router";

import { categories } from "../categories";

const NavMenu = ({setIsMenuOpen}) => {
    return (
        <NavbarMenu className="mt-10 p-10">
        {categories.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="py-2">
            <Link
              className="w-full text-xl"
              to={`/category/${item}`}
              onClick={()=>{
                setIsMenuOpen(false)
              }}
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    );
}

export default NavMenu;