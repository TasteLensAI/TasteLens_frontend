import { Card, Flex, Text, Badge, Box, IconButton } from "@radix-ui/themes";
import { useState, useEffect, useRef } from "react";
import { BookmarkIcon, CheckIcon, ImageIcon } from "@radix-ui/react-icons";
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
    const [isClicked, setIsClicked] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [isWatched, setIsWatched] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const bigRatio = 80;
    const smallRatio = 100 - bigRatio;

    // Build poster URL from poster_path
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "";

    // Close overlay when clicking outside the card
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                setIsClicked(false);
            }
        };

        if (isClicked) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isClicked]);

    const handleCardClick = () => {
        setIsClicked(!isClicked);
    };

    const handleWatchlistClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click event
        setIsInWatchlist(!isInWatchlist);
        console.log(`${movie.title} - Watchlist toggled:`, !isInWatchlist);
    };

    const handleWatchedClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click event
        setIsWatched(!isWatched);
        console.log(`${movie.title} - Watched toggled:`, !isWatched);
    };

    return (
        <Card
            ref={cardRef}
            size="1"
            style={{
                width: "250px",
                height: "450px",
                cursor: "pointer",
                overflow: "hidden",
                transition: "all 0.3s ease",
                transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                boxShadow: isHovered ? "var(--shadow-6)" : "var(--shadow-3)",
                position: "relative",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
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

            {/* Purple Overlay with Action Buttons */}
            {isClicked && (
                <Box
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(110, 86, 207, 0)", // Start transparent
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "var(--space-4)",
                        animation:
                            "overlayFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                        zIndex: 10,
                    }}
                >
                    <Flex
                        direction="column"
                        gap="6"
                        align="center"
                        style={{
                            animation:
                                "buttonsSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s forwards",
                            opacity: 0,
                            transform: "translateY(20px)",
                        }}
                    >
                        {/* Watchlist Button */}
                        <Flex direction="column" align="center" gap="2">
                            <IconButton
                                size="4"
                                variant={isInWatchlist ? "solid" : "soft"}
                                color={isInWatchlist ? "green" : "gray"}
                                radius="full"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    cursor: "pointer",
                                    backgroundColor: isInWatchlist
                                        ? "var(--green-9)"
                                        : "rgba(255, 255, 255, 0.2)",
                                    transition: "all 0.3s ease",
                                }}
                                onClick={handleWatchlistClick}
                            >
                                <BookmarkIcon width="32" height="32" />
                            </IconButton>
                            <Text
                                size="3"
                                weight="bold"
                                style={{ color: "white" }}
                            >
                                {isInWatchlist
                                    ? "In Watchlist"
                                    : "Add to Watchlist"}
                            </Text>
                        </Flex>

                        {/* Watched Button */}
                        <Flex direction="column" align="center" gap="2">
                            <IconButton
                                size="4"
                                variant={isWatched ? "solid" : "soft"}
                                color={isWatched ? "blue" : "gray"}
                                radius="full"
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    cursor: "pointer",
                                    backgroundColor: isWatched
                                        ? "var(--blue-9)"
                                        : "rgba(255, 255, 255, 0.2)",
                                    transition: "all 0.3s ease",
                                }}
                                onClick={handleWatchedClick}
                            >
                                <CheckIcon width="32" height="32" />
                            </IconButton>
                            <Text
                                size="3"
                                weight="bold"
                                style={{ color: "white" }}
                            >
                                {isWatched ? "Watched" : "Mark as Watched"}
                            </Text>
                        </Flex>
                    </Flex>
                </Box>
            )}
        </Card>
    );
}
