import { Input } from "@heroui/react"
import { useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { useNavigate } from "react-router"

const SearchBar = () => {

    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }

    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        if(search.length>0){
            console.log(search.length)
            navigate("/search/"+search)
        } 
    }
    

    return (
        <div className="w-full md:w-3/4 rounded-xl overflow-hidden mx-2">
            <form onSubmit={handleSearch}>

                <Input
                    className="bg-gray-100 rounded-xl text-black" 
                    value={search}
                    onChange={handleChange} 
                    placeholder="What can we help you find?" 
                    isClearable startContent={<IoIosSearch/>}
                />
            </form>
        </div>
  )
}

export default SearchBar