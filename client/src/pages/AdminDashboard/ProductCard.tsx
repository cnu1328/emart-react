import { Link } from "react-router-dom";
import { Typography, useMediaQuery,  } from "@mui/material";
import { storageUrl } from "../../utils/baseUrl";

type ProductProps = {
    name: string;
    description: string;
    image: string;
    price: number;
    productId: string;
}


export default function ProductCard({
    name, description, image, price, productId
}: ProductProps) {
    
    
    
    const isSmallScreen = useMediaQuery('(max-width:430px)');
    const isBigScreen = useMediaQuery('(min-width: 770px')

    return(
        <Link
            to={`/admin/dashboard/product/${productId}`}

            style={{
                maxWidth: isSmallScreen ? "280px":"100%",
                backgroundColor: "#fafafa",
                borderRadius: "4px",
                border: "2px solid #e2e2e2",
                height: "120px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                overflow: "hidden",
                textDecoration: "none",
                color: "inherit",
                marginLeft: "5px",
            }}
        >
            <div
                style={{
                    width: isSmallScreen ? "80px" : "100px",
                    height: "100px",
                    margin: "0px 20px",
                    flex: 0.3,
                    
                }}
            >
                <img src={`${storageUrl}${image}?alt=media`} alt="Product Image" 
                    style={{ 
                        width: "100%",
                        height: "100%",
                        objectFit: isSmallScreen ? "cover" :"contain",

                    }}
                />
            </div>

            <div className="info" style={{ flex: "0.7"}}>
          
                <Typography
                    style={{
                        fontSize: '1.2rem',
                        padding: '2px 0', 
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',  // Prevent text from wrapping
                        overflow: 'hidden',    // Hide overflowing text
                        textOverflow: 'ellipsis',  // Display ellipsis for overflow
                        maxWidth: isBigScreen ? "100%" : isSmallScreen ? '100px' : '250px',
                    }}
                >
                    {name}
                </Typography>

                <Typography
                    style={{
                        fontSize: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,  // Limit to two lines
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        maxWidth: isBigScreen ? "100%" : isSmallScreen ? '100px' : '250px',
                    }}
                >
                    {description}
                </Typography>
            
            <div 
                style={{
                    marginTop: "2px",
                    display: 'flex',
                    gap: isSmallScreen ? "0px" : "10px",
                    maxWidth: isSmallScreen ? '120px' : '250px',
                }}
            >

                <span 
                    style={{
                        marginLeft: 5,
                        color: 'green',
                        fontWeight: 'bold',
                        fontSize: 'larger',
                    }}  
                >
                Price : 
                </span>
                <span 
                    style={{
                        marginLeft: 5,
                        color: 'green',
                        fontWeight: 'bold',
                        fontSize: 'larger',
                    }}  
                >
                ₹ {price}
                </span>
          </div>
        </div>

        
        </Link>
    );
}