import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import client from "./apolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

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
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>
);
