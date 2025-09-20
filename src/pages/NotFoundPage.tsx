import { Box, Flex, Text, Heading, Button } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <Box p="6">
            <Flex
                direction="column"
                align="center"
                gap="6"
                style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    textAlign: "center",
                    minHeight: "60vh",
                    justifyContent: "center",
                }}
            >
                <Heading size="9" color="gray">
                    404
                </Heading>

                <Heading size="6" mb="2">
                    Page Not Found
                </Heading>

                <Text size="4" color="gray" style={{ lineHeight: "1.6" }}>
                    Sorry, the page you're looking for doesn't exist. It might
                    have been moved, deleted, or you entered the wrong URL.
                </Text>

                <Flex gap="3" mt="4">
                    <Button size="3" onClick={() => navigate("/")}>
                        Go Home
                    </Button>
                    <Button
                        size="3"
                        variant="outline"
                        onClick={() => navigate("/movies")}
                    >
                        Browse Movies
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
}
