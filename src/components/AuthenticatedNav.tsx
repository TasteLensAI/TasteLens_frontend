import { Flex, Box, Text, Button } from "@radix-ui/themes";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
    HomeIcon,
    MagnifyingGlassIcon,
    BookmarkIcon,
    CheckCircledIcon,
    RocketIcon,
} from "@radix-ui/react-icons";

export function AuthenticatedNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const navItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            path: "/dashboard",
            icon: <HomeIcon width="16" height="16" />,
        },
        {
            id: "movies",
            label: "Browse",
            path: "/movies",
            icon: <MagnifyingGlassIcon width="16" height="16" />,
        },
        {
            id: "recommendations",
            label: "Recommendations",
            path: "/recommendations",
            icon: <RocketIcon width="16" height="16" />,
        },
        {
            id: "watchlist",
            label: "Watchlist",
            path: "/watchlist",
            icon: <BookmarkIcon width="16" height="16" />,
        },
        {
            id: "watched",
            label: "Watched",
            path: "/watched",
            icon: <CheckCircledIcon width="16" height="16" />,
        },
    ];

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <Box
            style={{
                borderBottom: "1px solid var(--gray-6)",
                backgroundColor: "var(--color-surface)",
                position: "sticky",
                top: 0,
                zIndex: 100,
                boxShadow: "var(--shadow-2)",
            }}
        >
            <Flex
                justify="between"
                align="center"
                style={{
                    padding: "var(--space-3) var(--space-6)",
                    maxWidth: "1400px",
                    margin: "0 auto",
                }}
            >
                {/* Logo/Brand */}
                <Text
                    size="5"
                    weight="bold"
                    style={{
                        background:
                            "linear-gradient(135deg, var(--violet-11), var(--pink-11))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/dashboard")}
                >
                    TasteLens
                </Text>

                {/* Navigation Items */}
                <Flex gap="2" align="center">
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            variant={isActive(item.path) ? "solid" : "ghost"}
                            color={isActive(item.path) ? "violet" : "gray"}
                            size="2"
                            style={{
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                            }}
                            onClick={() => navigate(item.path)}
                        >
                            {item.icon}
                            <Text size="2" ml="1">
                                {item.label}
                            </Text>
                        </Button>
                    ))}
                </Flex>

                {/* User Info & Logout */}
                <Flex align="center" gap="4">
                    <Text size="2" color="gray">
                        <strong>{user?.display_name || user?.username}</strong>
                    </Text>
                    <Button
                        variant="soft"
                        color="gray"
                        size="2"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
}
