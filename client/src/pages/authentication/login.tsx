import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Link,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { gql } from "graphql-tag";

import { Logo } from "../../components/logo";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utils/hooks";
import { ArrowForward } from "@mui/icons-material";
import "../../components/animations.css";

/**
 * Create a GraphQL mutation, so it can be later used to log in the user.
 */
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
  /**
   * navigate is used to move around routes.
   *
   * context has the login function that creates a JWT and stores it in localStorage:
   *  the user is NOT validated inside the context, the user is validated before that.
   */
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = React.useState(false);

  function loginUserCallback() {
    loginUser();
  }

  /**
   * Using the useForm hook allows to update TextInput's values with cleaner code.
   */
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  /**
   * The useMutation hook is used to access data from the database like so:
   *  -A mutation type (declared in graphql/typeDefs.ts and uses the resolvers
   *    on graphql/resolvers/users.ts) is used when creating the mutation LOGIN_USER.
   *  -useMutation returns the resolver function, which will validate the user info.
   *  -If the mutation is successful and performs an update, the login function on the
   *    context will be called, and the page will be forwarded to the chatss page.
   */
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

  /**
   * Check if a user is already logged in.
   * If there is a user logged in, we go into the chats page.
   */
  if (context.user !== null) {
    navigate("/chats");
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        width: "50vw",
        zIndex: 1,
      }}
    >
      <Logo size={80} />
      {/**
       * Login form.
       */}
      <Stack
        className="logo-fade-in border-around"
        sx={{
          display: "flex",
          flexFlow: "column",
          rowGap: 2,
          backgroundColor: "white",
          width: "70%",
          margin: "20px",
          borderRadius: "20px",
          px: "60px",
          pt: "60px",
        }}
      >
        <TextField label="Username" name="username" onChange={onChange} />
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
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            maxWidth: "30%",
            alignSelf: "flex-end",
            fontFamily: "Cantarell",
            cursor: "pointer",
            backgroundColor: "#316e70",
            mb: "auto",
            ":hover": {
              backgroundColor: "aqua",
              color: "black",
            },
          }}
        >
          Login&nbsp;
          <ArrowForward fontSize="small" />
        </Button>

        <Link
          onClick={handleRegisterClick}
          sx={{
            justifySelf: "flex-end",
            textDecoration: "none",
            color: "#908787",
            borderColor: "#575757",
            fontSize: "18px",
            lineHeight: "25px",
            ":hover": {
              textDecoration: "underline",
              cursor: "pointer",
            },
          }}
        >
          <Typography variant="body1" fontSize="20px" my={3}>
            I don't have an account, register me!
          </Typography>
        </Link>
      </Stack>

      {/**
       * Error alerts.
       */}
      {errors.map(function(error: any) {
        return (
          <Alert sx={{ my: "10px" }} severity="error">
            {error.message}
          </Alert>
        );
      })}
    </Container>
  );
}

export default Login;
