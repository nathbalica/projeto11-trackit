import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }){
    const [userAuth, setUserAuth] = useState('');
    
    const login = (userData) => {
        setUserAuth(userData);
    };

    return (
      <AuthContext.Provider value={{userAuth, login}}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;
