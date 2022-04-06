import * as React from "react";
import { useState } from "react";
import Button from "../../Common/Button";
import TextInput from "../../Common/TextInput";

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
      <TextInput
        label=""
        type="text"
        actionOnChange={(e: any) => setMsgText(e.target.value)}
        actionOnSubmit={handleSubmit}
        useValue={msgText}
        cssClass="msg-box"
      />
      <Button action={handleSubmit} cssClass="send-button" text=">" />
    </div>
  );
}
