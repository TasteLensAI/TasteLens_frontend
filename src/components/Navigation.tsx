import { Box, Flex, Text } from "@radix-ui/themes";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
    currentPage: string;
}

export function Navigation({ currentPage }: NavigationProps) {
    const navigate = useNavigate();

    const navItems = [
        {
            id: "home",
            label: "Home",
            description: "About TasteLens",
            path: "/",
        },
        {
            id: "movies",
            label: "Movies",
            description: "Browse movie collection",
            path: "/movies",
        },
        // Add more navigation items here later
    ];

    return (
        <Box
            style={{
                borderBottom: "1px solid var(--gray-6)",
                backgroundColor: "var(--color-surface)",
            }}
        >
            <Box p="4">
                <Flex justify="between" align="center">
                    {/* Logo/Brand */}
                    <Text
                        size="6"
                        weight="bold"
                        style={{
                            background:
                                "linear-gradient(135deg, var(--violet-11), var(--pink-11))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        TasteLens
                    </Text>

                    {/* Radix UI Navigation Menu */}
                    <NavigationMenu.Root
                        style={{ position: "relative", zIndex: 1 }}
                    >
                        <NavigationMenu.List
                            style={{
                                display: "flex",
                                gap: "var(--space-2)",
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            {navItems.map((item) => (
                                <NavigationMenu.Item key={item.id}>
                                    <NavigationMenu.Trigger
                                        onClick={() => navigate(item.path)}
                                        style={{
                                            padding:
                                                "var(--space-2) var(--space-3)",
                                            borderRadius: "var(--radius-2)",
                                            border: "none",
                                            background:
                                                currentPage === item.id
                                                    ? "var(--accent-9)"
                                                    : "var(--gray-3)",
                                            color:
                                                currentPage === item.id
                                                    ? "var(--accent-contrast)"
                                                    : "var(--gray-11)",
                                            cursor: "pointer",
                                            fontSize: "var(--font-size-2)",
                                            fontWeight:
                                                "var(--font-weight-medium)",
                                            transition: "all 0.2s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            if (currentPage !== item.id) {
                                                e.currentTarget.style.background =
                                                    "var(--gray-4)";
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (currentPage !== item.id) {
                                                e.currentTarget.style.background =
                                                    "var(--gray-3)";
                                            }
                                        }}
                                    >
                                        {item.label}
                                    </NavigationMenu.Trigger>
                                </NavigationMenu.Item>
                            ))}
                        </NavigationMenu.List>

                        <NavigationMenu.Viewport
                            style={{
                                position: "absolute",
                                transformOrigin: "top center",
                                marginTop: "var(--space-1)",
                                width: "100%",
                                backgroundColor: "var(--color-panel-solid)",
                                borderRadius: "var(--radius-2)",
                                overflow: "hidden",
                                boxShadow: "var(--shadow-4)",
                                height: "var(--radix-navigation-menu-viewport-height)",
                                transition: "width, height, 300ms ease",
                            }}
                        />
                    </NavigationMenu.Root>
                </Flex>
            </Box>
        </Box>
    );
}
