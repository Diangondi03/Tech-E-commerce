import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem } from "@heroui/react"
import { BiChevronDown } from "react-icons/bi"
import { Link } from "react-router"

const categories = ["TV","Audio","Laptop","Mobile","Gaming","Appliances"]


const NavDropdown = () => {
  return (
    <Dropdown>
        <NavbarItem>
        <DropdownTrigger>
            <Button
            disableRipple
            className="hidden lg:flex p-0 bg-transparent data-[hover=true]:bg-transparent px-2"
            endContent={<BiChevronDown/>}
            radius="sm"
            variant="light"
            >
            Categories
            </Button>
        </DropdownTrigger>
        </NavbarItem>
        <DropdownMenu
        aria-label="ACME features"
        className="shadow-md bg-white dark:bg-near-black rounded-2xl"
        itemClasses={{
            base: "gap-4",
        }}
        >
        {categories.map((category, index) => (
            <DropdownItem key={index} className="text-gray-900 dark:text-white">
            <Link to={`/category/${category}`}>{category}</Link>
            </DropdownItem>
        ))}
        </DropdownMenu>
    </Dropdown>
  )
}

export default NavDropdown