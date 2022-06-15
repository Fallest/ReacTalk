import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import client from "./apolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Box, Container } from "@mui/material";

/**
 * Our react app needss access to:
 * -Client: to interact with the server
 * -Authorization Context: to know when the user is authenticated by the server
 * -Browser router: to move between pages
 */

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
          <Container
            disableGutters
            sx={{
              minWidth: "100vw",
              minHeight: "100vh",
              backgroundColor: "#282c34",
            }}
          >
            <App />
          </Container>
          <footer>
            <Box
              sx={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                mr: "auto",
                ml: "30px",
              }}
            >
              <a
                rel="license"
                href="http://creativecommons.org/licenses/by-sa/4.0/"
              >
                <img
                  alt="Creative Commons License"
                  style={{ borderWidth: 0 }}
                  src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
                />
              </a>
              <br />
              This work is licensed under a{" "}
              <a
                rel="license"
                style={{ textDecoration: "none", color: "darkturquoise" }}
                href="http://creativecommons.org/licenses/by-sa/4.0/"
              >
                Creative Commons Attribution-ShareAlike 4.0 International
                License
              </a>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                mr: "30px",
              }}
            >
              Designed and developed by
              <a
                style={{ textDecoration: "none", color: "darkturquoise" }}
                href="https://github.com/Fallest"
              >
                David Navarrete
              </a>
              Check the source code on
              <a
                style={{ textDecoration: "none", color: "darkturquoise" }}
                href="https://github.com/Fallest/ReacTalk"
              >
                GitHub
              </a>
            </Box>
          </footer>
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
);
