import { useEffect } from "react";
import { useAppContext } from "../../App";
import Header from "./Header";
import { Flex } from "../../ui-library/flex";
import { Table } from "../../ui-library/table";
import { useQuery } from "@tanstack/react-query";
import { httpRequest } from "../../Interceptor/axiosInterceptor";
import { url } from "../../utils/baseUrl";
import { Label } from "../../ui-library/typography";
import { FlexContainer } from "./styles";
import { useNavigate } from "react-router-dom";




const columns = [
    { title: 'Name', dataIndex: 'name', width: '100px' },
    { title: 'Email', dataIndex: 'email', width: '150px' },
    { title: 'Carts', dataIndex: 'carts', width: '90px' },
    { title: 'WishList', dataIndex: 'wishlist', width: '90px' },
    { title: 'Orders', dataIndex: 'orders', width: '95px' },
];


const ProductColumns = [
    { title: 'Name', dataIndex: 'name', width: '100px' },
    { title: 'Seller', dataIndex: 'seller', width: '100px' },
    { title: 'Cart Count', dataIndex: 'cartCount', width: '120px' },
    { title: 'Wishlist Count', dataIndex: 'wishlistCount', width: '150px' },
    { title: 'Orders Count', dataIndex: 'orderCount', width: '150px' },
];



export const AdminDashboard = () => {

    const { hideNavbar }  = useAppContext();
    

    useEffect(() => {
        hideNavbar(true);
        return () => {
            hideNavbar(false);
        };
    }, []);


    const navigate = useNavigate();
    
    const { refetch: getUsers, isSuccess , data } = useQuery({
        queryFn: () => httpRequest.get(`${url}/user/admin/users`),
        queryKey: ["get", "admin", 'users'],
        enabled: false,
    });

    const { refetch: getProducts, isSuccess : isProduct, data : productData} = useQuery({
        queryFn: () => httpRequest.get(`${url}/user/admin/products`),
        queryKey: ['get', 'admin', 'products'],
        enabled: false,
    });

    useEffect(() => {
        console.log("It Runs only once");
        getUsers();
        getProducts();
    }, []);

    const getModifiedUserData = (users : any) => {
        console.log(users);

        if (!users) return [];

        return users.map((user : any) => ({
            id: user._id,
            name: user.name,
            email: user.email,
            carts: user.cart?.length || 0,
            wishlist: user.wishlist?.length || 0,
            orders: user.order?.length || 0,
        }))
    }

    const getModifiedProductData = (products : any) => {
        console.log(products);
        if(!products) return [];

        return products.data.map((product : any) => ({
            id: product._id,
            name: product.name,
            price: product.price,
            seller: product.sellerName,
            wishlistCount: product.wishlistCount || 0,
            cartCount: product.cartCount || 0,
            orderCount: product.orderCount || 0,
        }));
    }


    const handleUserRow = (record: { id: string }) => ({
        onClick: () => {
          navigate(`/admin/dashboard/${record.id}`);
        },
    })

    const handleProductRow = (record: { id: string}) => ({
        onClick: () => {
            navigate(`/admin/dashboard/pro/${record.id}`);
        }
    })


    return(

        <>
            <Header />

            <FlexContainer  gap="1.5rem" justifyContentCenter>

                <Flex flexDirection="column" gap="0.5rem" style={{ minWidth: "660px;"}}>

                    <Label style={{ marginLeft: "30px", fontSize: "25px"}}>Users Data</Label>
                    <Table onRow={(handleUserRow)} scroll={{ x: true}} loading={!isSuccess} columns={columns} dataSource={ isSuccess ? getModifiedUserData(data.data) : []} />
                    
                </Flex>

                <Flex flexDirection="column" gap="0.5rem" style={{ minWidth: "660px;"}}>

                    <Label style={{ marginLeft: "30px", fontSize: "25px"}}>Products Data</Label>
                    <Table onRow={(handleProductRow)} scroll={{ x: true}} loading={!isSuccess} columns={ProductColumns} dataSource={ isProduct ? getModifiedProductData(productData.data) : []} />
                    
                </Flex>
                
                

            </FlexContainer>

            
        </>
        
        
        
        
    );
}