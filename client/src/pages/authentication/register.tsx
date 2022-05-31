import { useMutation } from "@apollo/react-hooks";
import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import { gql } from "graphql-tag";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/logo";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utils/hooks";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      username
      token
    }
  }
`;

function Register(props: any) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  function registerUserCallback() {
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }: any) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values },
  });

  const handleAccountClick = (event: any) => {
    navigate("/");
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
        pt: 3,
        color: "white",
      }}
    >
      <Logo size={80} />
      <Typography variant="h4">Register</Typography>
      <Typography>
        This is the register page, register below to create an account!
      </Typography>
      <Stack
        sx={{
          display: "flex",
          flexFlow: "column",
          rowGap: 2,
          backgroundColor: "white",
          my: "20px",
          width: "70%",
          border: "solid cyan 5px",
          borderRadius: "20px",
          p: "60px",
        }}
      >
        <TextField label="Username" name="username" onChange={onChange} />
        <TextField label="Email" name="email" onChange={onChange}></TextField>
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
        <TextField
          label="Confirm password"
          name="confirmPassword"
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
          Register
        </Button>
        <Link
          onClick={handleAccountClick}
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
          <Typography>I already have an account ;)</Typography>
        </Link>
      </Stack>
      {errors.map(function(error: any) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
    </Container>
  );
}

export default Register;
