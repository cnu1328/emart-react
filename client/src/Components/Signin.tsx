/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import SignInBox from "./SiginIn/SignInBox";
import { useAppContext } from "../App";
import { useEffect } from "react";

const MESSAGE_MAP = new Map([
    ["signin", { message: "Welcome Back", typeOfLogin: "Sign In"}],
    ["signup", { message: "Join RGUKT E-MART", typeOfLogin: "Sign Up"}],
]);

function Signin() {

    const { hideNavbar }  = useAppContext();

    useEffect(() => {
        hideNavbar(true);
        return () => {
            hideNavbar(false);
        };
    }, []);

    const { tab } = useParams();
    console.log(tab)
    return(
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <SignInBox
                message={MESSAGE_MAP.get(tab!)?.message}
                typeOfLogin={MESSAGE_MAP.get(tab!)?.typeOfLogin}        
            />

           
        </div>
    );
}

export default Signin