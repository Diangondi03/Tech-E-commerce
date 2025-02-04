"use client"

import { Button, Input } from "@heroui/react"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function UserInfo() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    password: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    try {
      // Here you would typically send the updated user data to your backend
      // For demonstration, we'll simulate an error sometimes
      if (Math.random() < 0.3) {
        throw new Error("Failed to update profile. Please try again.")
      }
      setSuccess("Profile updated successfully!")
      // Reset password field after submission
      setUser({ ...user, password: "" })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    }
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
          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <span className="block sm:inline">{success}</span>
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
              value={user.name}
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
              value={user.email}
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
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Update Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

