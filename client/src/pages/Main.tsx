import { Component } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "../Components/Signin";
import Home from "./Homepage/Home";
import AuthRedirect from "./Homepage/AuthRedirect";
import AddProduct from "./AddProduct/addProduct";
import Test from "./AddProduct/text";
import Authentication from "../router/Authentication";
import SearchResults from "./SearchResult";
import ProductDetail from "../Components/productDetail";
import View from "../Components/View";
import UserDetail from "./userDetail";
import CartList from "../Components/CartList";
import Checkout from "../Components/Payment/Checkout";
import Success from "../Components/Payment/Success";
import Cancel from "../Components/Payment/Cancel";
import ContactUsForm from "../Components/Footer/ContactUsForm";
import ContactUsSection from "../Components/Footer/ContactUsSection";
import AboutSection from "../Components/Footer/AboutSection";
import Developers from "../Components/Footer/Developers";
import { AdminLogin } from "../Components/SiginIn/AdminLogin";
import { AdminDashboard } from "./AdminDashboard";
import { UsersDetail } from "./AdminDashboard/UserDetail";
import { ProductsDetail } from "./AdminDashboard/ProductDetail";
import ProductInfo from "./AdminDashboard/ProductInfo";

export default class Main extends Component {
    render() {
        return(
            <div>
                <Routes>

                    <Route 
                        path="/home?"
                        element={<Home  />}
                    />

                    

                    <Route
                        path="/product/:productId"
                        element={<ProductDetail />}
                    />

                    <Route 
                        path="/sell"
                        element={
                            <Authentication fallback={<Navigate to="/auth/signup" />}>
                                <AddProduct />
                            </Authentication>  
                        }
                    />

                    <Route 
                        path="/view"
                        element={
                            <Authentication fallback={<Navigate to="/auth/signup" />}>
                                <View />
                            </Authentication>
                            
                        }
                    />

                    <Route 
                        path="/payments"
                        element={
                            <Authentication fallback={<Navigate to="/auth/signup" />}>
                                <Checkout />
                            </Authentication>
                            
                        }
                    />

                    <Route 
                        path="/user/:userId/:tab?"
                        element={
                            <Authentication fallback={<Navigate to="/auth/signup" />}>
                                <UserDetail />
                            </Authentication>
                        }
                    />

                    <Route 
                        path="/cartItems"
                        element={
                            <Authentication fallback={<Navigate to="/auth/signup" />}>
                                <CartList />
                            </Authentication>
                            
                        }
                    />

                    <Route 
                        path="/search/:query"
                        element={<SearchResults />}
                    />

                    <Route 
                        path="/success"
                        element={<Success />}
                    />

                    <Route 
                        path="/cancel"
                        element={<Cancel />}
                    />


                    <Route 
                        path="/test"
                        element={<Test />}
                    />

                    <Route 
                        path="/auth/:tab" 
                        element={<Signin  />}
                    />

                    <Route 
                        path="oauth/redirect/"
                        element={<AuthRedirect />}
                    />

                    <Route 
                        path="/admin"
                        element={<AdminLogin />}
                    />

                    <Route 
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route 
                        path="/admin/dashboard/:userId"
                        element={<UsersDetail />}
                    />

                    <Route 
                        path="/admin/dashboard/product/:productId"
                        element={<ProductInfo />}
                    />




                    <Route 
                        path="/admin/dashboard/pro/:productId"
                        element={<ProductsDetail />}
                    />
                    
                    <Route
                        path = "/contactus"
                        element = {<ContactUsSection />}
                    />
                    <Route
                        path = "/contactusform"
                        element = {<ContactUsForm adminEmail={""} />}
                    />
                    <Route
                        path = "/about"
                        element = {<AboutSection />}
                    />
                    <Route
                        path="/developers"
                        element = {<Developers />}
                    />
                </Routes>
            </div>
        );         
    }
}
