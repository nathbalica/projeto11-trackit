import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }){
    const persiste = JSON.parse(localStorage.getItem("userAuth"));
    const [userAuth, setUserAuth] = useState(persiste);
    
    const login = (userData) => {
      setUserAuth(userData);
      localStorage.setItem("userAuth", JSON.stringify(userData)); 
    }

    const logout = () => {
      setUserAuth(null);
      localStorage.removeItem("userAuth");
    };

    return (
      <AuthContext.Provider value={{userAuth, login, logout}}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;
