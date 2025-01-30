import { useParams } from "react-router"
import { categories } from "../categories"
import Error from "./Error"

const Category = () => {
  const {categoryType} = useParams()

  if(!categories.includes(categoryType)){
    return <Error/>
  }
  
  return (
    <h1 className="text-center text-4xl font-bold">{categoryType}</h1>
  )
}

export default Category