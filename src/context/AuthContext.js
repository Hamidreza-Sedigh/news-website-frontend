import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // برای init context
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/proxy/user/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!res.ok) throw new Error("Invalid token");

        const data = await res.json();
        setToken(storedToken);
        setUser(data.user || data); // بسته به اینکه بک چه چیزی برمی‌گرداند
        setRole(data.user?.role || data?.role || null);
      } catch (err) {
        console.error("Token invalid:", err);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (newToken, role, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);

    if (role) {
      localStorage.setItem("userRole", role);
      setRole(role);
    }

    setUser(userData || null);
  };

  const logout = () => {
    setIsLoggingOut(true);

    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setToken(null);
    setRole(null);
    setUser(null);

    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        role,
        isAuthenticated: !!user,
        loading,
        isLoggingOut,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
