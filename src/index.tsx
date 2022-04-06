import React from "react";
import ReactDOM from "react-dom";
import "./components/MainPage/MainPage.css";
import MainPage from "./components/MainPage/MainPage";

ReactDOM.render(
  <div className="App App-style">
    <React.StrictMode>
      <MainPage />
    </React.StrictMode>
  </div>,
  document.getElementById("root")
);
