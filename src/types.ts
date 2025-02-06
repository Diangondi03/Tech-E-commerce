interface DbCartItem{
    productId:number;
    quantity:number
}

export interface Product{
    id: number;
    title: string;
    image:string;
    price: number;
    description: string;
    brand: string;
    model: string;
    color: string;
    category: string;
    discount?: number;
}

export interface User{
    name:string;
    email:string;

}

export interface CartItem extends Product,DbCartItem {}