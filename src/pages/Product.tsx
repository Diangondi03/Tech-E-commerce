import { useParams } from "react-router"
import AddToCartButton from "../components/AddToCartButton"
import { useProduct } from "../hooks/useProduct"
import { Image } from "@heroui/react"
import { CgUnavailable } from "react-icons/cg"
import { useEffect } from "react"


export default function Product() {
    const {productId} = useParams()
    const { product, loading } = useProduct(productId)

    const discountedPrice : number | undefined = product?.price * (1 - product?.discount / 100)
    const capitalizedBrand : string | undefined = product?.brand.charAt(0).toUpperCase() + product?.brand.slice(1)


    if (loading) {
      return <div className="container mx-auto text-center px-4 py-8">Loading...</div>
    }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="md:sticky md:top-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-400">
            <span className="absolute inset-0 flex justify-center items-center">
                <CgUnavailable className="text-4xl text-white" />
            </span>
            <Image
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-center z-10 aspect-[4/3] object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product?.title}</h1>
            <p className="mb-4">Brand: {capitalizedBrand}</p>
            <div className="flex items-baseline mb-4">
              <span className="text-2xl font-semibold text-purple-950 dark:text-purple-300">
              ${product?.discount ? discountedPrice.toFixed(2) : product?.price.toFixed(2)}
              </span>
              {product?.discount && (
                <>
                  <span className="ml-2 text-lg text-gray-500 line-through">${product?.price}</span>
                  <span className="ml-2 text-md text-green-600">Save {product?.discount}%</span>
                </>
              )}
            </div>
            <p className="mb-6">{product?.description}</p>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Color: {product?.color}</h2>
              
            </div>
          </div>
          <AddToCartButton productId={productId} />
        </div>
      </div>
    </div>
  )
}

