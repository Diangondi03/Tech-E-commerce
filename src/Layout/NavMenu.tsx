import { NavbarMenu, NavbarMenuItem } from "@heroui/react";
import { Link } from "react-router";

const categories = ["TV","Audio","Laptop","Mobile","Gaming","Appliances"]


const NavMenu = () => {
    return (
        <NavbarMenu className="mt-10 p-10">
        {categories.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`} className="py-2">
            <Link
              className="w-full text-xl"
              to="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    );
}

export default NavMenu;