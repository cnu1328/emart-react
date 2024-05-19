import { Box, Typography } from "@mui/material";
import Footer from "./Footer/Footer";
import TopButton from "./TopButton/TopButton";
import ProductCard from "./Product";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { httpRequest } from "../Interceptor/axiosInterceptor";
import { url } from "../utils/baseUrl";
import { useAuth } from "../context/Auth";
import { useLocation } from 'react-router-dom';
import { useAppContext } from "../App";
import AlertDialog from "./AlertDialog";

export default function View() {

    
    const location = useLocation();

    const [product, setProducts] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(true);
    const [errors, setError] = useState<string | null>(null);
    
    const { isAuthenticated } = useAuth();
    const { handleToast } = useAppContext();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    

    const { refetch: getYourProducts, isSuccess, data, isError, error } = useQuery({
        queryFn: () => httpRequest.get(`${url}/user/products/myProducts`, {

        }),
        queryKey: ["get", "your", "products"],
        enabled: false,
    });

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
        }
    }, []);


    const { mutate: deleteProduct, isSuccess: isDeleteSuccess, data: afterDeleteProduct } = useMutation({
        mutationFn: (productId: string) => httpRequest.post(`${url}/user/${productId}/delete`),
    });

    useEffect(() => {
        if(isDeleteSuccess) {
            setProducts(afterDeleteProduct.data);
            handleToast("The Product deleted Successfully.");
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
        console.log("Edit Button is Clicked", productId);
        
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
                    fontSize: "40px",
                    marginBottom: "-12px",
                    wordSpacing: "5px",
                    }}
                >
                    <span style={{ color: "#7f7f7f" }}>{"Your Products : "}</span>
                    <span>
                        {product.length > 0 ? `You added ${product.length} products` : "No products added, start selling and earn more"}

                    </span>
                </h1>
                <Box
                    
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
                                showButton={location.pathname === '/view'}
                                onDeleteClick={onDeleteClick}
                                onEditClick={onEditClick}
                            />
                        );
                    })}
                    
                </Box>

            </Box>
            
            
            <Footer />
           
            <TopButton theme={{ body: "#EDF9FE", text: "#001C55" }} />
            
            <AlertDialog 
                open={dialogOpen}
                handleClose={handleDialogClose}
                handleConfirm={handleConfirmDelete}
            />

        </Box>
    );
}