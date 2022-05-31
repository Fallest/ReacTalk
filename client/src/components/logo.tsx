import React from "react";
import "./logoani.css";
import { Typography } from "@mui/material";

type LogoProps = {
  size: number;
};

export const Logo: React.FC<LogoProps> = (props) => {
  return (
    <Typography
      className="logo"
      fontSize={props.size}
      sx={{
        color: "aqua",
        p: 0,
        m: 0,
      }}
    >
      <sup>React</sup>Talk
    </Typography>
  );
};
