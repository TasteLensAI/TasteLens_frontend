import {
    Card,
    Flex,
    Text,
    Badge,
    Box,
    IconButton,
    Dialog,
    Heading,
    VisuallyHidden,
} from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { BookmarkIcon, CheckIcon, ImageIcon } from "@radix-ui/react-icons";
import { useApi } from "../contexts/ApiContext";
import { useAuth } from "../contexts/AuthContext";
import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie: Movie;
}

interface MovieCardImageProps {
    alt: string;
    coverImage: string;
    isHovered: boolean;
    defaultSizeRatio?: number;
}

interface MovieCardContentProps {
    movie: Movie;
    isHovered: boolean;
    defaultSizeRatio?: number;
}

function MovieCardImage({
    alt,
    coverImage,
    isHovered,
    defaultSizeRatio = 85,
}: MovieCardImageProps) {
    const activeSizeRatio = 100 - defaultSizeRatio;
    const hasValidImage = coverImage && !coverImage.includes("placeholder");

    return (
        <Box
            style={{
                flex: isHovered
                    ? `0 0 ${activeSizeRatio}%` // Hovered: small (15%)
                    : `1 0 ${defaultSizeRatio}%`, // Not hovered: large (85%)
                transition: "flex 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden",
                backgroundColor: "var(--gray-5)",
            }}
        >
            {hasValidImage ? (
                <img
                    src={coverImage}
                    alt={alt}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            ) : (
                <Flex
                    align="center"
                    justify="center"
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "var(--gray-4)",
                    }}
                >
                    <ImageIcon
                        width="64"
                        height="64"
                        style={{ color: "var(--gray-8)" }}
                    />
                </Flex>
            )}
        </Box>
    );
}

function MovieCardContent({
    movie,
    isHovered,
    defaultSizeRatio = 15,
}: MovieCardContentProps) {
    const activeSizeRatio = 100 - defaultSizeRatio;

    // Format duration from minutes to hours and minutes
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    // Parse genres string to array
    const genresArray = movie.genres
        ? movie.genres
              .split("|")
              .map((g) => g.trim())
              .filter((g) => g)
        : [];

    return (
        <Box
            p="4"
            style={{
                flex: isHovered
                    ? `1 0 ${activeSizeRatio}%` // Hovered: large (85%)
                    : `0 0 ${defaultSizeRatio}%`, // Not hovered: small (15%)
                transition: "flex 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
            }}
        >
            {/* Always visible: Title and Year */}
            <Flex direction="column" gap="1">
                <Text size="4" weight="bold" trim="both">
                    {movie.title}
                </Text>
                <Text size="2" color="gray">
                    {movie.year} • {formatDuration(movie.duration)}
                </Text>
            </Flex>

            {/* Hover content */}
            {isHovered && (
                <Flex direction="column" gap="3" style={{ flex: "1" }}>
                    <Flex align="center" gap="2">
                        <Badge color="gold" variant="soft">
                            ⭐ {movie.tmdbRating.toFixed(1)}
                        </Badge>
                        <Text size="1" color="gray">
                            ({movie.tmdbVoteCount.toLocaleString()} votes)
                        </Text>
                    </Flex>

                    {genresArray.length > 0 && (
                        <Box>
                            <Text size="2" weight="bold" mb="1">
                                Genres
                            </Text>
                            <Flex wrap="wrap" gap="1">
                                {genresArray.map((genre, index) => (
                                    <Badge
                                        key={`${genre}-${index}`}
                                        variant="outline"
                                        size="1"
                                    >
                                        {genre}
                                    </Badge>
                                ))}
                            </Flex>
                        </Box>
                    )}

                    {movie.tagline && (
                        <Box>
                            <Text
                                size="2"
                                color="gray"
                                style={{ fontStyle: "italic" }}
                            >
                                "{movie.tagline}"
                            </Text>
                        </Box>
                    )}

                    <Box style={{ flex: "1" }}>
                        <Text
                            size="2"
                            color="gray"
                            style={{ lineHeight: "1.4" }}
                        >
                            {movie.description && movie.description.length > 100
                                ? `${movie.description.substring(0, 100)}...`
                                : movie.description ||
                                  "No description available"}
                        </Text>
                    </Box>
                </Flex>
            )}
        </Box>
    );
}

