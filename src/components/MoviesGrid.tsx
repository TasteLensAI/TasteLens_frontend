import {
    Flex,
    Heading,
    Text,
    ScrollArea,
    Button,
    TextField,
} from "@radix-ui/themes";
import { useState, useEffect, useCallback } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { MovieCard } from "./MovieCard";
import { useApi } from "../contexts/ApiContext";
import { useAuth } from "../contexts/AuthContext";
import type { MoviesResponse } from "../types/movie";

interface MoviesGridProps {
    selectedGenres?: string[];
    endpoint?: string;
    title?: string;
    emptyStateMessage?: string;
    emptyStateIcon?: string;
}

export function MoviesGrid({
    selectedGenres = [],
    endpoint = "/movies",
    title,
    emptyStateMessage,
    emptyStateIcon = "🎬",
}: MoviesGridProps) {
    const [moviesData, setMoviesData] = useState<MoviesResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");

    const { getEndpoint } = useApi();
    const { token } = useAuth();
    const limit = 20; // Movies per page

    // Determine if this endpoint requires authentication
    const requiresAuth = endpoint === "/wishlist" || endpoint === "/watched";

    // Normalize movie data to ensure genres is always an array
    const normalizeMovies = useCallback(
        (data: MoviesResponse): MoviesResponse => {
            return {
                ...data,
                movies: data.movies.map((movie) => ({
                    ...movie,
                    // Genres is already a string from API, no need to normalize
                })),
            };
        },
        []
    );

    // Fetch movies whenever selectedGenres, currentPage, or searchQuery changes
    useEffect(() => {
        const fetchMovies = async () => {
            if (requiresAuth && !token) {
                setError("You must be logged in to view this page");
                return;
            }

            try {
                setIsLoading(true);
                setError(null);

                // Build query parameters
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    limit: limit.toString(),
                });

                // Add genres if any are selected (only for /movies endpoint)
                if (endpoint === "/movies" && selectedGenres.length > 0) {
                    selectedGenres.forEach((genre) => {
                        params.append("genres", genre);
                    });
                }

                // Add search query if present
                if (searchQuery.trim()) {
                    params.append("search", searchQuery.trim());
                }

                const headers: HeadersInit = {
                    "Content-Type": "application/json",
                };

                if (requiresAuth && token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const response = await fetch(
                    `${getEndpoint(endpoint)}?${params.toString()}`,
                    { headers }
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch movies: ${response.statusText}`
                    );
                }

                const data: MoviesResponse = await response.json();
                // console.log("Movies API Response:", data);
                // console.log("First movie:", data.movies[0]);
                // console.log("Has next page:", data.has_next);
                // console.log("Current page:", data.page);
                // console.log("Total movies:", data.total);

                // Normalize the data to ensure genres is always an array
                const normalizedData = normalizeMovies(data);
                setMoviesData(normalizedData);
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError(
                    err instanceof Error ? err.message : "Failed to load movies"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [
        currentPage,
        searchQuery,
        endpoint,
        token,
        requiresAuth,
        normalizeMovies,
        getEndpoint,
        // Use JSON.stringify for array to avoid reference issues
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(selectedGenres),
    ]);

    // Reset to page 1 when genres or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedGenres, searchQuery]);

    const handleSearch = () => {
        setSearchQuery(searchInput);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleClearSearch = () => {
        setSearchInput("");
        setSearchQuery("");
    };

    const formatGenreName = (genre: string) => {
        return genre
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <Flex
            direction="column"
            style={{
                width: "100%",
                height: "100%",
                minHeight: "0",
            }}
        >
            {/* Header Section */}
            <Flex
                direction="column"
                gap="4"
                style={{ margin: "var(--space-6)", flexShrink: 0 }}
            >
                {/* Title */}
                <Flex direction="column" gap="2">
                    <Heading size="6">
                        {title
                            ? title
                            : selectedGenres.length === 0
                            ? "All Movies"
                            : selectedGenres.length === 1
                            ? formatGenreName(selectedGenres[0])
                            : `${selectedGenres.length} Genres Selected`}
                    </Heading>
                    <Text color="gray">
                        {isLoading
                            ? "Loading..."
                            : moviesData
                            ? `${moviesData.total.toLocaleString()} movie${
                                  moviesData.total !== 1 ? "s" : ""
                              } found`
                            : ""}
                    </Text>
                </Flex>

                {/* Search Bar */}
                <Flex gap="2" align="center">
                    <TextField.Root
                        placeholder={
                            endpoint === "/wishlist"
                                ? "Search your watchlist..."
                                : endpoint === "/watched"
                                ? "Search watched movies..."
                                : "Search movies by title, director, or genre..."
                        }
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ flex: 1 }}
                        size="3"
                    >
                        <TextField.Slot>
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                    </TextField.Root>
                    <Button onClick={handleSearch} size="3">
                        Search
                    </Button>
                    {searchQuery && (
                        <Button
                            onClick={handleClearSearch}
                            variant="soft"
                            color="gray"
                            size="3"
                        >
                            Clear
                        </Button>
                    )}
                </Flex>
            </Flex>

            {/* Movies Grid - Scrollable */}
            <ScrollArea style={{ flex: 1, minHeight: "0" }}>
                <Flex
                    direction="column"
                    gap="6"
                    style={{
                        margin: "0 var(--space-6) var(--space-6) var(--space-6)",
                    }}
                >
                    {isLoading ? (
                        <Flex
                            align="center"
                            justify="center"
                            style={{ minHeight: "400px" }}
                        >
                            <Text size="4" color="gray">
                                Loading movies...
                            </Text>
                        </Flex>
                    ) : error ? (
                        <Flex
                            align="center"
                            justify="center"
                            direction="column"
                            gap="3"
                            style={{ minHeight: "400px" }}
                        >
                            <Text size="4" color="red">
                                ⚠️ Error Loading Movies
                            </Text>
                            <Text size="2" color="gray">
                                {error}
                            </Text>
                        </Flex>
                    ) : moviesData && moviesData.movies.length > 0 ? (
                        <>
                            {/* Movies Grid */}
                            <Flex
                                wrap="wrap"
                                gap="4"
                                justify="start"
                                style={{
                                    marginBottom: "var(--space-4)",
                                }}
                            >
                                {moviesData.movies.map((movie) => (
                                    <MovieCard
                                        key={movie.movieId}
                                        movie={movie}
                                    />
                                ))}
                            </Flex>

                            {/* Pagination - Bottom */}
                            {(currentPage > 1 || moviesData.has_next) && (
                                <Flex
                                    justify="center"
                                    align="center"
                                    gap="4"
                                    style={{
                                        paddingTop: "var(--space-4)",
                                        paddingBottom: "var(--space-4)",
                                    }}
                                >
                                    <Button
                                        onClick={() =>
                                            setCurrentPage((prev) =>
                                                Math.max(1, prev - 1)
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        variant="soft"
                                    >
                                        Previous
                                    </Button>
                                    <Text size="2" color="gray">
                                        Page {currentPage}
                                    </Text>
                                    <Button
                                        onClick={() =>
                                            setCurrentPage((prev) => prev + 1)
                                        }
                                        disabled={!moviesData.has_next}
                                        variant="soft"
                                    >
                                        Next
                                    </Button>
                                </Flex>
                            )}
                        </>
                    ) : (
                        <Flex
                            align="center"
                            justify="center"
                            direction="column"
                            gap="3"
                            style={{ minHeight: "400px" }}
                        >
                            <Text size="6">{emptyStateIcon}</Text>
                            <Text size="4" weight="medium" color="gray">
                                {emptyStateMessage || "No movies found"}
                            </Text>
                            <Text size="2" color="gray">
                                {selectedGenres.length > 0
                                    ? "Try selecting fewer genres or adjusting your search"
                                    : searchQuery
                                    ? "Try a different search query"
                                    : endpoint === "/wishlist"
                                    ? "Start adding movies you want to watch!"
                                    : endpoint === "/watched"
                                    ? "Start marking movies as watched!"
                                    : "No movies available"}
                            </Text>
                        </Flex>
                    )}
                </Flex>
            </ScrollArea>
        </Flex>
    );
}
