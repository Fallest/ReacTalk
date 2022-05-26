import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import client from "./apolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { Container } from "@mui/material";

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
            sx={{
              minWidth: "100vw",
              minHeight: "100vh",
              backgroundColor: "#282c34",
              clear: "both",
            }}
          >
            <App />
          </Container>
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
);
