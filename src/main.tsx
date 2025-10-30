import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

import "@radix-ui/themes/styles.css";
import "./styles/animations.css";
import { Theme } from "@radix-ui/themes";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Theme
                // appearance="dark"
                accentColor="mint"
                grayColor="mauve"
                radius="medium"
            >
                <App />
            </Theme>
        </BrowserRouter>
    </StrictMode>
);
