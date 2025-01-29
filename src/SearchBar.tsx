import { Input } from "@heroui/react"
import { IoIosSearch } from "react-icons/io"
import { useNavigate } from "react-router"

const SearchBar = () => {

    const navigate = useNavigate()

    const handleSearch=()=>{
        navigate("/search")
    }

    return (
        <div className="w-full rounded-xl overflow-hidden">
            <form onSubmit={handleSearch}>

                <Input  className="bg-gray-100 rounded-xl"  placeholder="What can we help you find?" isClearable startContent={<IoIosSearch/>}/>
            </form>
        </div>
  )
}

export default SearchBar