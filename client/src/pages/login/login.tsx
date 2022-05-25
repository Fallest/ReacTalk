import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utils/hooks";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { GraphQLError } from "graphql";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { useNavigate } from "react-router-dom";

import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import "./login-style.css";

const LOGIN_USER = gql`
  mutation login($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      email
      username
      token
    }
  }
`;

function Login(props: any) {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = React.useState(false);

  function loginUserCallback() {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/chats");
    },
    onError({ graphQLErrors }: any) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handleRegisterClick = (event: any) => {
    navigate("/register");
  };

  return (
    <Container
      className="Login"
      maxWidth="sm"
      sx={{
        textAlign: "center",
        position: "relative",
        width: "50vw",
        height: "30vh",
      }}
    >
      <h1
        style={{
          fontSize: "80px",
          color: "aqua",
        }}
      >
        <sup>React</sup>Talk
      </h1>
      {/**
       * Login form.
       */}
      <Stack
        spacing={2}
        paddingBottom={2}
        className="Login-form"
        sx={{
          backgroundColor: "white",
          margin: "20px",
          border: "solid cyan 5px",
          borderRadius: "20px",
          padding: "30px",
        }}
      >
        <TextField label="Email" name="email" onChange={onChange} />
        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/**
       * Error alerts.
       */}
      {errors.map(function(error) {
        return (
          <Alert sx={{ my: "10px" }} severity="error">
            {error.message}
          </Alert>
        );
      })}

      {/**
       * Login button.
       */}
      <Button
        variant="outlined"
        onClick={onSubmit}
        className="login-button"
        sx={{
          width: "90%",
          fontFamily: "Cantarell",
          cursor: "pointer",
        }}
      >
        Login
      </Button>

      {/**
       * Register button.
       */}
      <Button
        size="small"
        sx={{
          color: "#908787",
          borderColor: "#575757",
          fontSize: "18px",
          lineHeight: "25px",
          width: "90%",
          mt: "10px",
        }}
        variant="outlined"
        onClick={handleRegisterClick}
      >
        Register
      </Button>
    </Container>
  );
}

export default Login;
