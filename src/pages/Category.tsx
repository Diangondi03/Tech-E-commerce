import { useParams } from "react-router"
import { categories } from "../categories"
import Error from "./Error"
import { useEffect } from "react"

const Category = () => {
  const {categoryType} = useParams()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if(!categories.includes(categoryType)){
    return <Error/>
  }
  
  return (
    <h1 className="text-center text-4xl font-bold">{categoryType}</h1>
  )
}

export default Category