/* eslint-disable @typescript-eslint/no-explicit-any */
import UserProductCard from "./UserProductCard";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../Interceptor/axiosInterceptor";
import { url } from "../utils/baseUrl";

type UserNavList = {
    productIds: Array<any>;
    userId?: string;
    tab: string;
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
    productIds, userId, tab
} : UserNavList) {
 

    const { data } = useQuery({
        queryFn: () => httpRequest.post(`${url}/user/products`, { productIds, userId }),
        queryKey: ["user", "products", productIds, userId],
        enabled: !!productIds?.length, 
    });
    
    console.log("data ", data?.data);

    return(
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
            {data?.data === undefined || data?.data.length === 0 ? (
                    <p>No products found in {tab} list.</p>
                ) : (
                    data?.data.map((product : Product) => (
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