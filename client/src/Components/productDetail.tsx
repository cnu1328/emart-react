import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../Interceptor/axiosInterceptor";
import { url } from "../utils/baseUrl";
import { useAppContext } from "../App";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { loadStripe } from "@stripe/stripe-js";


export default function ProductDetail() {

    const { productId } = useParams();
    const [images, setImages] = useState([]);

    const { handleToast } = useAppContext();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
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

    const {refetch: addtoCart, data: cartData, isSuccess: isAddToCartSuccess} = useQuery({
        queryFn: () => httpRequest.patch(`${url}/user/${productId}`),
        queryKey: ["add", "to", "cart", productId],
        enabled: false,
    });


    useEffect(() => {
        if(isAddToCartSuccess) {
            handleToast("The product is added to your cart");
        } 
    }, [isAddToCartSuccess, handleToast]);


    const {refetch: cartCheck, data: cartCheckData } = useQuery({
        queryFn: () => httpRequest.get(`${url}/user/check/${productId}`),
        queryKey: ["check", "cart", productId],
        enabled: false,
    });

    useEffect(() => {
        if (isAuthenticated) {
            cartCheck();
        }
    }, [isAuthenticated, cartCheck]);

    const handleBuynow = async () => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

        const body = {
            products: data?.data?.product
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch(`${url}/user/payment/create-checkout-session`, {
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session = await response.json();

        const result = await stripe?.redirectToCheckout({
            sessionId:session.id
        });
        
        if(result?.error){
            console.log(result.error);
        }
    }


    const handleAddtoCart = () => {
        if(isAuthenticated) {
            addtoCart();
        }

        else {
            navigate("/auth/signup");
        }
    }

    return (
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
                        gap: "6px",
                    }}
                >

                    <h1>
                       {data?.data.product?.name}
                    </h1>

                    <h4>₹ {data?.data.product?.price}</h4>

                    <h5>
                        owner{" "}
                        
                        <Link to={`/user/${data?.data.user._id}/${isAuthenticated ? `wishlist` : 'product'}`}>
                            <strong>{data?.data.user.name}</strong>
                        </Link>
                    </h5>

                    

                    <button
                        type="button"
                        style={{
                            width: "100%",
                            margin: "10px 0px 20px 0px",
                            padding: "8px 0px",
                            borderRadius: "10px",
                            border: "none",
                            backgroundColor: "#0098DA",
                            color: "#f6f2f2",
                            fontSize: "18px",
                            fontWeight: "bold",
                        }}    
                    >
                        <i className="fa-solid fa-comments" style={{marginRight: "10px",}}></i>
                        Chat With Seller
                    </button>

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


                    <Box
                        style={{
                            width: "100%",
                            margin: "auto",
                            marginTop: "10px",
                            marginBottom: "60px",
                            display: "flex",
                            gap: "30px",
                            flexWrap: "wrap"
                        }}
                    >
                        
                        { (cartData?.data?.cart?.includes(productId) ||
                           cartCheckData?.data?.cart?.includes(productId)) ? (
                            
                            <Link to={`/cartItems`}
                                style={{ 
                                    color: "white", 
                                    textDecoration: "none",
                                    flex: "1 0 45%",
                                    padding: "7px 0",
                                    backgroundColor: "#00BDF0",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                <i className="fa-solid fa-cart-plus" style={{marginRight: "10px",}}></i>
                                Go to Cart
                            </Link>
                                
                            
                        ) : (
                            <button type="button"
                                style={{ 
                                    flex: "1 0 45%",
                                    padding: "7px 0",
                                    backgroundColor: "#00BDF0",
                                    border: "none",
                                    borderRadius: "10px",
                                    fontWeight: "bold",
                                    

                                }} 
                                onClick={handleAddtoCart}
                            >
                                <i className="fa-solid fa-cart-plus" style={{marginRight: "10px",}}></i>
                                Add to Cart
                            </button>
                        )}
                        
                        

                        <button type="button"
                            style={{
                                flex: "1 0 45%",
                                padding: "7px 0",
                                backgroundColor: "#0076DB",
                                border: "none",
                                borderRadius: "10px",
                                fontWeight: "bold",
                                color: "#ebe3e3",
                            }}
                            onClick={handleBuynow}
                        >
                            <i className="fa-solid fa-bag-shopping" style={{marginRight: "10px",}}></i>
                            Buy Now
                        </button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}