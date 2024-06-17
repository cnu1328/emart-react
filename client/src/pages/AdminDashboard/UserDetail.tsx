import { useEffect, useState } from "react";
import { useAppContext } from "../../App";
import Header from "./Header";
import UserCard from "../../Components/UserCard";
import { useParams } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { url } from "../../utils/baseUrl";
import { httpRequest } from "../../Interceptor/axiosInterceptor";
import { Box } from "@mui/system";
import Tab from "./UserTab";
import UserNavList from "./UserNavList";

const  USER_PAGE_TAB_OPTIONS_AUTH = [

    {
        id: 1,
        url: "/user/userId/wishlist",
        title: "Products",
    },
    {
        id: 2,
        url: "/user/userId/cart",
        title: "Cart"
    }, 
    {
        id: 3,
        url: "/user/userId/orders",
        title: "Orders"
    },
    {
        id: 4,
        url: "/user/userId/wishlist",
        title: "Wishlist",
    },
    
];

export const UsersDetail = () => {

    const { hideNavbar }  = useAppContext();
    

    useEffect(() => {
        hideNavbar(true);
        return () => {
            hideNavbar(false);
        };
    }, []);

    const { userId } = useParams();

    const [tab, setTab] = useState("Products");
    

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

            const updatedOptions = USER_PAGE_TAB_OPTIONS_AUTH.map((item) => {
                return {...item, url : item.url.replace("userId", data.data._id)};
            })

            setOptionsTab(updatedOptions);
            
        }
    }, [data, isGetUserData, userId]);

    console.log("user", data?.data);


    return(
        <>
            <Header />

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

                        <Tab options={optionsTab} activeTab={tab ?? "Wishlist"} setTab={setTab} />
                        
                        
                        {tab === "Wishlist" && <UserNavList tab={tab} productIds={data?.data.wishlist} />  }

                        {tab === "Cart" && <UserNavList tab={tab}  productIds={data?.data.cart} />}

                        {tab === "Orders" && <UserNavList tab={tab}  productIds={data?.data.buy} />}

                        {tab === "Products" && <UserNavList tab={tab}  productIds={data?.data.sell} />}

                        


                    </Box>

                </Box>

            </Box>
        </>
    );
}