import { Link } from "react-router-dom";
import { Typography, useMediaQuery,  } from "@mui/material";
// import { storageUrl } from "../../utils/baseUrl";
// import { StringGradients } from "antd/es/progress/progress";

type UserProps = {
    userId: string;
    name: string;
    email: string;
    avatar: string;
}


export default function UserCard({
    name, email, userId, avatar
}: UserProps) {
    
    
    
    const isSmallScreen = useMediaQuery('(max-width:430px)');
    const isBigScreen = useMediaQuery('(min-width: 770px')

    return(
        <Link
            to={`/admin/dashboard/${userId}`}

            style={{
                width: "100%",
                backgroundColor: "#fafafa",
                borderRadius: "4px",
                border: "2px solid #e2e2e2",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                <img src={avatar} alt="UserImage Image" 
                    style={{ 
                        width: isSmallScreen ? "50px" : "100px",
                        height: isSmallScreen ? "50px" : "100px",
                        marginTop: isSmallScreen ? "30px" : "",
                        borderRadius: "50px",
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
                    {email}
                </Typography>
        </div>

        
        </Link>
    );
}