/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import  { useEffect, useState } from "react";
// import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import TopButton from "../../Components/TopButton/TopButton";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../../Interceptor/axiosInterceptor";
import { url } from "../../utils/baseUrl";
import { Box } from "@mui/material";
import ProductCard from "../../Components/Product";


export default function Home() {

    const [product, setProduct] = useState<Array<any>>([]);
    const [wishlist, setWishlist] = useState<Array<any>>([]);

    document.title = "RGUKT-EMART";


    const {refetch: getProducts, isSuccess, data} = useQuery({
        queryFn: () => httpRequest.get(`${url}/sell/home`),
        queryKey: ["home", "products"],
        enabled: false,
    });

    const { refetch : getWishlist, isSuccess : isGetWishlist, data : WishlistData } = useQuery({
        queryFn: () => httpRequest.get(`${url}/user/wishlist/get`),
        queryKey: ["get", "wishlist"],
        enabled: false,
    });

    

    useEffect(() => {
        console.log("It Runs only once");
        getProducts();
        getWishlist();
    }, []);

    useEffect(() => {
        if (isSuccess) {
            console.log("Data is Fetched");
            console.log(data.data);
            const availabeProducts = data.data?.filter((item: { product: { isAvailable: boolean; }; }) => item.product.isAvailable);
            console.log("Available Products", availabeProducts);
            setProduct(availabeProducts);
            
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if(isGetWishlist) {
            setWishlist(WishlistData.data);
        }
    }, [isGetWishlist, WishlistData]);

    




    return(
        <Box>
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1px",
                }}
            >
                <Box

                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(275px, 1fr))",
                    }}
                    
                >
                    {product.map((item) => {
                        return (
                            <ProductCard 
                                title={item.product.name}
                                image={item.product.images}
                                description={item.product.description}
                                price={item.product.price}
                                productId={item.product._id}
                                key={item.product._id}
                                isWishlisted={wishlist?.includes(item.product._id)}
                            />
                        );
                    })}
                    
                </Box>

            </Box>
            
            
            <Footer />
            {/* <Greeting theme={this.props.theme} />
            <Skills theme={this.props.theme} />
            <Footer theme={this.props.theme} /> */}
            <TopButton theme={{ body: "#EDF9FE", text: "#001C55" }} />

        </Box>
    );

}
