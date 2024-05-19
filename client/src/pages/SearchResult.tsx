import { useParams } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { useState, useEffect } from "react";
import { httpRequest } from "../Interceptor/axiosInterceptor";
import { useQuery } from "@tanstack/react-query";
import { url } from "../utils/baseUrl";
import { Box } from "@mui/material";
import ProductCard from "../Components/Product";
import Footer from "../Components/Footer/Footer";
import TopButton from "../Components/TopButton/TopButton";

export default function SearchResults() {
    
    const { query } = useParams();
    console.log(query);
    
    const [product, setProducts] = useState<Array<any>>([]);
    
    const {isSuccess, data } = useQuery({
        queryFn: () => httpRequest.post(`${url}/sell/${query}`, {

        }),
        queryKey: ["search", "get", query],
        enabled: true,
    })

    // useEffect(() => {
    //     search();
    // }, []);

    useEffect(() => {
        if(data) setProducts(data?.data);
        if(isSuccess) {
            setProducts(data.data);
        }
    }, [isSuccess, data]);

    
    


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
                    <span style={{ color: "#7f7f7f" }}>{"Results for "}</span>
                    <span>{query}</span>
                </h1>
                <Box
                    
                >
                    {product.map((item) => {
                        return (
                            <ProductCard 
                                title={item.product.name}
                                image={item.product.images}
                                description={item.product.description}
                                price={item.product.price}
                                productId={item.product._id}
                                key={item.product._id}
                            />
                        );
                    })}
                    
                </Box>

            </Box>
            
            
            <Footer />
            {/* <Greeting theme={this.props.theme} />
            <Skills theme={this.props.theme} />
            <Footer theme={this.props.theme} /> */}
            <TopButton theme={{ body: "#EDF9FE", text: "#001C55" }} />

        </Box>
    );


}