/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { emailIcon, googleIcon } from "../../assets/icons";

type SignInBoxType = {
  message?: string;
  typeOfLogin?: string;
};

const SIGNIN_OPTIONS = [
  {
    id: 1,
    title: "with Google",
    handler: "Google",
    image: googleIcon,
  },
  {
    id: 2,
    title: "with email",
    handler: "mail",
    image: emailIcon,
  },
];

function SignInBox({message, typeOfLogin}: SignInBoxType) {
    
    // Google Authentication

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

    /* 
        http://localhost:5000/oauth?code=4%2F0AeaYSHBGiyqekvGwmC-
        AQgX5ruFHyn18jHcVOsRyIFXfS8ydtipeFx3Oyutyf8YJh50x7w&
        scope=email+profile+openid+https%3A%2F%2F
        www.googleapis.com%2Fauth%2Fuserinfo.profile+
        https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&
        authuser=0&prompt=consent
    */

    function handleEmailLogin() {}
    
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

            

            {SIGNIN_OPTIONS.map((item) => {
                return (
                    <ButtonLoginWith
                        image={item.image}
                        key={item.id}
                        onClick={
                            item.handler === "Google" ? handleGoogleAuth : handleEmailLogin
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

