import { createContext, useContext, useState, useEffect } from "react";
import { getMyProfile } from "../services/auth";

const AuthContext = createContext<any>(null)

export const AuthProvider = ({children}: any) => {
const [user, setUser] = useState<any>(null)

    // component ekaka life cycle eka allganna thiyna ekama hook eka
    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if(token){
            getMyProfile()
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => {
                    // if token expire or 'me api' call failure 
                    setUser(null)
                    console.error(err)
                })
        } 
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}


// useAuth - a custom hook to get userProfile/userDetail
// { user, setUser }
export const useAuth = () => {
    const context = useContext(AuthContext)
    
    if(!context) {
        throw new Error("Oooppss.. useAuth must be used within an AuthProvider..!")
    }

    return context
}