/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { httpRequest } from "../Interceptor/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";
import { url } from "../utils/baseUrl";
import { Box, useMediaQuery } from "@mui/material";
import ProductCard from "../Components/Product";
import TopButton from "../Components/TopButton/TopButton";

export default function SearchResults() {
    
    const { query } = useParams();
    console.log(query);
    
    const [product, setProducts] = useState<Array<any>>([]);
    
    const {isSuccess, data } = useQuery({
        queryFn: () => httpRequest.post(`${url}/sell/${query}`, {

        }),
        queryKey: ["search", "get", query],
        enabled: true,
    })

    // useEffect(() => {
    //     search();
    // }, []);

    useEffect(() => {
        if(data) setProducts(data?.data);
        if(isSuccess) {
            setProducts(data.data);
        }
    }, [isSuccess, data]);

    
    const isSmallScreen = useMediaQuery('(max-width:430px)');
    const isBigScreen = useMediaQuery('(min-width: 770px')
    


    return(
        <Box>
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                <h1
                    style={{
                        marginTop: "15px",
                        marginLeft: "20px",
                        fontSize: isBigScreen ? "30px" : isSmallScreen ? "20px" : "30px",
                        marginBottom: "-12px",
                        wordSpacing: "5px",
                    }}
                >
                    <span style={{ color: "#7f7f7f" }}>{"Results for "}</span>
                    <span>{query}</span>
                </h1>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
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
                            />
                        );
                    })}
                    
                </Box>

            </Box>
            
            
            
           
            <TopButton theme={{ body: "#EDF9FE", text: "#001C55" }} />

        </Box>
    );


}