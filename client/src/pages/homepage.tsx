import { AuthContext } from "../context/authContext";
import React, { useContext } from "react";
import "./homepage.css";

function Homepage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <p className="App">
        ReacTalk is an instant messaging web app, developed for a degree
        coursework.
      </p>
    </>
  );
}

export default Homepage;
