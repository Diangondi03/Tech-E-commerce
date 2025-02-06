import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosConfig";
import { Product } from "../types";

export const useProduct = (productId: string | undefined) => {
    const [product, setProduct] = useState<Product | null >(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        setLoading(true);
        const fetchProduct = async () => {
            const res = await axiosInstance.get(`products/${productId}`);
            setProduct(res.data.product);
            setLoading(false);
        };
        fetchProduct();
    }, [productId]);
    
    return { product, loading };
}