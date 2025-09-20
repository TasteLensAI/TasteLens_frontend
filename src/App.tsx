import { Flex, Box } from "@radix-ui/themes";
import { Routes, Route, useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomePage, MoviesPage, NotFoundPage } from "./pages";

export default function App() {
    const location = useLocation();

    // Extract current page from pathname
    const getCurrentPage = () => {
        const path = location.pathname;
        if (path === "/") return "home";
        if (path === "/movies") return "movies";
        return "home";
    };

    return (
        <Flex direction="column" style={{ minHeight: "100vh" }}>
            {/* Navigation Bar */}
            <Navigation currentPage={getCurrentPage()} />

            {/* Page Content */}
            <Box style={{ flex: "1" }}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Box>
        </Flex>
    );
}
