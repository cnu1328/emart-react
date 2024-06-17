/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import Tab from "../Components/Tab";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";
import UserNavList from "../Components/WishList";
import UserCard from "../Components/UserCard";
import { httpRequest } from "../Interceptor/axiosInterceptor";
import { url } from "../utils/baseUrl";
import { useQuery } from "@tanstack/react-query";



const  USER_PAGE_TAB_OPTIONS_AUTH = [
    {
        id: 1,
        url: "/user/userId/wishlist",
        title: "wishlist",
    },
    {
        id: 2,
        url: "/user/userId/cart",
        title: "cart"
    }, 
    {
        id: 3,
        url: "/user/userId/orders",
        title: "orders"
    }
];

const  USER_PAGE_TAB_OPTIONS_UNAUTH = [
    {
        id: 1,
        url: "/user/userId/products",
        title: "products",
    }
];


export default function UserDetail() {

    const { tab, userId } = useParams();
    const { user } = useAuth();
    

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [optionsTab, setOptionsTab] = useState<
        typeof USER_PAGE_TAB_OPTIONS_AUTH
    >([]);

        
    
    console.log(userId);
    const { data, isSuccess : isGetUserData } = useQuery({
        queryFn: () => httpRequest.get(`${url}/user/${userId}`),
        queryKey: ["user", userId],
    });

    useEffect(() => {
        if(isGetUserData) {
            document.title = `${data.data.name} - Profile`;
            if(user?._id === userId) {

                const updatedOptions = USER_PAGE_TAB_OPTIONS_AUTH.map((item) => {
                    return {...item, url : item.url.replace("userId", data.data._id)};
                })

                setOptionsTab(updatedOptions);
            }

            else {
                const updatedOptions = USER_PAGE_TAB_OPTIONS_UNAUTH.map((item) => {
                    return {...item, url : item.url.replace("userId", data.data._id)};
                })

                setOptionsTab(updatedOptions);
            }
        }
    }, [data, isGetUserData, user, userId]);



    return (
        <Box sx={{ display: "flex", flexDirection: isSmallScreen ? "column" : "row", width: "95%", paddingBottom: "80px"}} >
            <Box 
                className="rightBar"
                sx={{
                    width: isSmallScreen ? "100%" : "35%",
                    padddingTop: "3vh",
                    display: "flex",
                    flexDirection: "column",
                    gap: "38px",
                }}
            >
                <UserCard 
                    email={data?.data.email}
                    username={data?.data.name}
                    bio={data?.data.bio}
                    avatar={data?.data.avatar}
                    userId={data?.data._id}
                    edit="edit"
                />

            </Box>


            <Box
                className="productList"
                sx={{
                    borderLeft: "solid 1px rgba(242, 242, 242, 1)",
                    width: isSmallScreen ? "100" : "69%",
                    paddingTop: "3vh",
                    minHeight: "97vh",
                    display: "flex",
                    flexDirection: "column",
                    gap: "38px",
                    marginRight: "auto",
                }}
            >
                <Box
                    className="inner_container_main"
                    sx={{
                        width: "100%",
                        marginLeft: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                    }}
                >

                    <span style={{ marginTop: "0px" }}>{""}</span>

                    <Tab options={optionsTab} activeTab={tab ?? "wishlist"} />
                    
                    
                    {tab === "wishlist" && <UserNavList tab={tab} productIds={data?.data.wishlist} />  }

                    {tab === "cart" && <UserNavList tab={tab}  productIds={data?.data.cart} />}

                    {tab === "orders" && <UserNavList tab={tab}  productIds={data?.data.buy} />}

                    {tab === "products" && <UserNavList tab={tab}  productIds={data?.data.sell} />}

                    


                </Box>

            </Box>

        </Box>
    );
}