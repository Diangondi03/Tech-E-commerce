import { Input } from "@heroui/react"
import { useEffect, useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { useLocation, useNavigate } from "react-router"

const SearchBar = () => {

    const [search, setSearch] = useState<string>("")
    const location = useLocation();


    const navigate = useNavigate()

    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
    }

    const handleSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault()
        if(search.length>0){
            navigate("/search?q="+search)
        } 
    }

    useEffect(()=>{
        if(location.pathname!='/search'){
            setSearch("")
        }
    },[location.pathname])
    
    

    return (
        <div className="w-full md:w-3/4 rounded-xl overflow-hidden mx-2">
            <form onSubmit={handleSearch}>

                <Input
                    className="bg-gray-100 rounded-xl text-black" 
                    value={search}
                    onChange={handleChange} 
                    placeholder="What can we help you find?" 
                    onClear={()=>setSearch("")}
                    isClearable startContent={<IoIosSearch/>}
                />
            </form>
        </div>
  )
}

export default SearchBar