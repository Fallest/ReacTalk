import React from "react";
import "./animations.css";
import { Typography } from "@mui/material";

type LogoProps = {
  size: number;
};

export const Logo: React.FC<LogoProps> = (props) => {
  return (
    <Typography
      className="logo-fade-in"
      fontSize={props.size}
      sx={{
        textAlign: "center",
        color: "aqua",
        my: 1,
      }}
    >
      <sup className="border-around">React</sup>Talk
    </Typography>
  );
};
