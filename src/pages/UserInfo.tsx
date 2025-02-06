"use client"

import { Button, Input } from "@heroui/react"
import { useEffect, useState } from "react"
import { useUserInfo } from "../hooks/useUserInfo"
import { dbAxiosInstance } from "../axiosConfig"
import { getUserId } from "../getUserId"
import { useNavigate } from "react-router"

export default function UserInfo() {
  const userInfo = useUserInfo().user
  const [user, setUser] = useState({name: "", email: "", password: ""})
  const userId = getUserId()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")


  useEffect(() => {
    setUser({...userInfo,password:""})
  }
  , [userInfo])
   
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    if(!token){
      navigate("login")
    }
    try {

      const res = await dbAxiosInstance.put(`update-user/${userId}`,user)
      if(res.status===403 || res.status===401){
        navigate("/login")
        return
      }
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    }
  }

  const handleLogOut = async () => {
    
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-md mx-auto bg-white dark:bg-near-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              value={user?.name}
              onChange={handleChange}
              
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={user?.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2" htmlFor="password">
              New Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Leave blank to keep current password"
              name="password"
              value={user.password}
              onChange={handleChange}
              validate={value => (value.length >= 8 || value.length===0) || "Password must be at least 8 characters long"}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
              type="submit"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
        <div className="text-center">
            <Button 
            onPress={handleLogOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer">
            Log out
            </Button>
        </div>
        
    </div>
  )
}

