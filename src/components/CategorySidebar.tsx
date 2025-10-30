import { Flex, Text, Heading, ScrollArea, Checkbox } from "@radix-ui/themes";
import type { Genre } from "../types/movie";

interface CategorySidebarProps {
    genres: Genre[];
    totalMovies: number;
    selectedGenres: string[];
    onGenresChange: (genres: string[]) => void;
}

export function CategorySidebar({
    genres,
    totalMovies,
    selectedGenres,
    onGenresChange,
}: CategorySidebarProps) {
    // Capitalize first letter of each word in genre name
    const formatGenreName = (genre: string) => {
        return genre
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const handleGenreToggle = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            // Remove genre from selection
            onGenresChange(selectedGenres.filter((g) => g !== genre));
        } else {
            // Add genre to selection
            onGenresChange([...selectedGenres, genre]);
        }
    };

    const handleClearAll = () => {
        onGenresChange([]);
    };

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
            <Flex
                direction="column"
                gap="4"
                style={{ flexShrink: 0, margin: "var(--space-4)" }}
            >
                {/* Header */}
                <Flex justify="between" align="center">
                    <Heading size="4">Genres</Heading>
                    {selectedGenres.length > 0 && (
                        <Text
                            size="2"
                            color="blue"
                            style={{ cursor: "pointer" }}
                            onClick={handleClearAll}
                        >
                            Clear all
                        </Text>
                    )}
                </Flex>

                {/* Selected count info */}
                <Flex
                    direction="column"
                    gap="1"
                    style={{
                        backgroundColor: "var(--accent-3)",
                        borderRadius: "var(--radius-2)",
                        border: "1px solid var(--accent-6)",
                        padding: "var(--space-3)",
                    }}
                >
                    <Text size="2" weight="bold" color="gray">
                        {selectedGenres.length === 0
                            ? "All Movies"
                            : `${selectedGenres.length} Genre${
                                  selectedGenres.length > 1 ? "s" : ""
                              } Selected`}
                    </Text>
                    <Text size="1" color="gray">
                        {selectedGenres.length === 0
                            ? `${totalMovies.toLocaleString()} total movies`
                            : `Showing movies with ${
                                  selectedGenres.length > 1 ? "all" : "this"
                              } genre${selectedGenres.length > 1 ? "s" : ""}`}
                    </Text>
                </Flex>
            </Flex>

            {/* Scrollable genre checklist */}
            <ScrollArea
                style={{
                    flex: "1", // Take remaining space
                }}
            >
                <Flex
                    direction="column"
                    gap="1"
                    style={{
                        margin: "0 var(--space-4) var(--space-4) var(--space-4)",
                    }}
                >
                    {genres.map((genreItem) => {
                        const isSelected = selectedGenres.includes(
                            genreItem.genre
                        );

                        return (
                            <Flex
                                key={genreItem.genre}
                                align="center"
                                gap="3"
                                onClick={() =>
                                    handleGenreToggle(genreItem.genre)
                                }
                                style={{
                                    padding: "var(--space-3)",
                                    borderRadius: "var(--radius-2)",
                                    cursor: "pointer",
                                    backgroundColor: isSelected
                                        ? "var(--accent-4)"
                                        : "transparent",
                                    border: isSelected
                                        ? "1px solid var(--accent-7)"
                                        : "1px solid transparent",
                                    transition: "all 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor =
                                            "var(--gray-4)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isSelected) {
                                        e.currentTarget.style.backgroundColor =
                                            "transparent";
                                    }
                                }}
                            >
                                <Checkbox
                                    checked={isSelected}
                                    onCheckedChange={() =>
                                        handleGenreToggle(genreItem.genre)
                                    }
                                    style={{
                                        cursor: "pointer",
                                        flexShrink: 0,
                                    }}
                                />
                                <Flex
                                    justify="between"
                                    align="center"
                                    style={{ flex: 1, minWidth: 0 }}
                                >
                                    <Text
                                        size="2"
                                        weight={isSelected ? "bold" : "medium"}
                                        style={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {formatGenreName(genreItem.genre)}
                                    </Text>
                                    <Text
                                        size="1"
                                        color="gray"
                                        style={{
                                            flexShrink: 0,
                                            marginLeft: "var(--space-2)",
                                        }}
                                    >
                                        {genreItem.count.toLocaleString()}
                                    </Text>
                                </Flex>
                            </Flex>
                        );
                    })}
                </Flex>
            </ScrollArea>
        </Flex>
    );
}
