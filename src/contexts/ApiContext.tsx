import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";

// Define the context type
interface ApiContextType {
    baseUrl: string;
    getEndpoint: (path: string) => string;
}

// Create the context
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Props for the provider
interface ApiProviderProps {
    children: ReactNode;
}

// Provider component
export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
    // Get API base URL from environment variables
    const baseUrl =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

    // Helper function to construct full endpoint URLs
    const getEndpoint = (path: string): string => {
        // Ensure path starts with a slash
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        return `${baseUrl}${cleanPath}`;
    };

    const value: ApiContextType = {
        baseUrl,
        getEndpoint,
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

// Custom hook to use the API context
export const useApi = (): ApiContextType => {
    const context = useContext(ApiContext);

    if (context === undefined) {
        throw new Error("useApi must be used within an ApiProvider");
    }

    return context;
};

// Export the context for advanced usage
export { ApiContext };
