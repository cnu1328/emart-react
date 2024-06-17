/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from "@mui/material";
import Footer from "./Footer/Footer";
import ProductCard from "./Product";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { httpRequest } from "../Interceptor/axiosInterceptor";
import { url } from "../utils/baseUrl";
import { useAuth } from "../context/Auth";
import { useLocation } from 'react-router-dom';
import { useAppContext } from "../App";
import AlertDialog from "./AlertDialog";

export default function CartList() {

    
    const location = useLocation();

    const [product, setProducts] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setError] = useState<string | null>(null);
    const [wishlist, setWishlist] = useState<Array<any>>([]);
    
    const { isAuthenticated } = useAuth();
    const { handleToast } = useAppContext();
    

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    

    const { refetch: getYourProducts, isSuccess, data, isError, error } = useQuery({
        queryFn: () => httpRequest.get(`${url}/user/products/mycart`, {

        }),
        queryKey: ["get", "your", "cart"],
        enabled: false,
    });

    const { refetch : getWishlist, isSuccess : isGetWishlist, data : WishlistData } = useQuery({
        queryFn: () => httpRequest.get(`${url}/user/wishlist/get`),
        queryKey: ["get", "wishlist"],
        enabled: false,
    });

    useEffect(() => {
        if(isGetWishlist) {
            setWishlist(WishlistData.data);
        }
    }, [isGetWishlist, WishlistData]);

    useEffect(() => {
        if(isSuccess) {
            setLoading(false);
            setProducts(data.data);
        }

        if(isError) {
            setError(error.message);
        }
    }, [isSuccess, data, isError, error]);

    useEffect(() => {
        if(isAuthenticated) {
            getYourProducts();
            getWishlist();
        }
    }, []);


    const { mutate: deleteProduct, isSuccess: isDeleteSuccess, data: afterDeleteProduct } = useMutation({
        mutationFn: (productId: string) => httpRequest.post(`${url}/user/${productId}/removecart`),
    });

    useEffect(() => {
        if(isDeleteSuccess) {
            setProducts(afterDeleteProduct.data);
            handleToast("The Product Removed From Cart Successfully.");
        }

    }, [isDeleteSuccess, afterDeleteProduct, handleToast]);

    const handleDialogOpen = (productId: string) => {
        setSelectedProductId(productId);
        setDialogOpen(true);
    }

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedProductId(null);
    }

    const handleConfirmDelete = () => {
        if(selectedProductId) {
            deleteProduct(selectedProductId);
            handleDialogClose();
        }
    }

    const onDeleteClick = (productId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        console.log("Delete Button is Clicked", productId);
        handleDialogOpen(productId);
    };

    const onEditClick = (productId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        console.log("Buy Button is Clicked", productId);

        

    };

    if (loading) return <Typography mt={2} mb={2}>Loading....</Typography>

    if (errors) return <Typography mt={2} mb={2}>Some error occured - {errors}</Typography>

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
                    fontSize: "25px",
                    marginBottom: "-12px",
                    wordSpacing: "5px",
                    marginTop: "20px",
                    marginLeft: "30px",
                    textAlign: "left"
                    }}
                >
                    <span style={{ color: "#7f7f7f" }}>{"Your CartItems "}</span>
                    
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
                                title={item.name}
                                image={item.images}
                                description={item.description}
                                price={item.price}
                                productId={item._id}
                                key={item._id}
                                showButton={location.pathname === '/cartItems'}
                                showRemove={true}
                                onDeleteClick={onDeleteClick}
                                onEditClick={onEditClick}
                                isWishlisted={wishlist?.includes(item._id) || false}
                            />
                        );
                    })}
                    
                </Box>

            </Box>
            
            
            <Footer />
           
            
            
            <AlertDialog 
                open={dialogOpen}
                handleClose={handleDialogClose}
                handleConfirm={handleConfirmDelete}
            />

        </Box>
    );
}