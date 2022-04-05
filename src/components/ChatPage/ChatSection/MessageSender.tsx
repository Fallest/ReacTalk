import * as React from "react";
import { useState } from "react";

/**
 * Envía los mensajes a ChatPanel.
 * @param props
 * @returns
 */
export default function MessageSender(props: any) {
  const [msgText, setMsgText] = useState("");

  function handleSubmit(event: any) {
    if (
      msgText !== "" &&
      msgText.trim() !== "" &&
      props.friend !== "Welcome to ReacTalk"
    ) {
      props.prevMsgs !== undefined
        ? props.addMessage([
            ...props.prevMsgs,
            { from: props.user, to: props.friend, text: msgText },
          ])
        : props.addMessage([
            { from: props.user, to: props.friend, text: msgText },
          ]);
    }
    setMsgText("");
  }

  return (
    <div className="Message-sender">
      <input
        type="text"
        className="msg-box"
        value={msgText}
        onChange={(e) => setMsgText(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? handleSubmit(e) : undefined)}
      />
      <input
        type="submit"
        className="send-button"
        onClick={handleSubmit}
        value=">"
      ></input>
    </div>
  );
}
