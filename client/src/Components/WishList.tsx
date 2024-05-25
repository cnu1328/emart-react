/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import UserProductCard from "./UserProductCard";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../Interceptor/axiosInterceptor";
import { url } from "../utils/baseUrl";

type UserNavList = {
    productIds: Array<any>;
    userId?: string;
}

type Product = {
    _id: string;
    name: string;
    description: string;
    images: string;
    price: number;
    category: string;
    isAvailable: boolean;
};

export default function UserNavList({
    productIds, userId
} : UserNavList) {

    const [products, setProducts] = useState<Product[]>([]);    

    const { data, isSuccess} = useQuery({
        queryFn: () => httpRequest.post(`${url}/user/products`, { productIds, userId }),
        queryKey: ["user", "products", productIds, userId],
        enabled: !!productIds.length, 
    });
    
    useEffect(() => {
        if(isSuccess) {
            setProducts(data?.data);
        }
    }, [isSuccess, data]);

    return(
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
            {products.length === 0 ? (
                    <p>No products found in wishlist.</p>
                ) : (
                    products.map((product) => (
                        <UserProductCard
                            key={product._id}
                            name={product.name}
                            description={product.description}
                            image={product.images?.split(",")[0]} 
                            price={product.price}
                            productId={product._id}
                        />
                    ))
            )}
        
        </div>
    );
}