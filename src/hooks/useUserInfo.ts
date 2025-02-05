import { useEffect, useState } from "react"
import { dbAxiosInstance } from "../axiosConfig"
import { getUserId } from "../getUserId"

export const useUserInfo = ()=>{
    const [user,setUser] = useState([])
    const userId = getUserId()


    useEffect(()=>{
        const fetchUserInfo = async()=>{
            const res = await dbAxiosInstance.get(`get-user/${userId}`)
            setUser(res.data)
        }
        fetchUserInfo()
    },[])
    return {user}
}