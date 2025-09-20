import { Box, Flex, Text, Heading, Card } from "@radix-ui/themes";

export function HomePage() {
    return (
        <Box p="6">
            <Flex
                direction="column"
                align="center"
                gap="8"
                style={{ maxWidth: "800px", margin: "0 auto" }}
            >
                {/* Hero Section */}
                <Flex
                    direction="column"
                    align="center"
                    gap="4"
                    style={{ textAlign: "center" }}
                >
                    <Heading
                        size="9"
                        style={{
                            background:
                                "linear-gradient(135deg, var(--violet-11), var(--pink-11))",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Welcome to TasteLens
                    </Heading>

                    <Text
                        size="5"
                        color="gray"
                        style={{ maxWidth: "600px", lineHeight: "1.6" }}
                    >
                        Your AI-powered movie recommendation companion. Discover
                        personalized film suggestions based on your unique taste
                        preferences and viewing history.
                    </Text>
                </Flex>

                {/* Feature Cards */}
                <Flex direction="column" gap="4" style={{ width: "100%" }}>
                    <Card style={{ padding: "var(--space-5)" }}>
                        <Flex direction="column" gap="3">
                            <Heading
                                size="5"
                                style={{ color: "var(--violet-11)" }}
                            >
                                🎬 Smart Recommendations
                            </Heading>
                            <Text color="gray" style={{ lineHeight: "1.6" }}>
                                Our advanced AI analyzes your viewing patterns,
                                genre preferences, and ratings to suggest movies
                                you'll love. The more you use TasteLens, the
                                better it gets at understanding your taste.
                            </Text>
                        </Flex>
                    </Card>

                    <Card style={{ padding: "var(--space-5)" }}>
                        <Flex direction="column" gap="3">
                            <Heading
                                size="5"
                                style={{ color: "var(--pink-11)" }}
                            >
                                📚 Curated Collections
                            </Heading>
                            <Text color="gray" style={{ lineHeight: "1.6" }}>
                                Browse through carefully curated movie
                                collections including trending films, hidden
                                gems, award winners, and genre-specific
                                selections. Each collection is updated regularly
                                with fresh recommendations.
                            </Text>
                        </Flex>
                    </Card>

                    <Card style={{ padding: "var(--space-5)" }}>
                        <Flex direction="column" gap="3">
                            <Heading
                                size="5"
                                style={{ color: "var(--blue-11)" }}
                            >
                                🎯 Personalized Experience
                            </Heading>
                            <Text color="gray" style={{ lineHeight: "1.6" }}>
                                Create your profile, rate movies you've watched,
                                and build your watchlist. TasteLens learns from
                                your feedback to provide increasingly accurate
                                recommendations tailored just for you.
                            </Text>
                        </Flex>
                    </Card>
                </Flex>

                {/* Getting Started */}
                <Card
                    style={{
                        padding: "var(--space-5)",
                        backgroundColor: "var(--accent-2)",
                        width: "100%",
                    }}
                >
                    <Flex
                        direction="column"
                        align="center"
                        gap="3"
                        style={{ textAlign: "center" }}
                    >
                        <Heading size="6" style={{ color: "var(--accent-11)" }}>
                            Ready to Discover Your Next Favorite Movie?
                        </Heading>
                        <Text color="gray" style={{ lineHeight: "1.6" }}>
                            Start exploring our movie collections and let
                            TasteLens guide you to cinematic experiences
                            perfectly matched to your taste.
                        </Text>
                        <Text
                            size="2"
                            color="gray"
                            style={{ marginTop: "var(--space-2)" }}
                        >
                            Navigate to the Movies section above to begin your
                            journey!
                        </Text>
                    </Flex>
                </Card>
            </Flex>
        </Box>
    );
}
