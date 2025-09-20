import { Box, Flex, Heading, Text, ScrollArea } from "@radix-ui/themes";
import { useState } from "react";
import { MovieCategorySection } from "./MovieCategorySection";
import { MovieSearchBar } from "./MovieSearchBar";
import type { MovieCategory } from "../types/movie";

interface MovieContentAreaProps {
    selectedCategory: string | null;
    categories: MovieCategory[];
}

export function MovieContentArea({
    selectedCategory,
    categories,
}: MovieContentAreaProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter categories and movies based on search query
    const getCategoriesToShow = (): MovieCategory[] => {
        let categoriesToFilter: MovieCategory[];

        if (selectedCategory === null) {
            // Show all categories
            categoriesToFilter = categories;
        } else {
            // Show only the selected category
            const category = categories.find(
                (cat) => cat.name === selectedCategory
            );
            categoriesToFilter = category ? [category] : [];
        }

        // If there's a search query, filter movies within categories
        if (searchQuery.trim()) {
            return categoriesToFilter
                .map((category) => ({
                    ...category,
                    movies: category.movies.filter(
                        (movie) =>
                            movie.title
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                            movie.director
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                            movie.genres.some((genre) =>
                                genre
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase())
                            )
                    ),
                }))
                .filter((category) => category.movies.length > 0); // Only show categories with matching movies
        }

        return categoriesToFilter;
    };

    const categoriesToShow = getCategoriesToShow();
    const totalMovies = categoriesToShow.reduce(
        (acc, cat) => acc + cat.movies.length,
        0
    );

    return (
        <Flex
            direction="column"
            style={{
                width: "100%",
                height: "100%", // Will be constrained by parent
                minHeight: "0", // Allow content to scroll
            }}
        >
            <Box p="6" style={{ flexShrink: 0 }}>
                {" "}
                {/* Header - don't shrink */}
                {/* Header */}
                <Box mb="6">
                    <Heading size="6" mb="2">
                        {selectedCategory || "All Movies"}
                    </Heading>
                    <Text size="3" color="gray" mb="4">
                        {!searchQuery ? (
                            <>
                                {totalMovies} movie
                                {totalMovies !== 1 ? "s" : ""} available
                                {selectedCategory === null &&
                                    ` across ${categoriesToShow.length} categories`}
                            </>
                        ) : (
                            `Search results in ${
                                selectedCategory || "all categories"
                            }`
                        )}
                    </Text>
                </Box>
                {/* Search Bar */}
                <MovieSearchBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    resultsCount={searchQuery ? totalMovies : undefined}
                />
            </Box>

            {/* Scrollable Content Area - Takes remaining space */}
            <Box p="5">
                <ScrollArea style={{ flex: "1", minHeight: "0" }}>
                    {categoriesToShow.length > 0 ? (
                        <Flex
                            direction="column"
                            gap="6"
                            style={{
                                padding: "0 var(--space-4) var(--space-6) 0",
                            }}
                        >
                            {categoriesToShow.map((category) => (
                                <MovieCategorySection
                                    key={category.name}
                                    category={category}
                                    minItemsPerPage={2} // Show at least 2 items, but calculate optimal based on width
                                    cardMinWidth={270} // MovieCard width (250px) + gap space
                                />
                            ))}
                        </Flex>
                    ) : (
                        <Box
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "300px",
                                textAlign: "center",
                            }}
                        >
                            <Flex direction="column" gap="3">
                                <Text size="6" color="gray">
                                    {searchQuery ? "🔍" : "🎬"}
                                </Text>
                                <Text size="4" weight="medium" color="gray">
                                    {searchQuery
                                        ? "No search results"
                                        : "No movies found"}
                                </Text>
                                <Text size="2" color="gray">
                                    {searchQuery
                                        ? `Try searching for a different movie title, director, or genre.`
                                        : "This category doesn't have any movies yet."}
                                </Text>
                                {searchQuery && (
                                    <Text
                                        size="2"
                                        color="blue"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setSearchQuery("")}
                                    >
                                        Clear search to see all movies
                                    </Text>
                                )}
                            </Flex>
                        </Box>
                    )}
                </ScrollArea>
            </Box>
        </Flex>
    );
}
