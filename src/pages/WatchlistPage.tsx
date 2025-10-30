import { Flex } from "@radix-ui/themes";
import { MoviesGrid } from "../components/MoviesGrid";

export function WatchlistPage() {
    return (
        <Flex
            direction="row"
            style={{
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* Main Content - Watchlist Grid */}
            <MoviesGrid
                endpoint="/wishlist"
                title="My Watchlist"
                emptyStateMessage="Your watchlist is empty"
                emptyStateIcon="📚"
            />
        </Flex>
    );
}
