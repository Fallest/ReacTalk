import React from "react";

import { UserLayout } from "../../components/user-layout";
import { ChatMessages } from "../../components/chat-messages";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Link, Typography } from "@mui/material";

function Profile() {
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  if (token === null) {
    navigate("/login");
  }

  return token ? (
    <UserLayout sideComponent={<ChatMessages />} />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          mt: 6,
          color: "white",
        }}
        variant="h3"
      >
        You are not logged in.
      </Typography>
      <Link fontSize={20} href="/login" underline="hover">
        Go to login.
      </Link>
    </Box>
  );
}

export default Profile;
