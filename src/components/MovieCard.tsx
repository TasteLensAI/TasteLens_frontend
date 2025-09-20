import { Card, Flex, Text, Badge, Box } from "@radix-ui/themes";
import { useState } from "react";
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
    return (
        <Box
            style={{
                flex: isHovered
                    ? `0 0 ${activeSizeRatio}%` // Hovered: small (15%)
                    : `1 0 ${defaultSizeRatio}%`, // Not hovered: large (85%)
                transition: "flex 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                overflow: "hidden",
            }}
        >
            <img
                src={coverImage}
                alt={alt}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    backgroundColor: "var(--gray-5)",
                }}
            />
        </Box>
    );
}

function MovieCardContent({
    movie,
    isHovered,
    defaultSizeRatio = 15,
}: MovieCardContentProps) {
    const activeSizeRatio = 100 - defaultSizeRatio;
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
                    {movie.year} • {movie.duration}
                </Text>
            </Flex>

            {/* Hover content */}
            {isHovered && (
                <Flex direction="column" gap="3" style={{ flex: "1" }}>
                    <Flex align="center" gap="2">
                        <Badge color="gold" variant="soft">
                            ⭐ {movie.imdbRating}
                        </Badge>
                        <Text size="1" color="gray">
                            IMDB
                        </Text>
                    </Flex>

                    <Box>
                        <Text size="2" weight="bold" mb="1">
                            Genres
                        </Text>
                        <Flex wrap="wrap" gap="1">
                            {movie.genres.map((genre) => (
                                <Badge key={genre} variant="outline" size="1">
                                    {genre}
                                </Badge>
                            ))}
                        </Flex>
                    </Box>

                    <Box>
                        <Text size="2" color="gray">
                            <Text weight="bold">Director:</Text>{" "}
                            {movie.director}
                        </Text>
                    </Box>

                    <Box style={{ flex: "1" }}>
                        <Text
                            size="2"
                            color="gray"
                            style={{ lineHeight: "1.4" }}
                        >
                            {movie.description.length > 100
                                ? `${movie.description.substring(0, 100)}...`
                                : movie.description}
                        </Text>
                    </Box>
                </Flex>
            )}
        </Box>
    );
}

export function MovieCard({ movie }: MovieCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const bigRatio = 80;
    const smallRatio = 100 - bigRatio;

    return (
        <Card
            size="1"
            style={{
                width: "250px",
                height: "450px",
                cursor: "pointer",
                overflow: "hidden",
                transition: "all 0.3s ease",
                transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                boxShadow: isHovered ? "var(--shadow-6)" : "var(--shadow-3)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Flex direction="column" height="100%">
                {/* Image Section */}
                <MovieCardImage
                    alt={`${movie.title} poster`}
                    coverImage={movie.coverImage}
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
    );
}
