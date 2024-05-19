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
                        path="/user/:userId"
                        element={
                            <Authentication fallback={<Navigate to="/auth/signup" />}>
                                <AddProduct />
                            </Authentication>
                            
                        }
                    />

                    <Route 
                        path="/user/:userId/cartItems"
                        element={
                            <Authentication fallback={<Navigate to="/auth/signup" />}>
                                <AddProduct />
                            </Authentication>
                            
                        }
                    />

                    <Route 
                        path="/search/:query"
                        element={<SearchResults />}
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

                    
                </Routes>
            </div>
        );         
    }

}
