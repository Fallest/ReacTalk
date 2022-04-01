import * as React from "react";
import { useState } from "react";
import MessageHolder from "./MessageHolder";
import MessageSender from "./MessageSender";

export default function ChatPanel(props: any) {
  const [messages, setMessages] = useState();

  return (
    <div className="Chat-panel">
      <MessageHolder
        user={props.user}
        friend={props.friend}
        messages={messages}
      />
      <MessageSender user={props.user} addMessage={setMessages} />
    </div>
  );
}
