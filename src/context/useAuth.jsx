import { useState, useContext, createContext, useLayoutEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setLoading] = useState(true);

  //auth provider provides current loggedin user details to throughout the application

  useLayoutEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("auth");
    const role = localStorage.getItem("role");
    if (token && role) {
      setCurrentUser({ token: token, role: role });
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};
