import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAppContext } from "../../App";
// import { useAuth } from "../../context/Auth";
import { httpRequest } from "../../Interceptor/axiosInterceptor";
import { url } from "../../utils/baseUrl";
import ProductCarousel from "../../Components/ProductCarousel";
import Header from "./Header";



export default function ProductInfo() {

    const { productId } = useParams();
    const [images, setImages] = useState([]);

    const { handleToast, hideNavbar } = useAppContext();
    // const { isAuthenticated } = useAuth();    

    useEffect(() => {
        hideNavbar(true);
        return () => {
            hideNavbar(false);
        };
    }, []);

    
    const { refetch: getProduct, data, isSuccess: getProductSuccess, isError} = useQuery({
        queryFn: () => httpRequest.get(`${url}/sell/${productId}`),
        queryKey: ["product", productId],
        enabled: false,
    });

    useEffect(() => {
        getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if(getProductSuccess) {
           console.log(data.data);
           setImages(data?.data?.product?.images?.split(","));
        }
    
        if(isError) {
            handleToast("No Such Post Found");
        }

    }, [getProductSuccess, data, isError, handleToast])



    return (
        <>
            <Header />
            <Box
            style={{
                padding: "10px 15px 10px 15px"
            }}
        >
            <Box
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    maxWidth: "600px",
                    width: "100%",
                    margin: "auto",
                    marginTop: "30px",
                }}
            >
                <ProductCarousel images={images.slice(0, -1)} />    

                <Box
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >

                    <h1 style={{ textAlign: "left"}}   >
                       {data?.data.product?.name}
                    </h1>

                    <h4>₹ {data?.data.product?.price}</h4>


                    <p
                        style={{
                            fontSize: "16px",
                            lineHeight: 1.6,
                            textAlign: "justify",
                            color: "rgb(46, 43, 43)",
                            textIndent: "50px",
                        }}
                    >
                        {data?.data.product.description}
                    </p>
                </Box>
            </Box>
            </Box>
        </>
        
    );
}