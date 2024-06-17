/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Flex } from "../../ui-library/flex";
import { InputField } from "../../ui-library/input";
import { useAppContext } from "../../App";
import { Button } from "antd";




export const AdminLogin = () =>   {
    
    // Google Authentication

    const { hideNavbar }  = useAppContext();

    useEffect(() => {
        hideNavbar(true);
        return () => {
            hideNavbar(false);
        };
    }, []);

    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        if(username === "srinu@gmail.com" && password === "1234") {
            window.location.href = "/admin/dashboard";
        }

        else {
            setError("Enter Correct Credentials");
        }
    }

    
    return(

        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <div
                style={{
                    width: "650px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    padding: "8vh 0",
                    boxShadow:
                    "rgb(190, 190, 190) 2px 2px 12px, rgb(255, 255, 255) -20px -20px 60px",
                }}
            >
                <Flex gap="0.5rem" flexDirection="column" alignItemsCenter justifyContentCenter>
                    <InputField label="Enter Email" placeholder="example@gmail.com" style={{ width: "400px" }} 
                        onChange={(e) => { setUsername(e.target.value); setError!("")}}
                        isError={(error || "" ).length > 0}
                        errorMessage={error}
                    />
                    <InputField label="Enter Password" type="password" style={{ width: "400px" }} 
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="primary" onClick={handleLogin}>Login</Button>
                </Flex>
            </div>  

            
        </div>
        
    );
}



