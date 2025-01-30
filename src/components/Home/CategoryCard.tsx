import { Card, CardFooter, Image } from "@heroui/react"
import { useNavigate } from "react-router"

interface ProductCategoryCardProps {
  image: string
  name: string
}

export default function CategoryCard({ image, name }: ProductCategoryCardProps) {

    const navigate = useNavigate()

    return (
        <Card onPress={()=>{
            navigate(`/category/${name}`)
        }} 
        isPressable 
        shadow="lg" 
        className="relative z-1 overflow-hidden group rounded-md"
        >
        
        <Image src={image} alt={name} className="z-0 h-[400px] "/>
        <div className="absolute inset-0 bg-black opacity-0  hover:opacity-25 duration-500"></div>
            <CardFooter className=" absolute bottom-0 w-full bg-purple-300 text-black bg-opacity-50 p-4">
                <h1 className="text-2xl font-bold text-center w-full">{name}</h1>
            </CardFooter>
        </Card>
    )
}