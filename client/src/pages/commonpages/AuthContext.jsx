// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { utilityFunctions } from "../../utils/module";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for authentication token in local storage or cookies
    const getToken = () => {
     
    let token = utilityFunctions.getCookieValue("userAuthToken");
    
      return token;
    };
    
    setIsAuthenticated(!!getToken());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);
