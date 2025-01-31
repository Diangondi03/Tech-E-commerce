import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosConfig";

export const useSearch = (searchTerm:string|null)=>{
    const [products,setProducts] = useState([])
    const [loading,setLoading] = useState(true)
    const [filteredProducts,setFilteredProducts] = useState([])
    


    useEffect(()=>{
        const fetchCategoryProducts = async()=>{
            const res = await axiosInstance.get("products?limit=150")
            setProducts(res.data.products)
        }
        fetchCategoryProducts()
    },[])

    useEffect(()=>{
        setLoading(true)
        if(searchTerm){
            const fuse = new Fuse(products,{
                keys:['title','brand','category','description','color'],
                threshold:0.3
            })
            const results = fuse.search(searchTerm)
            setFilteredProducts(results.map(result=>result.item))
            setLoading(false)
        }
    },[searchTerm,products])

    return {filteredProducts,loading}
}