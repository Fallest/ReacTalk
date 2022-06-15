import { Box, Link, Typography } from "@mui/material";
import React, { FC } from "react";

export const ErrorNotLogged: FC = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          mt: "20%",
          color: "white",
        }}
        variant="h3"
      >
        You are not logged in.
      </Typography>
      <Link fontSize={20} href="/login" underline="hover" color="aqua">
        Go to login.
      </Link>
    </Box>
  );
};
