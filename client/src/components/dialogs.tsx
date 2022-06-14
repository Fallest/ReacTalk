import { FC, useContext, useState } from "react";

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
import { useFormik } from "formik";
import * as Yup from "yup";
import gql from "graphql-tag";
import { AuthContext } from "../context/authContext";
import { useQuery } from "@apollo/react-hooks";

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
    getUsers(userName: $userName) {
      userName
    }
  }
`;

export const NewChatDialog: FC<DialogProps> = (props) => {
  // onConfirm prop here is used to DELETE the tag in edition.
  const { visible, visibilityHandler, updater, onConfirm } = props;

  const context = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { userName: context.user.username },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      usersArray: data,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(255)
        .required("Name is required"),
      usersString: Yup.string().max(255),
      usersArray: Yup.array().of(Yup.string().max(255)),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        onConfirm({ name: values.name, users: values.usersArray });
        handleOnClose();
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const handleOnClose = () => {
    visibilityHandler(false);
    updater();
  };

  // User selection management
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const allUsersSelected = selectedUsers.length === data.getUsers.length;
  const someUsersSelected =
    selectedUsers.length > 0 && selectedUsers.length < data.getUsers.length;

  const handleSelectAllUsers = (event: any): void => {
    setSelectedUsers(
      event.target.checked ? data.getUsers.map((user: any) => user) : []
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

  return (
    <>
      <Dialog open={visible} onClose={handleOnClose}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <Typography variant="h5"> Tag details </Typography>
          <Close onClick={handleOnClose} />
        </DialogTitle>
        <DialogContent dividers sx={{ mb: 2, maxHeight: "auto" }}>
          <TextField
            required
            label="Name"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            defaultValue={formik.initialValues.name}
            value={formik.values.name}
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ mt: 2 }}
          />
          {/**
           * Here goes a table with all known users.
           */}
          <TableContainer>
            <Table sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow>
                  <TableCell width={100}>
                    <Checkbox
                      checked={allUsersSelected}
                      indeterminate={someUsersSelected}
                      onChange={handleSelectAllUsers}
                    />
                  </TableCell>
                  <TableCell align="center">Known people</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.getUsers.map((user: any) => {
                  const isUserSelected = selectedUsers.includes(user);
                  return (
                    <TableRow key={user.username} selected={isUserSelected}>
                      <TableCell sx={{ display: "flex", flexFlow: "column" }}>
                        <Checkbox
                          checked={isUserSelected}
                          onChange={(_event) => handleSelectOneUser(user)}
                          value={isUserSelected}
                        />
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            py: 1,
                            backgroundColor: "black",
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            align="center"
                            color="white"
                            variant="subtitle2"
                          >
                            {user.username}
                          </Typography>
                        </Box>
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
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
