import { Flex, Box, Heading, Text, Card } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import {
    MagnifyingGlassIcon,
    BookmarkIcon,
    CheckCircledIcon,
    RocketIcon,
} from "@radix-ui/react-icons";

export function DashboardPage() {
    const navigate = useNavigate();

    const dashboardItems = [
        {
            id: "movies",
            title: "Browse Movies",
            description: "Explore our vast collection of movies",
            icon: <MagnifyingGlassIcon width="32" height="32" />,
            path: "/movies",
            color: "var(--violet-9)",
        },
        {
            id: "recommendations",
            title: "Personalized Recommendations",
            description: "Discover movies tailored to your taste",
            icon: <RocketIcon width="32" height="32" />,
            path: "/recommendations",
            color: "var(--orange-9)",
        },
        {
            id: "watchlist",
            title: "My Watchlist",
            description: "Movies you want to watch later",
            icon: <BookmarkIcon width="32" height="32" />,
            path: "/watchlist",
            color: "var(--blue-9)",
        },
        {
            id: "watched",
            title: "Watched Films",
            description: "Movies you've already seen",
            icon: <CheckCircledIcon width="32" height="32" />,
            path: "/watched",
            color: "var(--green-9)",
        },
    ];

    return (
        <Flex
            direction="column"
            style={{
                minHeight: "calc(100vh - 60px)",
                backgroundColor: "var(--gray-2)",
            }}
        >
            {/* Main Content */}
            <Flex
                direction="column"
                align="center"
                style={{ padding: "var(--space-8)", flex: 1 }}
            >
                <Box style={{ maxWidth: "1200px", width: "100%" }}>
                    <Heading size="8" mb="2" align="center">
                        Your Dashboard
                    </Heading>
                    <Text
                        size="4"
                        color="gray"
                        align="center"
                        mb="8"
                        style={{ display: "block" }}
                    >
                        Choose where you'd like to go
                    </Text>

                    {/* Dashboard Cards */}
                    <Flex gap="6" wrap="wrap" justify="center">
                        {dashboardItems.map((item) => (
                            <Card
                                key={item.id}
                                style={{
                                    width: "340px",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    position: "relative",
                                }}
                                onClick={() => {
                                    navigate(item.path);
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-4px)";
                                    e.currentTarget.style.boxShadow =
                                        "var(--shadow-5)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                    e.currentTarget.style.boxShadow =
                                        "var(--shadow-3)";
                                }}
                            >
                                <Flex
                                    direction="column"
                                    gap="4"
                                    style={{ padding: "var(--space-5)" }}
                                >
                                    {/* Icon */}
                                    <Flex
                                        align="center"
                                        justify="center"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "var(--radius-3)",
                                            backgroundColor: item.color,
                                            color: "white",
                                        }}
                                    >
                                        {item.icon}
                                    </Flex>

                                    {/* Content */}
                                    <Flex direction="column" gap="2">
                                        <Heading size="5">{item.title}</Heading>
                                        <Text size="2" color="gray">
                                            {item.description}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Card>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    );
}
