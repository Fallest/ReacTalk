import React, { FC, useContext, useEffect, useState } from "react";

import {
  Card,
  InputAdornment,
  Table,
  TableBody,
  Typography,
  TextField,
  TableContainer,
  Alert,
  TableRow,
  TableCell,
} from "@mui/material";
import { AddComment, SearchOutlined as SearchIcon } from "@mui/icons-material";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/authContext";
import "../animations.css";
import { chatSearch } from "../../utils/chat-search";
import { NewChatDialog } from "./dialogs";
import { LinearProgress as LoadingIcon } from "@mui/material";
import { Box } from "@mui/system";

export const GET_CHATS = gql`
  query getChats($userName: String) {
    getChats(userName: $userName) {
      name
      users
      createdAt
    }
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

export const ChatsTable: FC = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  // To get all user's chats.
  const { loading, error, data } = useQuery(GET_CHATS, {
    onError({ graphQLErrors }: any) {
      setErrors(graphQLErrors);
    },
    variables: { userName: context.user.username },
  });

  // To create a new chat
  const [newChatData, setNewChatData] = useState<{
    name: String;
    users: String[];
  }>({ name: "", users: [] });
  const [createChat] = useMutation(CREATE_CHAT, {
    variables: {
      createChatInput: {
        users: newChatData.users,
        name: newChatData.name,
      },
    },
  });

  // Filtering state management
  const [searchFor, setSearchFor] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchFor(event.target.value);
  };
  // -----------------------------

  // To filter chats.
  const getFilteredChats = () => {
    let filteredChats: Array<any> =
      data &&
      data.getChats.filter((chat: any) => {
        return searchFor === "" || chatSearch(chat.name, searchFor);
      });

    if (!filteredChats || filteredChats.length === 0) {
      return [{ name: "No chats found." }];
    }
    return filteredChats;
  };

  //------------------------------------

  // Tag selection management
  const [selectedChat, setSelectedChat] = useState("");

  const handleSelectChat = (chat_id: string): void => {
    context.setCurrentChat(chat_id);
    console.log(chat_id);
    setSelectedChat(chat_id);
    chat_id === "No chats found." && setSelectedChat("");
  };
  //------------------------------------

  const [newChatDialogVisibility, setNewChatDialogVisibility] = useState(false);

  return loading ? (
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
        width: "100%",
        backgroundColor: "inherit",
      }}
      {...props}
    >
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="large" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <AddComment
                onClick={() => setNewChatDialogVisibility(true)}
                fontSize="large"
              />
            </InputAdornment>
          ),
        }}
        type="search"
        variant="outlined"
        onChange={handleSearchChange}
        fullWidth
        sx={{ backgroundColor: "#606d87" }}
        size="medium"
      />
      {errors.map(function(error: any) {
        return (
          <Alert key={error.name} sx={{ my: "10px" }} severity="error">
            {error.message}
          </Alert>
        );
      })}

      <TableContainer>
        <Table
          sx={{
            overflow: "scroll",
          }}
        >
          <TableBody>
            {getFilteredChats().map((chat: any) => {
              const isChatSelected = selectedChat === chat.name;
              return (
                <TableRow
                  key={chat.name}
                  selected={isChatSelected}
                  className="chat"
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell
                    key={chat.name}
                    onClick={() => handleSelectChat(chat.name)}
                  >
                    <Typography
                      color={isChatSelected ? "aqua" : "lightgray"}
                      align="left"
                      variant="h5"
                    >
                      {chat.name}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
