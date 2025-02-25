import { Button, Input } from "@heroui/react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { dbAxiosInstance } from "../axiosConfig"

interface User {
  name: string
  email: string
  password: string
}

export default function Signup() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null) 
    if(user.password.length < 8){
      setError("Password must be at least 8 characters long")
      return
    }

    try {

      await dbAxiosInstance.post("signup", user,{withCredentials:true})
      navigate("/login")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    }
  }

  useEffect(() => {
    const html = document.querySelector("html")
    html?.classList.remove("dark")
  }, [])

  return (
    <div className="container mx-auto py-8 p-9">
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
              validate={(value) => {
                if (value.length < 8) {
                  return "Name must be at least 3 characters long";
                }
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
              
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters long";
                }
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full cursor-pointer"
              type="submit"
            >
              Sign Up
            </Button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-800">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

