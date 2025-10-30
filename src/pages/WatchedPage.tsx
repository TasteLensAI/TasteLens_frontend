import { Flex } from "@radix-ui/themes";
import { MoviesGrid } from "../components/MoviesGrid";

export function WatchedPage() {
    return (
        <Flex
            direction="row"
            style={{
                height: "100vh",
                overflow: "hidden",
            }}
        >
            {/* Main Content - Watched Grid */}
            <MoviesGrid
                endpoint="/watched"
                title="Watched Movies"
                emptyStateMessage="You haven't marked any movies as watched"
                emptyStateIcon="✅"
            />
        </Flex>
    );
}
