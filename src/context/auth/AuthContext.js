import { createContext, useCallback, useState } from "react";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("userToken")),
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUserData = useCallback(() => {
    let decodedToken = jwtDecode(localStorage.getItem("userToken"));
    setUser(decodedToken);
  }, []);

  const logout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    <Navigate to="/login" />;
  };

  return (
    <AuthContext.Provider value={{ user, logout, getUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
