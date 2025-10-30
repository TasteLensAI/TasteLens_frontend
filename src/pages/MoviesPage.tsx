import { Flex, Box, Heading, Text } from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { CategorySidebar } from "../components/CategorySidebar";
import { MoviesGrid } from "../components/MoviesGrid";
import { useApi } from "../contexts/ApiContext";
import type { GenresResponse } from "../types/movie";

export function MoviesPage() {
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [genresData, setGenresData] = useState<GenresResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { getEndpoint } = useApi();

    // Fetch genres on component mount
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(getEndpoint("/genres")); // Adjust the endpoint as needed

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch genres: ${response.statusText}`
                    );
                }

                const data: GenresResponse = await response.json();
                setGenresData(data);
            } catch (err) {
                console.error("Error fetching genres:", err);
                setError(
                    err instanceof Error ? err.message : "Failed to load genres"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchGenres();
    }, [getEndpoint]);

    // Loading state
    if (isLoading) {
        return (
            <Flex
                align="center"
                justify="center"
                style={{ flex: 1, minHeight: "0" }}
            >
                <Box style={{ textAlign: "center" }}>
                    <Heading size="5" mb="2">
                        Loading genres...
                    </Heading>
                    <Text color="gray">Please wait</Text>
                </Box>
            </Flex>
        );
    }

    // Error state
    if (error || !genresData) {
        return (
            <Flex
                align="center"
                justify="center"
                style={{ flex: 1, minHeight: "0" }}
            >
                <Box style={{ textAlign: "center" }}>
                    <Heading size="5" mb="2" color="red">
                        ⚠️ Error Loading Genres
                    </Heading>
                    <Text color="gray">
                        {error || "Unknown error occurred"}
                    </Text>
                </Box>
            </Flex>
        );
    }

    return (
        <Flex
            style={{
                minHeight: "0", // Allow flex item to shrink
                flex: "1", // Take remaining space from App.tsx layout
            }}
        >
            {/* Left Sidebar - Flexible width with constraints */}
            <Flex
                style={{
                    flexBasis: "300px", // Base width
                    flexShrink: 0, // Don't shrink below minWidth
                    flexGrow: 0, // Don't grow
                    minWidth: "280px",
                    maxWidth: "400px",
                    minHeight: "0", // Allow flex children to scroll
                }}
            >
                <CategorySidebar
                    genres={genresData.genres}
                    totalMovies={genresData.total_movies}
                    selectedGenres={selectedGenres}
                    onGenresChange={setSelectedGenres}
                />
            </Flex>

            {/* Right Content Area - Takes remaining space */}
            <Flex
                style={{
                    flex: "1", // Take all remaining space
                    minWidth: "0", // Allow content to shrink and scroll
                    minHeight: "0", // Allow flex children to scroll
                }}
            >
                <MoviesGrid selectedGenres={selectedGenres} />
            </Flex>
        </Flex>
    );
}
