import { Accordion, AccordionItem, Button } from "@heroui/react";
import { FaTiktok,FaTwitter,FaFacebook,FaInstagram,FaYoutube } from "react-icons/fa";

const socialMediaIcons = [FaFacebook,FaTwitter,FaInstagram,FaYoutube,FaTiktok]

const additionalInfo = [
    {title:"Support", links:["Contact Us","FAQ","Shipping"]},
    {title:"About Us", links:["About Techtopia","Careers","Suppliers"]},
    {title:"Customer Service", links:["Support","FAQ","Contact Us"]}
]

const Footer = () => {
  return (
    <>
    <div className="hidden md:flex w-full py-8 bg-gray-600 text-white text-center">
        <div className="container mx-auto flex flex-col md:flex-row justify-around">
            {additionalInfo.map((info, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <h3 className="font-bold">{info.title}</h3>
                    {info.links.map((link, index) => (
                        <a key={index} className="hover:underline cursor-pointer">{link}</a>
                    ))}
                </div>
            ))}
        </div>
    </div>

    <Accordion className="md:hidden container mx-auto py-4 cursor:pointer">
        {additionalInfo.map((info, index) => (
            <AccordionItem 
            key={index} 
            title={info.title} 
            className="font-semibold cursor-pointer">
                <div className="flex flex-col gap-2">
                    {info.links.map((link, index) => (
                        <a key={index} className="hover:underline cursor-pointer ml-4 font-normal">{link}</a>
                    ))}
                </div>
            </AccordionItem>

        ))}

    </Accordion>

    <div className="w-full py-4 bg-gray-800 text-white text-center flex flex-col md:flex-row items-center justify-around gap-4">
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