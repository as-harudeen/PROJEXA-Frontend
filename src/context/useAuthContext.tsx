import { createContext, useContext, useState } from "react";

interface AuthContextInterface {
    isOTPFormViewble: boolean;
    setIsOTPFormViewble: (state: boolean) => void;
}

interface AuthContextProvider {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}: AuthContextProvider) => {
    const [isOTPFormViewble, setIsOTPFormViewble] = useState(false);
    return (
        <AuthContext.Provider
        value={{isOTPFormViewble, setIsOTPFormViewble}}>
            {children}
        </AuthContext.Provider>
    );
}