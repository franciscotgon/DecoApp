"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { User, AuthState, UserResponse } from "@/data-layer/types/Auth";

interface AuthContextType extends AuthState {
  login: (token: string, user: UserResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const normalizeUser = (userData: UserResponse): User => {
  return {
    id: userData.id || userData.Id || "",
    email: userData.email || userData.Email || "",
    firstName: userData.firstName || userData.FirstName || "",
    lastName: userData.lastName || userData.LastName || "",
    role: userData.role || userData.Role || "Customer",
  };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  });

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedToken = localStorage.getItem("auth_token");
        const savedUser = localStorage.getItem("auth_user");

        if (savedToken && savedUser) {
          const userObj: UserResponse = JSON.parse(savedUser);
          setState({
            token: savedToken,
            user: normalizeUser(userObj),
            isAuthenticated: true,
            loading: false,
          });
        } else {
          setState((prev) => ({ ...prev, loading: false }));
        }
      } catch (error) {
        console.error("Error al recuperar la sesión:", error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback((token: string, userData: UserResponse) => {
    const user = normalizeUser(userData);

    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(user));

    setState({
      token,
      user,
      isAuthenticated: true,
      loading: false,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setState({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
