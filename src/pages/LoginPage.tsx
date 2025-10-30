import React, { useState } from "react";
import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Text,
    TextField,
    TextArea,
    Tabs,
    Container,
} from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: FormData) => {
        const username = data.get("username") as string;
        const password = data.get("password") as string;

        setIsLoading(true);

        try {
            const result = await login(username, password);

            if (result.success) {
                alert("Login successful! Welcome back!");
                navigate("/"); // Redirect to home page
            } else {
                alert(`Login failed: ${result.message}`);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form.Root
            onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                await handleSubmit(formData);
            }}
        >
            <Flex direction="column" gap="4">
                <Form.Field name="username">
                    <Flex direction="column" gap="1">
                        <Form.Label asChild>
                            <Text as="label" size="2" weight="medium">
                                Username
                            </Text>
                        </Form.Label>
                        <Form.Control asChild>
                            <TextField.Root
                                placeholder="Enter your username"
                                required
                            />
                        </Form.Control>
                        <Form.Message match="valueMissing">
                            <Text size="1" color="red">
                                Please enter your username
                            </Text>
                        </Form.Message>
                    </Flex>
                </Form.Field>

                <Form.Field name="password">
                    <Flex direction="column" gap="1">
                        <Form.Label asChild>
                            <Text as="label" size="2" weight="medium">
                                Password
                            </Text>
                        </Form.Label>
                        <Form.Control asChild>
                            <TextField.Root
                                type="password"
                                placeholder="Enter your password"
                                required
                            />
                        </Form.Control>
                        <Form.Message match="valueMissing">
                            <Text size="1" color="red">
                                Please enter your password
                            </Text>
                        </Form.Message>
                    </Flex>
                </Form.Field>

                <Form.Submit asChild>
                    <Button size="3" mt="2" disabled={isLoading}>
                        {isLoading ? "Signing In..." : "Sign In"}
                    </Button>
                </Form.Submit>
            </Flex>
        </Form.Root>
    );
};

const RegistrationForm: React.FC = () => {
    const { register } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (data: FormData) => {
        const userData = {
            username: data.get("username") as string,
            email: data.get("email") as string,
            password: data.get("password") as string,
            firstName: (data.get("first_name") as string) || undefined,
            lastName: (data.get("last_name") as string) || undefined,
            displayName: (data.get("display_name") as string) || undefined,
            bio: (data.get("bio") as string) || undefined,
        };

        setIsLoading(true);

        try {
            const result = await register(userData);

            if (result.success) {
                alert("Registration successful! You can now log in.");
                // Optionally switch to login tab or redirect
            } else {
                alert(`Registration failed: ${result.message}`);
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form.Root
            onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                await handleSubmit(formData);
            }}
        >
            <Flex direction="column" gap="4">
                <Form.Field name="username">
                    <Flex direction="column" gap="1">
                        <Form.Label asChild>
                            <Text as="label" size="2" weight="medium">
                                Username *
                            </Text>
                        </Form.Label>
                        <Form.Control asChild>
                            <TextField.Root
                                placeholder="Choose a username"
                                required
                            />
                        </Form.Control>
                        <Form.Message match="valueMissing">
                            <Text size="1" color="red">
                                Please choose a username
                            </Text>
                        </Form.Message>
                    </Flex>
                </Form.Field>

                <Form.Field name="email">
                    <Flex direction="column" gap="1">
                        <Form.Label asChild>
                            <Text as="label" size="2" weight="medium">
                                Email *
                            </Text>
                        </Form.Label>
                        <Form.Control asChild>
                            <TextField.Root
                                type="email"
                                placeholder="Enter your email"
                                required
                            />
                        </Form.Control>
                        <Form.Message match="valueMissing">
                            <Text size="1" color="red">
                                Please enter your email
                            </Text>
                        </Form.Message>
                        <Form.Message match="typeMismatch">
                            <Text size="1" color="red">
                                Please enter a valid email address
                            </Text>
                        </Form.Message>
                    </Flex>
                </Form.Field>

                <Form.Field name="password">
                    <Flex direction="column" gap="1">
                        <Form.Label asChild>
                            <Text as="label" size="2" weight="medium">
                                Password *
                            </Text>
                        </Form.Label>
                        <Form.Control asChild>
                            <TextField.Root
                                type="password"
                                placeholder="Create a password"
                                required
                            />
                        </Form.Control>
                        <Form.Message match="valueMissing">
                            <Text size="1" color="red">
                                Please create a password
                            </Text>
                        </Form.Message>
                    </Flex>
                </Form.Field>

                <Flex gap="3">
                    <Form.Field name="first_name" style={{ flex: 1 }}>
                        <Flex direction="column" gap="1">
                            <Form.Label asChild>
                                <Text as="label" size="2" weight="medium">
                                    First Name
                                </Text>
                            </Form.Label>
                            <Form.Control asChild>
                                <TextField.Root placeholder="First name (optional)" />
                            </Form.Control>
                        </Flex>
                    </Form.Field>

                    <Form.Field name="last_name" style={{ flex: 1 }}>
                        <Flex direction="column" gap="1">
                            <Form.Label asChild>
                                <Text as="label" size="2" weight="medium">
                                    Last Name
                                </Text>
                            </Form.Label>
                            <Form.Control asChild>
                                <TextField.Root placeholder="Last name (optional)" />
                            </Form.Control>
                        </Flex>
                    </Form.Field>
                </Flex>

                <Form.Field name="display_name">
                    <Flex direction="column" gap="1">
                        <Form.Label asChild>
                            <Text as="label" size="2" weight="medium">
                                Display Name
                            </Text>
                        </Form.Label>
                        <Form.Control asChild>
                            <TextField.Root placeholder="How others will see you (optional)" />
                        </Form.Control>
                    </Flex>
                </Form.Field>

                <Form.Field name="bio">
                    <Flex direction="column" gap="1">
                        <Form.Label asChild>
                            <Text as="label" size="2" weight="medium">
                                Bio
                            </Text>
                        </Form.Label>
                        <Form.Control asChild>
                            <TextArea
                                placeholder="Tell us about yourself (optional)"
                                rows={3}
                            />
                        </Form.Control>
                    </Flex>
                </Form.Field>

                <Form.Submit asChild>
                    <Button size="3" mt="2" disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                </Form.Submit>
            </Flex>
        </Form.Root>
    );
};

const LoginPage: React.FC = () => {
    return (
        <Container size="1" py="9">
            <Flex direction="column" align="center" gap="6">
                <Heading
                    size="8"
                    style={{
                        background:
                            "linear-gradient(135deg, var(--violet-11), var(--pink-11))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    Welcome to TasteLens
                </Heading>

                <Card size="4" style={{ width: "100%", maxWidth: "480px" }}>
                    <Tabs.Root defaultValue="login">
                        <Tabs.List justify="center" mb="6">
                            <Tabs.Trigger value="login">Sign In</Tabs.Trigger>
                            <Tabs.Trigger value="register">
                                Create Account
                            </Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content value="login">
                            <Box p="2">
                                <Heading size="4" mb="4" align="center">
                                    Sign In to Your Account
                                </Heading>
                                <LoginForm />
                            </Box>
                        </Tabs.Content>

                        <Tabs.Content value="register">
                            <Box p="2">
                                <Heading size="4" mb="4" align="center">
                                    Create Your Account
                                </Heading>
                                <RegistrationForm />
                            </Box>
                        </Tabs.Content>
                    </Tabs.Root>
                </Card>
            </Flex>
        </Container>
    );
};

export default LoginPage;
