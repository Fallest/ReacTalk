import React, { FC, useContext, useState } from "react";

import { Close } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FormikConsumer, useFormik } from "formik";
import { CircularProgress as LoadingIcon } from "@mui/material";
import * as Yup from "yup";
import gql from "graphql-tag";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery } from "@apollo/react-hooks";

type DialogProps = {
  visible: boolean;
  visibilityHandler: Function;
  updater: Function;
  onConfirm: Function;
};

export const DeletionDialog: FC<DialogProps> = (props) => {
  const { visible, visibilityHandler, updater, onConfirm } = props;

  const handleOnClose = () => {
    visibilityHandler(false);
    updater();
  };

  return (
    <Dialog open={visible} onClose={handleOnClose}>
      <DialogContent>
        <DialogContentText>
          Do you really want to leave this chat?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOnClose} variant="contained" autoFocus>
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            handleOnClose();
          }}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const GET_USERS = gql`
  query getUsers($userName: String) {
    getUsers(userName: $userName)
  }
`;

export const CREATE_CHAT = gql`
  mutation createChat($createChatInput: CreateChatInput) {
    createChat(createChatInput: $createChatInput) {
      name
      users
      createdAt
    }
  }
`;

export const NewChatDialog: FC<DialogProps> = (props) => {
  const { visible, visibilityHandler, updater } = props;
  const { user } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      usersArray: [""],
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(255)
        .required("Name is required"),
      usersString: Yup.string().max(255),
      usersArray: Yup.array().of(Yup.string().max(255)),
    }),
    onSubmit: async (_values, helpers): Promise<void> => {
      try {
        // Here, use the mutation.
        createChat();
        updater();
        handleOnClose();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  // Query to get the user that the current user knows.
  const { loading: loadingQuery, error, data } = useQuery(GET_USERS, {
    onCompleted(data) {
      setUserList(data.getUsers);
    },
    variables: { userName: user.username },
  });

  // Mutation to create a new chat
  const [createChat, { loading: loadingCreate }] = useMutation(CREATE_CHAT, {
    variables: {
      createChatInput: {
        name: formik.values.name,
        users: formik.values.usersArray,
      },
    },
  });

  const handleOnClose = () => {
    visibilityHandler(false);
  };

  // User selection management
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const allUsersSelected = selectedUsers.length === userList.length;
  const someUsersSelected =
    selectedUsers.length > 0 && selectedUsers.length < userList.length;

  const handleSelectAllUsers = (event: any): void => {
    setSelectedUsers(
      event.target.checked ? userList.map((user: any) => user) : []
    );
  };

  const handleSelectOneUser = (user: string): void => {
    if (!selectedUsers.includes(user)) {
      setSelectedUsers((prevSelected) => [...prevSelected, user]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== user)
      );
    }
  };
  //------------------------------------

  return loadingCreate ? (
    <Box width="100px">
      <LoadingIcon size="large" />
    </Box>
  ) : (
    <>
      <Dialog
        open={visible}
        onClose={handleOnClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#3c4861",
            border: "2px solid aqua",
            borderRadius: "20px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "aqua",
          }}
          variant="h5"
        >
          New chat
          <Close onClick={handleOnClose} color="action" />
        </DialogTitle>
        <DialogContent dividers sx={{ mb: 2, maxHeight: "auto" }}>
          <TextField
            required
            label="Name"
            name="name"
            variant="filled"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{
              mt: 2,
              backgroundColor: "#606d87",
              "& .MuiFormLabel-root-MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputBase-root::after": {
                borderBottom: "2px solid aqua",
              },
              "& .MuiFormHelperText-root.Mui-error": {
                backgroundColor: "#3c4861",
                m: 0,
                pt: "3px",
                pr: "14px",
                pl: "14px",
              },
            }}
          />
          {/**
           * Here goes a table with all known users.
           */}
          <TableContainer>
            <Table
              sx={{ maxHeight: "400px", overflowY: "scroll", color: "white" }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Checkbox
                      checked={allUsersSelected}
                      indeterminate={someUsersSelected}
                      onChange={handleSelectAllUsers}
                      sx={{
                        color: "darkturquoise",
                        "& .MuiSvgIcon-root": {
                          color: "aqua",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ fontWeight: "bold", color: "white" }}>
                      Known people
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {userList.length !== 0 &&
                  userList.map((user: any) => {
                    const isUserSelected = selectedUsers.includes(user);
                    return (
                      <TableRow key={user} selected={isUserSelected}>
                        <TableCell padding="none">
                          <Checkbox
                            checked={isUserSelected}
                            onChange={(_event) => handleSelectOneUser(user)}
                            value={isUserSelected}
                            sx={{
                              color: "darkturquoise",
                              "& .MuiSvgIcon-root": {
                                color: "aqua",
                              },
                            }}
                          />
                        </TableCell>

                        <TableCell padding="none">
                          <Typography
                            align="center"
                            variant="subtitle2"
                            color="white"
                          >
                            {user}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions
          sx={{
            mb: 3,
            mx: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={handleOnClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              formik.setFieldValue("usersArray", selectedUsers);
              formik.handleSubmit();
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
