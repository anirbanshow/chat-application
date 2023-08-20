import { useState, createContext, useEffect, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({ token: null });

    useEffect(() => {

        const data = localStorage.getItem("userInfo");

        if (data) {
            const parseData = JSON.parse(data);
            setAuth({ token: parseData.token })
        }

    }, []);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hooks
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }