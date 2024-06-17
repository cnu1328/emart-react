import { Link } from "react-router-dom";
import { storageUrl } from "../../utils/baseUrl";

type UserCardProps = { 
    name : string;
    image: string;
    price: string;
}

export default function Product({
    name, image, price

}: UserCardProps) {

    return(
        <div
            style={{
                width: "90%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "30px",
                justifyContent: "center"
            }}
        >

        <Link
            to={""}
            style={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <img
            style={{
                width: "100px",
                height: "100px",
                borderRadius: "10%",
                margin: "auto",
                objectFit: "contain",   
                border: "1px solid #eee",
            }}
            src={`${storageUrl}${image}?alt=media`}
            alt="This is an image"
            />
        </Link>

        <Link
            to={""}
            style={{
            marginLeft: "8px",
            fontFamily: "Roboto Slab",
            fontSize: "15px",
            color: "inherit",
            textDecoration: "none",
            display: "flex",
                justifyContent: "center"
            }}

            
        >
            <h3 style={{ fontWeight: "bold"}}>{name}</h3>
        </Link>

        <Link
            to={""}
            style={{
                marginLeft: "8px",
                fontFamily: "Roboto Slab",
                fontSize: "15px",
                color: "inherit",
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
                flexDirection: "column"
            }} 
        >
            <h4 style={{ fontWeight: "bold"}}>₹ {price}</h4>
            <p style={{ color: "gray", fontSize: "1.5rem"}}>Product</p>
        </Link> 


        
        
    </div>
    );
}