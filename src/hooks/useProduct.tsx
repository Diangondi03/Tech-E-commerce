import { useEffect, useState } from "react";
import { axiosInstance } from "../axiosConfig";

type Product = {
    id: number;
    name: string;
    price: number;
    discount: number;
    description: string;
    brand: string;
    color: string;
    image: string;
};

export const useProduct = (productId: number) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    
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