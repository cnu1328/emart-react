import { Flex } from "../../ui-library/flex";
import { InputField } from "../../ui-library/input";
import { Dispatch, SetStateAction } from "react";

type EmailSignUPProps = {
    setUsername: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    error: string;
    setError: Dispatch<SetStateAction<string>>;
}

export const EmailSignUp = ({setUsername, setPassword, error, setError} : EmailSignUPProps) => {
    
    
    return (
        <Flex gap="0.5rem" flexDirection="column" alignItemsCenter justifyContentCenter>
            <InputField label="Enter Email" placeholder="example@gmail.com" style={{ width: "400px" }} 
                onChange={(e) => { setUsername(e.target.value); setError!("")}}
                isError={(error || "" ).length > 0}
                errorMessage={error}
            />
            <InputField label="Enter Password" type="password" style={{ width: "400px" }} 
                onChange={(e) => setPassword(e.target.value)}
            />
        </Flex>
    );
}


export const EmailSignIn = ({setUsername, setPassword, error} : EmailSignUPProps) => {
    return (
        <Flex gap="0.5rem" flexDirection="column" alignItemsCenter justifyContentCenter>
            <InputField label="Enter Email" placeholder="example@gmail.com" style={{ width: "400px" }} 
                onChange={(e) => setUsername(e.target.value)}
                isError={(error || "" ).length > 0}
                errorMessage={error}
            />
            <InputField label="Enter Password" type="password" style={{ width: "400px" }} 
                onChange={(e) => setPassword(e.target.value)}
            />
        </Flex>
    );
}