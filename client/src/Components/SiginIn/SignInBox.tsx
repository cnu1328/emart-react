/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, } from "react-router-dom";
import { emailIcon, googleIcon } from "../../assets/icons";
import { useModalView } from "../../ui-library/modal/useModal";
import { EmailSignIn, EmailSignUp } from "./EmailSignUP";
import { useState } from "react";
import { httpRequest } from "../../Interceptor/axiosInterceptor";
import { url } from "../../utils/baseUrl";

type SignInBoxType = {
  message?: string;
  typeOfLogin?: string;
};

const SIGNIN_OPTIONS = [
  {
    id: 1,
    title: "with Google",
    handler: "Google",
    type: "signUp",
    image: googleIcon,
  },
  {
    id: 2,
    title: "with email",
    type: "signUp",
    handler: "mail",
    image: emailIcon,
  },
];

function SignInBox({message, typeOfLogin}: SignInBoxType) {
    
    // Google Authentication

    const location = useLocation();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleGoogleAuth() {

        const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        const options = {
          redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
          client_id: import.meta.env.VITE_CLIENT_ID,
          access_type: "offline",
          response_type: "code",
          prompt: "consent",
          scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
          ].join(" "),
        };
        const qs = new URLSearchParams(options);
        window.location.assign(`${rootUrl}?${qs.toString()}`);
    }

    

    const handleEmailSignUp = async () => {
        console.log("Email Charged", username, password);
        
        try {
            const response = await httpRequest.post(`${url}/oauth/register`, {
                username, password
            });

            console.log('Success:', response.data);


            if(response.data.status === 201) {
                updateModalView(false);
                updateModalViewSignIn(true);
            }
            
        }

        catch(e) {
            
            console.error('There was a problem with your fetch operation:', e);
            setError("User already Exit");

        }
        

    }

    const handleEmailLogin = async () => {

        console.log("Email Charged", username, password);
        
        try {
            const response = await httpRequest.post(`${url}/oauth/login`, {
                username, password
            });

            const { access_token_server, refresh_token_server } = response.data;

            

            if(response.data.status === 200) {
            
                updateModalViewSignIn(false);
                localStorage.setItem('access_token', access_token_server);
                localStorage.setItem('refresh_token', refresh_token_server);
                window.location.href = '/';
            }
            
        }

        catch(e) {
            
            console.error('There was a problem with your fetch operation:', e);
            setError("Please Check Credentials or Please signUp first");

        }
        

    }

    const [modal, updateModalView] = useModalView(<EmailSignUp setUsername={setUsername} setPassword={setPassword} error={error} setError={setError} />, handleEmailSignUp, 513, "Sign Up", "SinUp");
    const [signInModal, updateModalViewSignIn] = useModalView(<EmailSignIn setUsername={setUsername} setPassword={setPassword} error={error} setError={setError} />, handleEmailLogin, 513, "Login", "LogIn");
    
    return(
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
            <p
                style={{
                    fontFamily: "Roboto Slab",
                    fontSize: "28px",
                    marginBottom: "30px",
                }}
            >
                {message}
            </p>

            {modal}
            {signInModal}

            {SIGNIN_OPTIONS.map((item) => {
                return (
                    <ButtonLoginWith
                        image={item.image}
                        key={item.id}
                        onClick={
                            item.handler === "Google" ? handleGoogleAuth : (location.pathname !== '/auth/signin' ? (() => updateModalView(true)) : (() => updateModalViewSignIn(true)))
                        }
                        text={typeOfLogin + " " + item.title}
                    />
                );
            })}

            { typeOfLogin === "Sign In" ? (
                <p style={{ marginTop: "22px", color: "#5c5c5c" }}>
                    No account?{" "}
                    <Link
                        style={{
                            color: "#1a8917",
                            textDecoration: "none",
                            fontWeight: "bold",
                            fontSize: "14px",
                        }}
                        to="/auth/signup"
                    >
                        Create one
                    </Link>
              </p>
            ) : (
                <p style={{ marginTop: "22px", color: "#5c5c5c" }}>
                    Already have an account?{" "}
                    <Link
                        style={{
                        color: "#1a8917",
                        textDecoration: "none",
                        fontWeight: "bold",
                        fontSize: "14px",
                        }}
                        to="/auth/signin"
                    >
                        Sign in
                    </Link>
                </p>
            )}
        </div>
    );
}

function ButtonLoginWith({
    image, onClick, text
} : {
    onClick(): void;
    text: string;
    image: any;
}) {
    return(
        <button
            style={{
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: "18px",
                width: "200px",
                border: "1px solid #c9c9c9",
                gap: "12px",
                cursor: "pointer",
                color: "#5c5c5c",
            }}

            onClick={ () => { onClick(); }}
        >
            {image}
            {text}
        </button>
    );
}


export default SignInBox;

