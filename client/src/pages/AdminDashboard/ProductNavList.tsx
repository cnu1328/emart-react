/* eslint-disable @typescript-eslint/no-explicit-any */
import UserCard from "./UserCard";

type ProductNavList = {
    users: Array<any>;
    userId?: string;
    tab: string;
}

type User = {
    _id: string;
    name: string;
    email: string;
    avatar: string;
};

export default function ProductNavList({
    users, tab
} : ProductNavList) {
 

    return(
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
            {users === undefined|| users.length === 0 ? (
                    <p>No users found in {tab} list to this Product.</p>
                ) : (
                    users.map((user: User) => (
                        <UserCard
                            userId= {user._id}
                            key={user._id}
                            name={user.name}
                            email={user.email}
                            avatar={user.avatar} 
                        />
                    ))
            )}
        
        </div>
    );
}