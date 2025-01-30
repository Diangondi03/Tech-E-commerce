import { Button } from "@heroui/react";
import { FaTiktok,FaTwitter,FaFacebook,FaInstagram,FaYoutube } from "react-icons/fa";
const socialMediaIcons = [FaFacebook,FaTwitter,FaInstagram,FaYoutube,FaTiktok]

const Footer = () => {
  return (
    <>
    <div className="w-full py-8 bg-gray-600 text-white text-center">
        <div className="container mx-auto flex flex-col md:flex-row justify-around">
            <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold mb-2">About Us</h2>
            <ul>
                <li><a className="hover:underline cursor-pointer">About Techtopia</a></li>
                <li><a className="hover:underline cursor-pointer">Careers</a></li>
                <li><a className="hover:underline cursor-pointer">Suppliers</a></li>
            </ul>
            </div>
            <div>
            <h2 className="text-lg font-semibold mb-2">Customer Service</h2>
            <ul>
                <li><a className="hover:underline cursor-pointer">Support</a></li>
                <li><a className="hover:underline cursor-pointer">FAQ</a></li>
                <li><a className="hover:underline cursor-pointer">Contact Us</a></li>
            </ul>
            </div>
        </div>
    </div>

    <div className="w-full py-4 bg-gray-800 text-white text-center flex items-center justify-around">
        <div className="flex flex-row gap-4">
            {socialMediaIcons.map((Icon,index)=>(
                <Button key={index} isIconOnly className="rounded-full bg-gray-700 cursor-pointer">
                    <Icon size={20}/>
                </Button>
            ))}
        </div>
        <p>© {new Date().getFullYear()} Techtopia. All rights reserved.</p>

    </div>
    </>
  )
}

export default Footer