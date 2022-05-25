import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utils/hooks";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import React from "react";

import { TextField, Button, Container, Stack, Alert } from "@mui/material";

const REGISTER_USER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      email
      username
      token
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

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

  return (
    <Container maxWidth="sm">
      <h3>Register</h3>
      <p>This is the register page, regisdter below to create an account!</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField
          label="Username"
          name="username"
          onChange={onChange}
        ></TextField>
        <TextField label="Email" name="email" onChange={onChange}></TextField>
        <TextField
          label="Password"
          name="password"
          onChange={onChange}
        ></TextField>
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          onChange={onChange}
        ></TextField>
      </Stack>
      {errors.map(function(error) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
      <Button variant="contained" onClick={onSubmit}>
        Register
      </Button>
    </Container>
  );
}

export default Register;
