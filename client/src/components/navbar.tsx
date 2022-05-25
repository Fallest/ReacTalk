import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import React, { useContext } from "react";

function Navbar() {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              ReactLogin
            </Link>
          </Typography>
          <Box
            alignItems="right"
            sx={{
              flewGrow: 1,
              textAlign: "right",
              marginLeft: "100px",
            }}
          >
            {user ? (
              <>
                <Button
                  style={{
                    textDecoration: "none",
                    color: "white",
                    marginRight: "10px",
                    fontFamily: "Cantarell",
                  }}
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    position: "fixed",
                    right: 150,
                    top: 15,
                    textDecoration: "none",
                    color: "white",
                    marginRight: "10px",
                    fontFamily: "Cantarell",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    position: "fixed",
                    right: 30,
                    top: 15,
                    textDecoration: "none",
                    color: "white",
                    fontFamily: "Cantarell",
                  }}
                >
                  Register
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
