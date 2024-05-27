import { createContext, useEffect, useState } from "react";
import { getUser, logOut, loginUser, registerNewUser } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";

let AuthContext = createContext()

export function AuthContextProvider({ children }) {
    let [loading, setLoding] = useState(true)
    let [user, setUser] = useState(false);
    let navigate = useNavigate()

    useEffect(() => {
        getuser();
    }, [])

    async function getuser() {
        let res = await getUser();
        setUser(res);
        setLoding(false)
    }

    async function handleLogin(e, credentials) {
        e.preventDefault();
        let response = await loginUser(credentials.email, credentials.password);
        setUser(response)
        navigate("/")
    }

    async function logOutUser() {
        let res = await logOut();
        setUser(null);
    }

    async function handleUserRegister(e, credentials) {
        e.preventDefault();
        if (credentials.password1 !== credentials.password2) {
            alert("Passwords did not match!");
            return;
        }

        try {
            let response = await registerNewUser(credentials)
            setUser(response)
            navigate("/")
        } catch (error) {
            console.error(error);
        }

    }

    let contextData = {
        user,
        handleLogin,
        logOutUser,
        handleUserRegister
    }

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? <h2>Loading ....</h2> : children}
        </AuthContext.Provider>
    )
}

export default AuthContext;