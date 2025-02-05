import { useEffect, useState } from "react"
import CartItem from "../components/Cart/CartItem"
import { useCart } from "../hooks/useCart"
import { useProduct } from "../hooks/useProduct"
import { Button } from "@heroui/react"
import { dbAxiosInstance } from "../axiosConfig"
import { getUserId } from "../getUserId"


export default function Cart() {
  const userCart = useCart().cart
  const {loading} = useCart()
  const [cart, setCart] = useState([])

  useEffect(() => {
    setCart(userCart)
  }, [userCart])

  const total = cart.reduce((acc, item) => {
    return acc + (item.discount ? item.price*(1-item.discount/100) : item.price) * item.quantity
  }
  , 0)

  const purchase = async () => {
    const userId = getUserId()
    const res = await dbAxiosInstance.post('purchase',{userId})
    if(res.status===200){
      setCart([])
    }
  }


  if (loading) {
    return <p></p>
  }
  if(!loading && cart?.length === 0){
    return <h2 className="text-center text-bold text-2xl">Your cart is empty</h2>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden dark:bg-near-black">
        <div className="p-4 border-b border-neutral-300 hidden md:block">
          <div className="grid grid-cols-12 gap-4 font-semibold text-sm uppercase">
            <div className="col-span-6">Product</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-2">Quantity</div>
            <div className="col-span-2">Subtotal</div>
          </div>
        </div>
        {cart.length>0 &&  cart.map((cartItem) => (
          <CartItem key={cartItem?.productId} product={cartItem} setCart={setCart}/>
        ))}
        <div className="p-4 border-t border-neutral-300 flex flex-col ">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total:</span>
            <span className="font-bold text-2xl">${total.toFixed(2)}</span>
          </div>
          <Button onPress={purchase} className="mt-4 self-end font-bold bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 cursor-pointer">
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  )
}

