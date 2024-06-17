import { Link } from "react-router-dom";

type UserCardProps = {
    email: string;
    username : string;
    userId : string;
    bio: string;
    avatar: string;
    edit?: string;
}

export default function UserCard({
    email, username, userId, bio, avatar, edit

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

        <Link to={`/user/${userId}`}
            style={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <img
            style={{
                width: "90px",
                height: "100px",
                borderRadius: "50%",
                margin: "auto",
                border: "1px solid #eee",
            }}
            src={avatar}
            alt="This is an image"
            />
        </Link>

        <Link
            to={`/user/${userId}`}
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
            <h3 style={{ fontWeight: "bold"}}>{username}</h3>
        </Link>


        {email && (
            <p
            style={{
                fontWeight: "bold",
                marginLeft: "8px",
                fontSize: "20px",
                lineHeight: "5px",
                textAlign: "center"
            }}
            >
            {email}
            </p>
        )}
        
        {bio && (
            <p
            style={{
                
                fontWeight: "bold",
                marginLeft: "8px",
                fontSize: "20px",
                lineHeight: "5px",
                textAlign: "center"
            }}
            >
            {bio}
            </p>
        )}

        { edit && edit.length > 0 && (
            <p
                style={{
                    color: "rgba(26, 137, 23, 1)",
                    marginLeft: "8px",
                    marginTop: "5px",
                    fontSize: "13.4px",
                    textAlign: "center",
                    cursor: "pointer",
                }}
            >
                Edit profile
            </p>
        )}
       
        
        
    </div>
    );
}