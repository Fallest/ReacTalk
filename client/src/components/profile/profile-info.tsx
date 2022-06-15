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
import { SearchOutlined as SearchIcon } from "@mui/icons-material";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/authContext";
import { chatSearch } from "../../utils/chat-search";

export const GET_CHATS = gql`
  query getChats($userId: ID!) {
    getChats(userId: $userId) {
      name
      users
      createdAt
    }
  }
`;

export const ProfileInfo: FC = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const { loading, error, data, refetch } = useQuery(GET_CHATS, {
    onError({ graphQLErrors }: any) {
      setErrors(graphQLErrors);
    },
    variables: { userId: context.user.user_id },
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
    setSelectedChat(chat_id);
    chat_id === "No chats found." && setSelectedChat("");
  };
  //------------------------------------

  return loading ? (
    <Typography m={3} color="white">
      Loading chats...
    </Typography>
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
        <Table>
          <TableBody>
            {getFilteredChats().map((chat: any) => {
              const isChatSelected = selectedChat === chat.name;
              return (
                <TableRow key={chat.name} selected={isChatSelected}>
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
