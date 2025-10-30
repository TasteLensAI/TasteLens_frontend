import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import type { ReactNode } from "react";
import { useApi } from "./ApiContext";

// Types
interface User {
    id: string;
    username: string;
    email: string;
    displayName?: string;
}

interface AuthContextType {
    // State
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    login: (
        username: string,
        password: string
    ) => Promise<{ success: boolean; message?: string }>;
    register: (
        userData: RegisterData
    ) => Promise<{ success: boolean; message?: string }>;
    logout: () => void;
    refreshToken: () => Promise<boolean>;
}

interface RegisterData {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    bio?: string;
}

interface LoginResponse {
    token: string;
    refresh_token?: string;
    user: User;
    expires_in?: number;
}

// Token storage utilities
const TOKEN_KEY = "tastelens_token";
const REFRESH_TOKEN_KEY = "tastelens_refresh_token";
const USER_KEY = "tastelens_user";

const tokenStorage = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    removeToken: () => localStorage.removeItem(TOKEN_KEY),

    getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
    setRefreshToken: (token: string) =>
        localStorage.setItem(REFRESH_TOKEN_KEY, token),
    removeRefreshToken: () => localStorage.removeItem(REFRESH_TOKEN_KEY),

    getUser: (): User | null => {
        const userData = localStorage.getItem(USER_KEY);
        return userData ? JSON.parse(userData) : null;
    },
    setUser: (user: User) =>
        localStorage.setItem(USER_KEY, JSON.stringify(user)),
    removeUser: () => localStorage.removeItem(USER_KEY),

    clearAll: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },
};

// JWT utility functions
const jwtUtils = {
    decode: (token: string) => {
        try {
            const payload = token.split(".")[1];
            const decoded = JSON.parse(atob(payload));
            return decoded;
        } catch {
            return null;
        }
    },

    isExpired: (token: string): boolean => {
        const decoded = jwtUtils.decode(token);
        if (!decoded?.exp) return true;

        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
    },

    getTimeUntilExpiry: (token: string): number => {
        const decoded = jwtUtils.decode(token);
        if (!decoded?.exp) return 0;

        const currentTime = Date.now() / 1000;
        return Math.max(0, decoded.exp - currentTime);
    },
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider props
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { getEndpoint } = useApi();

    // Initialize auth state from storage
    useEffect(() => {
        const initAuth = () => {
            const storedToken = tokenStorage.getToken();
            const storedUser = tokenStorage.getUser();

            if (storedToken && storedUser && !jwtUtils.isExpired(storedToken)) {
                setToken(storedToken);
                setUser(storedUser);
            } else {
                // Token expired or invalid, clear storage
                tokenStorage.clearAll();
            }

            setIsLoading(false);
        };

        initAuth();
    }, []);

    // Auto refresh token before expiry
    useEffect(() => {
        if (!token) return;

        const timeUntilExpiry = jwtUtils.getTimeUntilExpiry(token);

        // Refresh token 5 minutes before expiry
        const refreshTime = Math.max(0, (timeUntilExpiry - 300) * 1000);

        const refreshTimeout = setTimeout(() => {
            refreshToken();
        }, refreshTime);

        return () => clearTimeout(refreshTimeout);
    }, [token]);

    const refreshToken = useCallback(async (): Promise<boolean> => {
        const refreshTokenValue = tokenStorage.getRefreshToken();

        if (!refreshTokenValue) {
            // No refresh token available, but don't logout - let token naturally expire
            return false;
        }

        try {
            const response = await fetch(getEndpoint("/auth/refresh"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh_token: refreshTokenValue }),
            });

            if (response.ok) {
                const data: LoginResponse = await response.json();

                // Update tokens and user
                setToken(data.token);
                setUser(data.user);

                tokenStorage.setToken(data.token);
                tokenStorage.setUser(data.user);

                if (data.refresh_token) {
                    tokenStorage.setRefreshToken(data.refresh_token);
                }

                return true;
            } else {
                // Refresh failed, logout user
                logout();
                return false;
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
            logout();
            return false;
        }
    }, [getEndpoint]);

    const login = async (
        username: string,
        password: string
    ): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await fetch(getEndpoint("/login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data: LoginResponse = await response.json();

                // Store tokens and user
                setToken(data.token);
                setUser(data.user);

                tokenStorage.setToken(data.token);
                tokenStorage.setUser(data.user);

                if (data.refresh_token) {
                    tokenStorage.setRefreshToken(data.refresh_token);
                }

                return { success: true };
            } else {
                const error = await response.json();
                return {
                    success: false,
                    message: error.message || "Login failed",
                };
            }
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                message: "Network error. Please try again.",
            };
        }
    };

    const register = async (
        userData: RegisterData
    ): Promise<{ success: boolean; message?: string }> => {
        try {
            const response = await fetch(getEndpoint("/register"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const data = await response.json();

                // If registration returns a token, log the user in automatically
                if (data.token && data.user) {
                    setToken(data.token);
                    setUser(data.user);

                    tokenStorage.setToken(data.token);
                    tokenStorage.setUser(data.user);

                    if (data.refresh_token) {
                        tokenStorage.setRefreshToken(data.refresh_token);
                    }
                }

                return {
                    success: true,
                    message: data.message || "Registration successful!",
                };
            } else {
                const error = await response.json();
                return {
                    success: false,
                    message: error.message || "Registration failed",
                };
            }
        } catch (error) {
            console.error("Registration error:", error);
            return {
                success: false,
                message: "Network error. Please try again.",
            };
        }
    };

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        tokenStorage.clearAll();
    }, []);

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        refreshToken,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

export { AuthContext };
