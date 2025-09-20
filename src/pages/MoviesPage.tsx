import { Flex } from "@radix-ui/themes";
import { useState } from "react";
import { CategorySidebar } from "../components/CategorySidebar";
import { MovieContentArea } from "../components/MovieContentArea";
import { mockMovieData } from "../data/mockData";

export function MoviesPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

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
                    categories={mockMovieData}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
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
                <MovieContentArea
                    selectedCategory={selectedCategory}
                    categories={mockMovieData}
                />
            </Flex>
        </Flex>
    );
}
