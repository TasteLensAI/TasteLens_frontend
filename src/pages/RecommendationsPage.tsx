import { useState, useEffect } from "react";
import {
    Container,
    Heading,
    Flex,
    Text,
    Button,
    Dialog,
    Box,
    Spinner,
    Badge,
} from "@radix-ui/themes";
import { ReloadIcon, RocketIcon } from "@radix-ui/react-icons";
import { useApi } from "../contexts/ApiContext";
import { useAuth } from "../contexts/AuthContext";
import { MovieCard } from "../components/MovieCard";
import type { Movie } from "../types/movie";

export function RecommendationsPage() {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [onboardingMovies, setOnboardingMovies] = useState<Movie[]>([]);
    const [recommendations, setRecommendations] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingOnboarding, setIsLoadingOnboarding] = useState(false);
    const [userMovieCount, setUserMovieCount] = useState<number | null>(null);
    const [showOnboardingPrompt, setShowOnboardingPrompt] = useState(false);

    const { getEndpoint } = useApi();
    const { token } = useAuth();

    const MINIMUM_MOVIES = 20;

    // Check user's movie count on mount
    useEffect(() => {
        const checkUserMovieCount = async () => {
            if (!token) return;

            try {
                // Fetch both watchlist and watched counts
                const [watchlistRes, watchedRes] = await Promise.all([
                    fetch(getEndpoint("/wishlist"), {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    fetch(getEndpoint("/watched"), {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                if (watchlistRes.ok && watchedRes.ok) {
                    const watchlistData = await watchlistRes.json();
                    const watchedData = await watchedRes.json();

                    const totalCount =
                        (watchlistData.total || 0) + (watchedData.total || 0);
                    setUserMovieCount(totalCount);

                    // Show onboarding prompt if not enough movies
                    if (totalCount < MINIMUM_MOVIES) {
                        setShowOnboardingPrompt(true);
                    } else {
                        // Directly load recommendations
                        loadRecommendations();
                    }
                }
            } catch (error) {
                console.error("Error checking user movie count:", error);
            }
        };

        checkUserMovieCount();
    }, [token, getEndpoint]);

    const loadOnboardingMovies = async () => {
        if (!token) return;

        setIsLoadingOnboarding(true);
        try {
            const response = await fetch(
                getEndpoint("/recommendations/onboarding?limit=20"),
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setOnboardingMovies(data.movies || []);
            }
        } catch (error) {
            console.error("Error loading onboarding movies:", error);
        } finally {
            setIsLoadingOnboarding(false);
        }
    };

    const loadRecommendations = async () => {
        if (!token) return;

        setIsLoading(true);
        try {
            const response = await fetch(
                getEndpoint("/recommendations/personalized?limit=20"),
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                const data = await response.json();
                setRecommendations(data.movies || []);
            }
        } catch (error) {
            console.error("Error loading recommendations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartOnboarding = () => {
        setShowOnboardingPrompt(false);
        setShowOnboarding(true);
        loadOnboardingMovies();
    };

    const handleSkipOnboarding = () => {
        setShowOnboardingPrompt(false);
        loadRecommendations();
    };

    const handleRefreshOnboarding = () => {
        loadOnboardingMovies();
    };

    const handleEndOnboarding = () => {
        setShowOnboarding(false);
        loadRecommendations();
    };

    return (
        <Container size="4" py="6">
            <Flex direction="column" gap="6">
                {/* Header */}
                <Flex justify="between" align="center">
                    <Flex direction="column" gap="2">
                        <Heading size="8">Personalized Recommendations</Heading>
                        <Text color="gray">
                            Discover movies tailored to your unique taste
                        </Text>
                    </Flex>
                    {userMovieCount !== null && (
                        <Badge size="2" color="blue" variant="soft">
                            {userMovieCount} movies rated
                        </Badge>
                    )}
                </Flex>

                {/* Onboarding Prompt Dialog */}
                <Dialog.Root
                    open={showOnboardingPrompt}
                    onOpenChange={setShowOnboardingPrompt}
                >
                    <Dialog.Content style={{ maxWidth: "500px" }}>
                        <Dialog.Title>
                            Help Us Understand Your Taste
                        </Dialog.Title>
                        <Dialog.Description size="3" mb="4">
                            You currently have {userMovieCount} movies in your
                            watchlist and watched list. We recommend adding at
                            least {MINIMUM_MOVIES} movies for better
                            personalized recommendations.
                        </Dialog.Description>

                        <Flex direction="column" gap="4">
                            <Box
                                p="4"
                                style={{
                                    backgroundColor: "var(--accent-3)",
                                    borderRadius: "var(--radius-3)",
                                }}
                            >
                                <Flex direction="column" gap="2">
                                    <Text weight="bold" size="3">
                                        🎬 Quick Onboarding
                                    </Text>
                                    <Text size="2" color="gray">
                                        We'll show you popular movies. Add the
                                        ones you like to your watchlist, and
                                        refresh for more options!
                                    </Text>
                                </Flex>
                            </Box>

                            <Flex gap="3" justify="end">
                                <Dialog.Close>
                                    <Button
                                        variant="soft"
                                        color="gray"
                                        onClick={handleSkipOnboarding}
                                    >
                                        Skip for now
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button onClick={handleStartOnboarding}>
                                        <RocketIcon />
                                        Start Onboarding
                                    </Button>
                                </Dialog.Close>
                            </Flex>
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>

                {/* Onboarding Dialog */}
                <Dialog.Root
                    open={showOnboarding}
                    onOpenChange={setShowOnboarding}
                >
                    <Dialog.Content
                        style={{
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                            overflow: "auto",
                        }}
                    >
                        <Flex direction="column" gap="4">
                            <Flex justify="between" align="center">
                                <Box>
                                    <Dialog.Title>
                                        Rate Your Favorite Movies
                                    </Dialog.Title>
                                    <Dialog.Description>
                                        Click on movies you like to add them to
                                        your watchlist
                                    </Dialog.Description>
                                </Box>
                                <Flex gap="2">
                                    <Button
                                        variant="soft"
                                        onClick={handleRefreshOnboarding}
                                        disabled={isLoadingOnboarding}
                                    >
                                        <ReloadIcon />
                                        Refresh Movies
                                    </Button>
                                    <Button
                                        variant="solid"
                                        onClick={handleEndOnboarding}
                                    >
                                        End Onboarding
                                    </Button>
                                </Flex>
                            </Flex>

                            {isLoadingOnboarding ? (
                                <Flex
                                    justify="center"
                                    align="center"
                                    style={{ minHeight: "400px" }}
                                >
                                    <Spinner size="3" />
                                </Flex>
                            ) : (
                                <Box
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fill, minmax(250px, 1fr))",
                                        gap: "var(--space-4)",
                                        padding: "var(--space-2)",
                                    }}
                                >
                                    {onboardingMovies.map((movie) => (
                                        <MovieCard
                                            key={movie.movieId}
                                            movie={movie}
                                        />
                                    ))}
                                </Box>
                            )}
                        </Flex>
                    </Dialog.Content>
                </Dialog.Root>

                {/* Recommendations Display */}
                {isLoading ? (
                    <Flex
                        justify="center"
                        align="center"
                        style={{ minHeight: "400px" }}
                    >
                        <Spinner size="3" />
                    </Flex>
                ) : recommendations.length > 0 ? (
                    <Box
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(250px, 1fr))",
                            gap: "var(--space-4)",
                        }}
                    >
                        {recommendations.map((movie) => (
                            <MovieCard key={movie.movieId} movie={movie} />
                        ))}
                    </Box>
                ) : !showOnboardingPrompt && !showOnboarding ? (
                    <Flex
                        direction="column"
                        align="center"
                        justify="center"
                        gap="4"
                        style={{ minHeight: "400px" }}
                    >
                        <Text size="5" color="gray">
                            No recommendations available yet
                        </Text>
                        <Button onClick={handleStartOnboarding}>
                            <RocketIcon />
                            Start Onboarding
                        </Button>
                    </Flex>
                ) : null}
            </Flex>
        </Container>
    );
}
