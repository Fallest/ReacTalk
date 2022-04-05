import * as React from "react";
import { useState } from "react";
import MessageHolder from "./MessageHolder";
import MessageSender from "./MessageSender";
import "./Chat.css";

export default function ChatPanel(props: any) {
  const [messages, setMessages] = useState();

  return (
    <div className="Chat-panel">
      <MessageHolder
        user={props.user}
        friend={props.friend}
        messages={messages}
      />
      <MessageSender
        user={props.user}
        friend={props.friend}
        prevMsgs={messages}
        addMessage={setMessages}
      />
    </div>
  );
}
