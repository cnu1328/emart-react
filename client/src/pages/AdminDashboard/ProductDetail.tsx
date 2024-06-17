import { useEffect, useState } from "react";
import { useAppContext } from "../../App";
import Header from "./Header";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../../Interceptor/axiosInterceptor";
import { url } from "../../utils/baseUrl";
import UserCard from "../../Components/UserCard";
import Tab from "./UserTab";
import Product from "./Product";
import { Flex } from "../../ui-library/flex";
import ProductNavList from "./ProductNavList";

const  optionsTab = [

    {
        id: 2,
        title: "Cart"
    }, 
    {
        id: 3,
        title: "Orders"
    },
    {
        id: 4,
        title: "Wishlist",
    },
    
];


export const ProductsDetail = () => {

    const { hideNavbar }  = useAppContext();

    useEffect(() => {
        hideNavbar(true);
        return () => {
            hideNavbar(false);
        };
    }, []);


    const { productId } = useParams();

    const [tab, setTab] = useState("Cart");
    

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    
    
    
    console.log(productId);
    const { data } = useQuery({
        queryFn: () => httpRequest.get(`${url}/user/admin/product/${productId}`),
        queryKey: ["user", productId],
    });


    // console.log(data?.data, data?.data.data[0].images?.split(',')[0]);

    
    return (
        <>
            <Header />

            <Box sx={{ display: "flex", flexDirection: "column", width: "95%", marginTop: "30px"}} >
                <Box 
                    className="rightBar"
                    sx={{
                        padddingTop: "3vh",
                        display: "flex",
                        flexDirection: isSmallScreen ? "column" : "row",
                        gap: "38px",
                        margin: "auto",
                    }}
                >
                    <Product
                        name={data?.data.data[0].name}
                        image={data?.data.data[0].images?.split(',')[0]}
                        price={data?.data.data[0].price}
                    />

                    <Flex flexDirection="column" justifyContentCenter>

                        <UserCard 
                            email={data?.data.data[0].seller.email}
                            username={data?.data.data[0].seller.name}
                            userId ={data?.data.data[0].seller._id}
                            bio ={""}
                            avatar={data?.data.data[0].seller.avatar}
                        />

                        <p style={{ color: "gray", fontSize: "1.5rem", textAlign: "center", marginTop: "30px"}}>Seller</p>
                    </Flex>
                    

                </Box>


                <Box
                    className="productList"
                    sx={{
                        borderBottom: "solid 2px rgba(242, 242, 242, 1)",
                        width: "100%",
                        paddingTop: "3vh",
                        minHeight: "97vh",
                        display: "flex",
                        flexDirection: "column",
                        gap: "38px",
                        marginLeft: "auto",
                    }}
                >
                    <Box
                        className="inner_container_main"
                        sx={{
                            width: "80%",
                            margin: "auto",
                            marginTop: "0",
                            display: "flex",
                            flexDirection: "column",
                            gap: "30px",
                        }}
                    >

                        <span style={{ marginTop: "0px" }}>{""}</span>
                        
                        <Tab options={optionsTab} activeTab={tab ?? "Wishlist"} setTab={setTab} />
                        
                        
                        {tab === "Wishlist" && <ProductNavList tab={tab} users={data?.data.data[0].wishlistUsers} />  }

                        {tab === "Cart" && <ProductNavList tab={tab}  users={data?.data.data[0].cartUsers} />}

                        {tab === "Orders" && <ProductNavList tab={tab}  users={data?.data.data[0].orderUsers} />}

                    </Box>

                </Box>

            </Box>

        </>
    );
}