import { Box, Flex, Text, Heading, ScrollArea } from "@radix-ui/themes";
import type { MovieCategory } from "../types/movie";

interface CategorySidebarProps {
    categories: MovieCategory[];
    selectedCategory: string | null;
    onCategorySelect: (categoryName: string | null) => void;
}

export function CategorySidebar({
    categories,
    selectedCategory,
    onCategorySelect,
}: CategorySidebarProps) {
    return (
        <Flex
            direction="column"
            style={{
                width: "100%",
                height: "100%", // Will be constrained by parent flex
                borderRight: "1px solid var(--gray-6)",
                backgroundColor: "var(--gray-2)",
            }}
        >
            <Box p="4" style={{ flexShrink: 0 }}>
                {" "}
                {/* Header - don't shrink */}
                <Heading size="4" mb="4">
                    Categories
                </Heading>
                {/* "All Movies" option */}
                <Box
                    onClick={() => onCategorySelect(null)}
                    style={{
                        padding: "var(--space-3)",
                        borderRadius: "var(--radius-2)",
                        cursor: "pointer",
                        backgroundColor:
                            selectedCategory === null
                                ? "var(--accent-9)"
                                : "transparent",
                        color:
                            selectedCategory === null
                                ? "var(--accent-contrast)"
                                : "var(--gray-11)",
                        marginBottom: "var(--space-2)",
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        if (selectedCategory !== null) {
                            e.currentTarget.style.backgroundColor =
                                "var(--gray-4)";
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (selectedCategory !== null) {
                            e.currentTarget.style.backgroundColor =
                                "transparent";
                        }
                    }}
                >
                    <Flex align="center" gap="2">
                        <Text size="2" weight="medium">
                            🎬 All Movies
                        </Text>
                    </Flex>
                </Box>
                <ScrollArea
                    style={{
                        flex: "1", // Take remaining space
                        paddingRight: "var(--space-2)",
                    }}
                >
                    <Flex direction="column" gap="1">
                        {categories.map((category) => (
                            <Box
                                key={category.name}
                                onClick={() => onCategorySelect(category.name)}
                                style={{
                                    padding: "var(--space-3)",
                                    borderRadius: "var(--radius-2)",
                                    cursor: "pointer",
                                    backgroundColor:
                                        selectedCategory === category.name
                                            ? "var(--accent-9)"
                                            : "transparent",
                                    color:
                                        selectedCategory === category.name
                                            ? "var(--accent-contrast)"
                                            : "var(--gray-11)",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    if (selectedCategory !== category.name) {
                                        e.currentTarget.style.backgroundColor =
                                            "var(--gray-4)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (selectedCategory !== category.name) {
                                        e.currentTarget.style.backgroundColor =
                                            "transparent";
                                    }
                                }}
                            >
                                <Flex align="center" justify="between">
                                    <Text size="2" weight="medium">
                                        {category.name}
                                    </Text>
                                    <Text size="1" color="gray">
                                        {category.movies.length}
                                    </Text>
                                </Flex>
                            </Box>
                        ))}
                    </Flex>
                </ScrollArea>
            </Box>
        </Flex>
    );
}
