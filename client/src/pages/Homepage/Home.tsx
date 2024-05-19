import React, { Component, useEffect, useState } from "react";
// import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import TopButton from "../../Components/TopButton/TopButton";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../../Interceptor/axiosInterceptor";
import { url } from "../../utils/baseUrl";
import { Box } from "@mui/material";
import ProductCard from "../../Components/Product";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const [product, setProduct] = useState<Array<any>>([]);
    document.title = "RGUKT-EMART";

    const navigate = useNavigate();

    const {refetch: getProducts, isSuccess, data} = useQuery({
        queryFn: () => httpRequest.get(`${url}/sell/home`),
        queryKey: ["home", "products"],
        enabled: false,
    });

    

    useEffect(() => {
        console.log("It Runs only once");
        getProducts();
    }, []);

    useEffect(() => {
        if (isSuccess) {
            console.log("Data is Fetched");
            console.log(data.data);
            setProduct(data.data);
        }
    }, [isSuccess, data]);


    return(
        <Box>
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                <Box
                    
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