export function MovieCard({ movie }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const [isCheckingStatus, setIsCheckingStatus] = useState(false);

    const { getEndpoint } = useApi();
    const { token } = useAuth();

    const bigRatio = 80;
    const smallRatio = 100 - bigRatio;

    // Build poster URL from poster_path
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "";

    // Check watchlist and watched status when dialog opens
    useEffect(() => {
        const checkMovieStatus = async () => {
            if (!isDialogOpen || !token) {
                // Reset state when dialog closes
                if (!isDialogOpen) {
                    setIsInWatchlist(false);
                    setIsWatched(false);
                    setIsCheckingStatus(false);
                }
                return;
            }

            setIsCheckingStatus(true);
            try {
                // Check watchlist status
                const watchlistResponse = await fetch(
                    getEndpoint(`/wishlist/check/${movie.movieId}`),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (watchlistResponse.ok) {
                    const watchlistData = await watchlistResponse.json();
                    console.log("Watchlist check response:", watchlistData);
                    setIsInWatchlist(watchlistData.inWishlist || false);
                } else {
                    console.error(
                        "Watchlist check failed:",
                        watchlistResponse.status
                    );
                }

                // Check watched status
                const watchedResponse = await fetch(
                    getEndpoint(`/watched/check/${movie.movieId}`),
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (watchedResponse.ok) {
                    const watchedData = await watchedResponse.json();
                    console.log("Watched check response:", watchedData);
                    setIsWatched(watchedData.isWatched || false);
                } else {
                    console.error(
                        "Watched check failed:",
                        watchedResponse.status
                    );
                }
            } catch (error) {
                console.error("Error checking movie status:", error);
            } finally {
                setIsCheckingStatus(false);
            }
        };

        checkMovieStatus();
    }, [isDialogOpen, movie.movieId, token, getEndpoint]);

    // Format duration from minutes to hours and minutes
    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    };

    // Parse genres string to array
    const genresArray = movie.genres
        ? movie.genres
              .split("|")
              .map((g) => g.trim())
              .filter((g) => g)
        : [];

    const handleWatchlistClick = async () => {
        if (!token) return;

        const newWatchlistState = !isInWatchlist;
        const action = newWatchlistState ? "add" : "remove";
        const endpoint = `/wishlist/${action}?movieId=${movie.movieId}`;

        try {
            // Optimistically update UI
            setIsInWatchlist(newWatchlistState);

            const response = await fetch(getEndpoint(endpoint), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // Revert on failure
                setIsInWatchlist(!newWatchlistState);
                const errorText = await response.text();
                console.error("Failed to update watchlist:", errorText);
            }
        } catch (error) {
            // Revert on error
            setIsInWatchlist(!newWatchlistState);
            console.error("Error updating watchlist:", error);
        }
    };

    const handleWatchedClick = async () => {
        if (!token) return;

        const newWatchedState = !isWatched;
        const action = newWatchedState ? "add" : "remove";
        const endpoint = `/watched/${action}?movieId=${movie.movieId}`;

        try {
            // Optimistically update UI
            setIsWatched(newWatchedState);

            const response = await fetch(getEndpoint(endpoint), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                // Revert on failure
                setIsWatched(!newWatchedState);
                const errorText = await response.text();
                console.error("Failed to update watched status:", errorText);
            }
        } catch (error) {
            // Revert on error
            setIsWatched(!newWatchedState);
            console.error("Error updating watched status:", error);
        }
    };

    return (
        <>
            <Card
                size="1"
                style={{
                    width: "250px",
                    height: "450px",
                    cursor: "pointer",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    boxShadow: isHovered
                        ? "var(--shadow-6)"
                        : "var(--shadow-3)",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsDialogOpen(true)}
            >
                <Flex direction="column" height="100%">
                    {/* Image Section */}
                    <MovieCardImage
                        alt={`${movie.title} poster`}
                        coverImage={posterUrl}
                        isHovered={isHovered}
                        defaultSizeRatio={bigRatio}
                    />

                    {/* Content Section */}
                    <MovieCardContent
                        movie={movie}
                        isHovered={isHovered}
                        defaultSizeRatio={smallRatio}
                    />
                </Flex>
            </Card>

            {/* Expanded Dialog */}
            <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Content
                    style={{
                        maxWidth: "900px",
                        maxHeight: "90vh",
                        overflow: "auto",
                    }}
                >
                    <VisuallyHidden>
                        <Dialog.Title>{movie.title}</Dialog.Title>
                    </VisuallyHidden>

                    <Flex direction="row" gap="6">
                        {/* Left: Movie Poster */}
                        <Box
                            style={{
                                width: "300px",
                                flexShrink: 0,
                            }}
                        >
                            {posterUrl ? (
                                <img
                                    src={posterUrl}
                                    alt={`${movie.title} poster`}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "var(--radius-3)",
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <Flex
                                    align="center"
                                    justify="center"
                                    style={{
                                        width: "100%",
                                        height: "450px",
                                        backgroundColor: "var(--gray-4)",
                                        borderRadius: "var(--radius-3)",
                                    }}
                                >
                                    <ImageIcon
                                        width="64"
                                        height="64"
                                        style={{ color: "var(--gray-8)" }}
                                    />
                                </Flex>
                            )}
                        </Box>

                        {/* Right: Movie Details */}
                        <Flex
                            direction="column"
                            gap="4"
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Flex direction="column" gap="2">
                                <Heading size="7">{movie.title}</Heading>
                                {movie.original_title &&
                                    movie.original_title !== movie.title && (
                                        <Text size="3" color="gray">
                                            Original: {movie.original_title}
                                        </Text>
                                    )}
                                <Flex align="center" gap="3">
                                    <Text size="3" color="gray">
                                        {movie.year}
                                    </Text>
                                    <Text size="3" color="gray">
                                        •
                                    </Text>
                                    <Text size="3" color="gray">
                                        {formatDuration(movie.duration)}
                                    </Text>
                                    <Text size="3" color="gray">
                                        •
                                    </Text>
                                    <Badge color="gold" variant="soft">
                                        ⭐ {movie.tmdbRating.toFixed(1)}
                                    </Badge>
                                    <Text size="2" color="gray">
                                        ({movie.tmdbVoteCount.toLocaleString()}{" "}
                                        votes)
                                    </Text>
                                </Flex>
                            </Flex>

                            {movie.tagline && (
                                <Text
                                    size="3"
                                    color="gray"
                                    style={{ fontStyle: "italic" }}
                                >
                                    "{movie.tagline}"
                                </Text>
                            )}

                            {genresArray.length > 0 && (
                                <Flex direction="column" gap="2">
                                    <Text size="2" weight="bold">
                                        Genres
                                    </Text>
                                    <Flex wrap="wrap" gap="2">
                                        {genresArray.map((genre, index) => (
                                            <Badge
                                                key={`${genre}-${index}`}
                                                variant="outline"
                                                size="2"
                                            >
                                                {genre}
                                            </Badge>
                                        ))}
                                    </Flex>
                                </Flex>
                            )}

                            <Flex
                                direction="column"
                                gap="2"
                                style={{ flex: 1 }}
                            >
                                <Text size="2" weight="bold">
                                    Overview
                                </Text>
                                <Text size="3" style={{ lineHeight: "1.6" }}>
                                    {movie.description ||
                                        "No description available"}
                                </Text>
                            </Flex>

                            {/* Action Buttons - Pushed to bottom */}
                            <Flex gap="3" mt="auto">
                                <IconButton
                                    size="3"
                                    variant={isInWatchlist ? "solid" : "soft"}
                                    color={isInWatchlist ? "green" : "gray"}
                                    disabled={isCheckingStatus}
                                    style={{
                                        cursor: isCheckingStatus
                                            ? "wait"
                                            : "pointer",
                                        flex: 1,
                                    }}
                                    onClick={handleWatchlistClick}
                                >
                                    <BookmarkIcon width="20" height="20" />
                                    <Text size="2" ml="2">
                                        {isCheckingStatus
                                            ? "Loading..."
                                            : isInWatchlist
                                            ? "In Watchlist"
                                            : "Add to Watchlist"}
                                    </Text>
                                </IconButton>

                                <IconButton
                                    size="3"
                                    variant={isWatched ? "solid" : "soft"}
                                    color={isWatched ? "blue" : "gray"}
                                    disabled={isCheckingStatus}
                                    style={{
                                        cursor: isCheckingStatus
                                            ? "wait"
                                            : "pointer",
                                        flex: 1,
                                    }}
                                    onClick={handleWatchedClick}
                                >
                                    <CheckIcon width="20" height="20" />
                                    <Text size="2" ml="2">
                                        {isCheckingStatus
                                            ? "Loading..."
                                            : isWatched
                                            ? "Watched"
                                            : "Mark as Watched"}
                                    </Text>
                                </IconButton>
                            </Flex>
                        </Flex>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </>
    );
}
