import React from "react";
import "./logoani.css";

export const Logo: React.FC = (props) => {
  return (
    <h1
      className="logo"
      style={{
        fontSize: "80px",
        color: "aqua",
        padding: 0,
        margin: 0,
      }}
    >
      <sup>React</sup>Talk
    </h1>
  );
};
