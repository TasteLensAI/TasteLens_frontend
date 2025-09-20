import { Box, Flex, TextField, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";

interface MovieSearchBarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    resultsCount?: number;
}

export function MovieSearchBar({
    searchQuery,
    onSearchChange,
    resultsCount,
}: MovieSearchBarProps) {
    const handleClearSearch = () => {
        onSearchChange("");
    };

    return (
        <Box mb="4">
            <Flex direction="column" gap="2">
                {/* Search Input */}
                <Box style={{ position: "relative" }}>
                    <TextField.Root
                        placeholder="Search movies by title..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        size="3"
                        style={{
                            paddingLeft: "var(--space-7)", // Make room for search icon
                            paddingRight: searchQuery
                                ? "var(--space-7)"
                                : "var(--space-3)", // Make room for clear button when there's text
                        }}
                    >
                        <TextField.Slot>
                            <MagnifyingGlassIcon
                                height="16"
                                width="16"
                                style={{ color: "var(--gray-10)" }}
                            />
                        </TextField.Slot>

                        {searchQuery && (
                            <TextField.Slot>
                                <Box
                                    onClick={handleClearSearch}
                                    style={{
                                        cursor: "pointer",
                                        padding: "var(--space-1)",
                                        borderRadius: "var(--radius-1)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "var(--gray-10)",
                                        transition: "color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--gray-12)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color =
                                            "var(--gray-10)";
                                    }}
                                >
                                    <Cross2Icon height="14" width="14" />
                                </Box>
                            </TextField.Slot>
                        )}
                    </TextField.Root>
                </Box>

                {/* Search Results Info */}
                {searchQuery && (
                    <Text size="2" color="gray">
                        {resultsCount !== undefined
                            ? resultsCount > 0
                                ? `Found ${resultsCount} movie${
                                      resultsCount !== 1 ? "s" : ""
                                  } matching "${searchQuery}"`
                                : `No movies found matching "${searchQuery}"`
                            : `Searching for "${searchQuery}"`}
                    </Text>
                )}
            </Flex>
        </Box>
    );
}
