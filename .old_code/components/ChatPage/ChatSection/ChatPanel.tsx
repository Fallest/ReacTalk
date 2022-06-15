import * as React from "react";
import { useState } from "react";
import MessageHolder from "./MessageHolder";
import MessageSender from "./MessageSender";
import "./Chat.css";

export default function ChatPanel(props: any) {
  const [msgCount, setMsgCount] = useState(0);

  return (
    <div className="Chat-panel">
      <MessageHolder
        user={props.user}
        friend={props.friend}
        setMsgCount={setMsgCount}
        msgCount={msgCount}
      />
      <MessageSender
        user={props.user}
        friend={props.friend}
        prevMsgCount={msgCount}
        setMsgCount={setMsgCount}
      />
    </div>
  );
}
