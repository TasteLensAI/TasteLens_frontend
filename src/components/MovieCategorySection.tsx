import { Box, Heading, Flex, Button } from "@radix-ui/themes";
import { useState, useRef, useEffect } from "react";
import type { MovieCategory } from "../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieCategoryProps {
    category: MovieCategory;
    minItemsPerPage?: number; // Minimum items to show, fallback for small screens
    cardMinWidth?: number; // Minimum width per card in pixels
}

export function MovieCategorySection({
    category,
    minItemsPerPage = 2,
    cardMinWidth = 270, // MovieCard width (250px) + gap space
}: MovieCategoryProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(minItemsPerPage);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Calculate items per page based on container width
    const calculateItemsPerPage = () => {
        if (!carouselRef.current) return minItemsPerPage;

        const containerWidth = carouselRef.current.offsetWidth;
        const calculatedItems = Math.floor(containerWidth / cardMinWidth);

        // Ensure we show at least the minimum items, but not more than available movies
        const finalItems = Math.max(
            minItemsPerPage,
            Math.min(calculatedItems, category.movies.length)
        );

        return finalItems;
    };

    // Update items per page on mount and resize
    useEffect(() => {
        const updateItemsPerPage = () => {
            const newItemsPerPage = calculateItemsPerPage();
            setItemsPerPage(newItemsPerPage);

            // Reset to page 0 if current page would be out of bounds
            const newTotalPages = Math.ceil(
                category.movies.length / newItemsPerPage
            );
            if (currentPage >= newTotalPages && newTotalPages > 0) {
                setCurrentPage(0);
            }
        };

        // Initial calculation
        updateItemsPerPage();

        // Setup ResizeObserver for responsive updates
        const resizeObserver = new ResizeObserver(() => {
            updateItemsPerPage();
        });

        if (carouselRef.current) {
            resizeObserver.observe(carouselRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [category.movies.length, currentPage, minItemsPerPage, cardMinWidth]);

    const totalPages = Math.ceil(category.movies.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const visibleMovies = category.movies.slice(startIndex, endIndex);

    const goToNext = () => {
        setCurrentPage((prev) => {
            const nextPage = (prev + 1) % totalPages;
            return nextPage;
        });
    };

    const goToPrevious = () => {
        setCurrentPage((prev) => {
            const prevPage = (prev - 1 + totalPages) % totalPages;
            return prevPage;
        });
    };

    return (
        <Box
            ref={carouselRef}
            mb="6"
            style={{
                padding: "0 var(--space-2)",
                minHeight: "400px",
            }}
        >
            {/* Category Header with Navigation */}
            <Flex justify="between" align="center" mb="4">
                <Heading size="5" color="gray">
                    {category.name}
                </Heading>

                <Flex gap="2" align="center">
                    <Button
                        variant="soft"
                        size="2"
                        onClick={goToPrevious}
                        disabled={totalPages <= 1}
                        style={{
                            cursor: totalPages <= 1 ? "not-allowed" : "pointer",
                            minWidth: "40px",
                        }}
                    >
                        ←
                    </Button>

                    <Box px="3">
                        <Heading size="1" color="gray">
                            {currentPage + 1} / {totalPages}
                        </Heading>
                    </Box>

                    <Button
                        variant="soft"
                        size="2"
                        onClick={goToNext}
                        disabled={totalPages <= 1}
                        style={{
                            cursor: totalPages <= 1 ? "not-allowed" : "pointer",
                            minWidth: "40px",
                        }}
                    >
                        →
                    </Button>
                </Flex>
            </Flex>

            {/* Movies Carousel */}
            <Flex
                key={`page-${currentPage}`} // Force re-render on page change
                wrap="wrap"
                gap="3"
                justify="start"
                style={{
                    transition: "opacity 0.3s ease",
                    marginBottom: "var(--space-4)",
                }}
            >
                {visibleMovies.map((movie, index) => (
                    <MovieCard
                        key={`${currentPage}-${movie.id}-${index}`}
                        movie={movie}
                    />
                ))}
            </Flex>
        </Box>
    );
}
