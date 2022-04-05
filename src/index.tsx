import React from "react";
import ReactDOM from "react-dom";
import "./components/MainPage/MainPage.css";
import MainPage from "./components/MainPage/MainPage";

ReactDOM.render(
  <React.StrictMode>
    <body className="App App-style">
      <MainPage />
    </body>
  </React.StrictMode>,
  document.getElementById("root")
);
