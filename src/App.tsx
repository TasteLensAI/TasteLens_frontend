import { Flex, Box } from "@radix-ui/themes";
import { Routes, Route } from "react-router-dom";
// import { Navigation } from "./components/Navigation";
import {
    HomePage,
    MoviesPage,
    NotFoundPage,
    LoginPage,
    DashboardPage,
    WatchlistPage,
    WatchedPage,
    RecommendationsPage,
} from "./pages";
import { ApiProvider } from "./contexts/ApiContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
    // const location = useLocation();

    // Extract current page from pathname
    // const getCurrentPage = () => {
    //     const path = location.pathname;
    //     if (path === "/") return "home";
    //     if (path === "/movies") return "movies";
    //     if (path === "/login") return "login";
    //     return "home";
    // };

    // Only show navigation on public routes
    // const showNavigation =
    //     location.pathname === "/" || location.pathname === "/login";

    return (
        <ApiProvider>
            <AuthProvider>
                <Flex direction="column" style={{ minHeight: "100vh" }}>
                    {/* Navigation Bar - Only on public routes */}
                    {/* {showNavigation && (
                        <Navigation currentPage={getCurrentPage()} />
                    )} */}

                    {/* Page Content */}
                    <Box style={{ flex: "1" }}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />

                            {/* Protected Routes */}
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute>
                                        <DashboardPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/movies"
                                element={
                                    <ProtectedRoute>
                                        <MoviesPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/watchlist"
                                element={
                                    <ProtectedRoute>
                                        <WatchlistPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/watched"
                                element={
                                    <ProtectedRoute>
                                        <WatchedPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/recommendations"
                                element={
                                    <ProtectedRoute>
                                        <RecommendationsPage />
                                    </ProtectedRoute>
                                }
                            />

                            {/* 404 */}
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </Box>
                </Flex>
            </AuthProvider>
        </ApiProvider>
    );
}
