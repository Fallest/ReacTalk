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
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utils/hooks";
import { Box } from "@mui/system";
import { Send as SendIcon } from "@mui/icons-material";

/**
 * Mutation to get all the messages from a chat.
 */
export const GET_MESSAGES = gql`
  query getMessages($chatName: String) {
    getMessages(chatName: $chatName) {
      sender
      content
      createdAt
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($sendMessageInput: SendMessageInput) {
    sendMessage(sendMessageInput: $sendMessageInput) {
      toChat
      sender
      content
      createdAt
    }
  }
`;

export const ChatMessages: FC = (props) => {
  const { user } = useContext(AuthContext);
  const [errors, setErrors] = useState([]);
  const [reload, setReload] = useState<boolean>(false);

  /**
   * Using the useForm hook allows to update TextInput's values with cleaner code.
   */
  const sendMsgCallback = () => {
    sendMessage();
  };
  const { onChange, onSubmit, values } = useForm(sendMsgCallback, {
    content: "",
  });

  // To query for messages
  const { loading: loadingMsgs, data: msgData, refetch } = useQuery(
    GET_MESSAGES,
    {
      onError({ graphQLErrors }: any) {
        setErrors(graphQLErrors);
      },
      variables: { chatName: user.currentChat },
      pollInterval: 1000,
    }
  );

  // To send messages to the current chat
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError({ graphQLErrors }: any) {
      setErrors(graphQLErrors);
    },
    variables: {
      sendMessageInput: {
        toChat: user.currentChat,
        sender: user.username,
        content: values.content,
      },
    },
  });

  // To update the messages whenever the context changes.
  useEffect(() => {
    setErrors([]);
  }, [user.currentChat]);

  return loadingMsgs ? (
    <Typography m={3} color="white">
      Loading messages...
    </Typography>
  ) : (
    <Card
      sx={{
        width: "100%",
        maxHeight: "840px",
        backgroundColor: "inherit",
        display: "flex",
        flexFlow: "column",
      }}
      {...props}
    >
      {errors.map(function(error: any) {
        return (
          <Alert key={error.name} sx={{ my: "10px" }} severity="error">
            {error.message}
          </Alert>
        );
      })}

      <TableContainer
        sx={{
          mb: "auto",
          maxHeight: "840px",
          overflowY: "scroll",
        }}
      >
        <Table>
          <TableBody>
            {msgData.getMessages.map((msg: any) => {
              return (
                <TableRow key={msg.createdAt}>
                  <TableCell
                    key={msg.sender}
                    sx={{
                      display: "flex",
                      flexFlow: "column",
                    }}
                  >
                    <Typography
                      align="left"
                      fontSize="20px"
                      variant="button"
                      color="aqua"
                    >
                      {msg.sender}
                    </Typography>
                    <Typography
                      align="left"
                      fontSize={20}
                      variant="body1"
                      color="white"
                    >
                      {msg.content}
                    </Typography>
                    <Typography align="right" variant="caption" color="gray">
                      {msg.createdAt}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/*
          Box for the send message form.
        */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <TextField
          placeholder="Send a message..."
          disabled={!user.currentChat}
          name="content"
          variant="outlined"
          onChange={onChange}
          sx={{
            backgroundColor: "#606d87",
            p: 3,
            width: "1400px",
            position: "fixed",
            bottom: 0,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendIcon onClick={onSubmit} fontSize="large" />
              </InputAdornment>
            ),
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit(e);
              refetch();
            }
          }}
        />
      </Box>
    </Card>
  );
};
