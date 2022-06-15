import React, { FC, useContext, useRef, useState } from "react";

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
  Button,
} from "@mui/material";
import "../animations.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/authContext";
import { Box } from "@mui/system";
import { Send as SendIcon } from "@mui/icons-material";
import { LinearProgress as LoadingIcon } from "@mui/material";
import { ProfileInfo } from "../profile/profile-info";

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
  const [message, setMessage] = useState("");
  const [showGoToBottom, setShowGoToBottom] = useState(false);
  const tableRef = useRef<HTMLTableElement>(null);

  // To query for messages
  const { loading: loadingMsgs, data: msgData, refetch } = useQuery(
    GET_MESSAGES,
    {
      onCompleted(data) {
        setTimeout(
          () => user.currentChat && tableRef.current && scrollToBottom(),
          200
        );
      },
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
        content: message,
      },
    },
  });

  const onMessageSubmit = (event) => {
    // Send the message, refetch to get the new data, clean the send message form and scroll down.
    if (message !== "") {
      sendMessage();
      refetch();
      setMessage("");
    }
  };

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const scrollToTop = () => {
    let lastTr = tableRef.current.rows[0];
    lastTr.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const scrollToBottom = () => {
    let lastTr = tableRef.current.rows[tableRef.current.rows.length - 1];
    lastTr.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const isAtBottom = () => {
    if (tableRef.current) {
      let lastTr = tableRef.current.rows[tableRef.current.rows.length - 1];
      const top = lastTr.getBoundingClientRect().top;
      setShowGoToBottom(
        !(
          top + lastTr.offsetHeight >= 0 &&
          top - lastTr.offsetHeight <= window.innerHeight
        )
      );
      return;
    }
    setShowGoToBottom(false);
  };

  return loadingMsgs ? (
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
        width: "75vw",
        height: "90vh",
        backgroundColor: "inherit",
      }}
      {...props}
    >
      <ProfileInfo visible={user.inProfile} />

      {errors.map(function(error: any) {
        return (
          <Alert key={error.name} sx={{ my: "10px" }} severity="error">
            {error.message}
          </Alert>
        );
      })}

      {/**
       * Table with the chat messages from the server
       */}

      <TableContainer
        sx={{
          width: "100%",
          height: "85%",
        }}
        onScroll={isAtBottom}
      >
        {user.currentChat && msgData.getMessages.length !== 0 && (
          <Table ref={tableRef} sx={{ overflowY: "scroll" }}>
            <TableBody>
              {msgData.getMessages.map((msg: any) => {
                return (
                  <TableRow
                    key={msg.createdAt}
                    sx={{ display: "flex", flexFlow: "column" }}
                  >
                    <TableCell
                      key={msg.sender}
                      sx={{ maxWidth: "75vw", overflowWrap: "anywhere" }}
                    >
                      <Typography
                        className="load-message-sender"
                        align="left"
                        fontSize="20px"
                        variant="button"
                      >
                        {msg.sender}
                      </Typography>
                      <Typography
                        className="load-message-content"
                        align="left"
                        fontSize={20}
                        variant="body1"
                      >
                        {msg.content}
                      </Typography>
                      <Typography
                        className="load-message-timestamp"
                        align="right"
                        variant="caption"
                      >
                        {msg.createdAt}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/**
       *  Box for the message sender form.
       */
      user.currentChat && (
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            heigth: "15%",
            width: "100%",
            borderTop: "1px solid aqua",
          }}
        >
          <TextField
            placeholder="Send a message..."
            variant="filled"
            disabled={!user.currentChat}
            value={message}
            onChange={onMessageChange}
            sx={{
              width: "100%",
              backgroundColor: "#606d87",
              p: 3,
              "& .MuiFilledInput-underline": {
                color: "white",
              },
              "& .MuiInputBase-root::after": {
                borderBottom: "2px solid aqua",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SendIcon
                    onClick={user.currentChat && onMessageSubmit}
                    cursor="pointer"
                    className="button"
                    fontSize="large"
                    color="action"
                    sx={{
                      border: "1px solid aqua",
                      p: 1,
                      borderRadius: "25% 25% 25% 25%",
                      boxShadow: "-20px 0 10px aqua",
                    }}
                  />
                </InputAdornment>
              ),
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && onMessageSubmit(e);
            }}
          />
        </Box>
      )}

      {/**
       * "Go to top" floating button.
       */}
      {user.currentChat && msgData.getMessages.length !== 0 && (
        <Button
          sx={{
            position: "fixed",
            right: "5%",
            bottom: "13%",
            borderRadius: "50% 50% 0 0",
            backgroundColor: "darkcyan",
            cursor: "pointer",
          }}
          className="button"
          color="inherit"
          title="Go to top"
          onClick={scrollToTop}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </Button>
      )}

      {/**
       * "Go to bottom" floating button.
       */}
      {user.currentChat &&
        msgData.getMessages.length !== 0 &&
        tableRef.current &&
        showGoToBottom && (
          <Button
            sx={{
              position: "fixed",
              right: "5%",
              bottom: "84%",
              borderRadius: "0 0 50% 50%",
              backgroundColor: "darkcyan",
              cursor: "pointer",
            }}
            className="button"
            color="inherit"
            title="Go to bottom"
            onClick={scrollToBottom}
          >
            <KeyboardArrowDownIcon fontSize="large" />
          </Button>
        )}
    </Card>
  );
};
