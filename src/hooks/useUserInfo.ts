import { useEffect, useState } from "react"
import { dbAxiosInstance } from "../axiosConfig"
import { getUserId } from "../getUserId"
import { useNavigate } from "react-router"
import { User } from "../types"

export const useUserInfo = ()=>{
    const [user,setUser] = useState<User | []>([])
    const userId : string | null = getUserId()
    const navigate = useNavigate()

    if(!userId){
        navigate("/login")
    }

    useEffect(()=>{
        const fetchUserInfo = async()=>{
            try{

                const res = await dbAxiosInstance.get(`get-user/${userId}`)
                setUser({name:res.data.name,email:res.data.email})
            }
        
            catch (err){
                navigate("/login")
            }
        }
        fetchUserInfo()
    },[])
    return {user}
}