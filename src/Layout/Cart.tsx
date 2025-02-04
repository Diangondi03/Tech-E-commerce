import { useState } from "react"
import CartItem from "../components/Cart/CartItem"

const dummyProducts = [
  { id: 1, name: "Smartphone X", price: 999, discountedPrice: 899, quantity: 2, imageUrl: "/placeholder.svg" },
  { id: 2, name: "Wireless Earbuds", price: 199, discountedPrice: 179, quantity: 1, imageUrl: "/placeholder.svg" },
  { id: 3, name: "Laptop Pro", price: 1499, discountedPrice: 1399, quantity: 1, imageUrl: "/placeholder.svg" },
]

export default function Cart() {
  const [total,setTotal] = useState(dummyProducts.reduce((acc, product) => acc + product.discountedPrice * product.quantity, 0))


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden dark:bg-near-black">
        <div className="p-4 border-b hidden md:block">
          <div className="grid grid-cols-12 gap-4 font-semibold text-sm uppercase">
            <div className="col-span-6">Product</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Subtotal</div>
          </div>
        </div>
        {dummyProducts.map((product) => (
          <CartItem key={product.id} product={product} setTotal={setTotal}/>
        ))}
        <div className="p-4 border-t flex flex-col ">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total:</span>
            <span className="font-bold text-2xl">${total.toFixed(2)}</span>
          </div>
          <button className="mt-4 self-end font-bold bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

