import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Box, Flex, Text } from "@radix-ui/themes";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading } = useAuth();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <Flex
                align="center"
                justify="center"
                style={{ minHeight: "100vh" }}
            >
                <Box style={{ textAlign: "center" }}>
                    <Text size="4" color="gray">
                        Loading...
                    </Text>
                </Box>
            </Flex>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Render protected content
    return <>{children}</>;
}
