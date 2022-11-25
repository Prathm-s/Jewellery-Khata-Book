import React, { useState,useContext,createContext } from "react";

const TokenContext = React.createContext({})

export const AppProvider = ({ children }) => {
    const [token, setToken] = useState("")

    const initToken = (value)=>{
        setToken(value)
    }

    return (
        <TokenContext.Provider value={{token,setToken}}>
            {children}
        </TokenContext.Provider>
    )

}

export default TokenContext 