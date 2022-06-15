import {
  Button,
  LinearProgress as LoadingIcon,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useContext, useState } from "react";

import { Card, Alert, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/authContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Close } from "@mui/icons-material";

const bcrypt = require("bcryptjs");

/**
 * Queries and mutations to get and modify user data.
 */
export const GET_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      username
      email
      password
    }
  }
`;

export const CHANGE_USERNAME = gql`
  mutation changeUsername(
    $changeUsernameId: ID!
    $editUsernameInput: EditUsernameInput
  ) {
    changeUsername(id: $changeUsernameId, editUsernameInput: $editUsernameInput)
  }
`;

export const CHANGE_EMAIL = gql`
  mutation changeEmail($changeEmailId: ID!, $editEmailInput: EditEmailInput) {
    changeEmail(id: $changeEmailId, editEmailInput: $editEmailInput)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $changePasswordId: ID!
    $editPasswordInput: EditPasswordInput
  ) {
    changePassword(id: $changePasswordId, editPasswordInput: $editPasswordInput)
  }
`;

type ProfileInfoProps = {
  visible: boolean;
};

export const ProfileInfo: FC<ProfileInfoProps> = (props) => {
  const { visible } = props;
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [usernameChanged, setUsernameChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [pwdChanged, setPwdChanged] = useState(false);

  // Mutation to modify user data
  const [changeUsername] = useMutation(CHANGE_USERNAME, {
    onError({ graphQLErrors }: any) {
      setErrors(graphQLErrors);
    },
    variables: {
      changeUsernameId: context.user.user_id,
      editUsernameInput: { username: userData.username },
    },
  });

  const [changeEmail] = useMutation(CHANGE_EMAIL, {
    onError({ graphQLErrors }: any) {
      setErrors(graphQLErrors);
    },
    variables: {
      changeEmailId: context.user.user_id,
      editEmailInput: { email: userData.email },
    },
  });

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onError({ graphQLErrors }: any) {
      setErrors(graphQLErrors);
    },
    variables: {
      changePasswordId: context.user.user_id,
      editPasswordInput: { password: userData.password },
    },
  });

  // Get all user info
  const { loading, data, refetch } = useQuery(GET_USER, {
    onCompleted(data) {
      setUserData(data.user);
    },
    onError({ graphQLErrors }: any) {
      setErrors(graphQLErrors);
    },
    variables: { id: context.user.user_id },
  });

  const onChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsernameChanged(true);
        setUserData({ ...userData, username: e.target.value });
        break;
      case "email":
        setEmailChanged(true);
        setUserData({ ...userData, email: e.target.value });
        break;
      case "password":
        setPwdChanged(true);
        setUserData({ ...userData, password: e.target.value });
        break;
    }
  };

  const onSubmit = () => {
    usernameChanged && changeUsername();
    emailChanged && changeEmail();
    pwdChanged && changePassword();
    refetch();
  };

  return (
    visible &&
    (loading ? (
      <Card
        sx={{
          width: "100%",
          height: "840px",
          backgroundColor: "inherit",
        }}
      >
        <Box
          sx={{
            mt: 3,
            width: "100%",
          }}
        >
          <LoadingIcon color="primary" />
        </Box>
      </Card>
    ) : (
      <Card
        sx={{
          position: "absolute",
          right: 0,
          width: "35vw",
          height: "90vh",
          backgroundColor: "rgb(55, 69, 87)",
          borderLeft: "1px solid aqua",
        }}
        {...props}
      >
        <Close
          cursor="pointer"
          onClick={() => context.showProfile(false)}
          fontSize="large"
          sx={{ color: "white", mt: 3, ml: 3 }}
        />

        <Box
          sx={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            spacing: 3,
            px: 3,
          }}
        >
          <AccountCircleIcon
            fontSize="large"
            sx={{ width: "160px", height: "160px" }}
          />

          {!loading && userData && (
            <Stack spacing={3}>
              <Box>
                <Typography color="white">Username:</Typography>
                <TextField
                  disabled
                  variant="filled"
                  sx={{
                    width: "100%",
                    backgroundColor: "#97a7c7",
                    "& .MuiFilledInput-underline": {
                      color: "black",
                    },
                    "& .MuiInputBase-root::after": {
                      borderBottom: "2px solid aqua",
                    },
                  }}
                  name="username"
                  value={userData.username}
                  onChange={onChange}
                />
              </Box>
              <Box>
                <Typography color="white">Email:</Typography>
                <TextField
                  required
                  variant="filled"
                  sx={{
                    width: "100%",
                    backgroundColor: "#97a7c7",
                    "& .MuiFilledInput-underline": {
                      color: "black",
                    },
                    "& .MuiInputBase-root::after": {
                      borderBottom: "2px solid aqua",
                    },
                  }}
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={onChange}
                />
              </Box>
              <Box>
                <Typography color="white">Password:</Typography>
                <TextField
                  required
                  variant="filled"
                  sx={{
                    width: "100%",
                    backgroundColor: "#97a7c7",
                    "& .MuiFilledInput-underline": {
                      color: "black",
                    },
                    "& .MuiInputBase-root::after": {
                      borderBottom: "2px solid aqua",
                    },
                  }}
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={onChange}
                />
              </Box>
              {errors.map(function(error: any) {
                return (
                  <Alert key={error.name} sx={{ my: "10px" }} severity="error">
                    {error.message}
                  </Alert>
                );
              })}
              <Button
                disabled={
                  data && userData.email === data.user.email && !pwdChanged
                }
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "aqua",
                  color: "black",
                }}
                onClick={onSubmit}
              >
                Save
              </Button>
            </Stack>
          )}
        </Box>
      </Card>
    ))
  );
};
