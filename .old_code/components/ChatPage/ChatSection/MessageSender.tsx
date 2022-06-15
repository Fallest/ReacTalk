import * as React from "react";
import { useState } from "react";
import DataManager, { IMessage } from "../../../DataManager";
import Button from "../../Common/Button";
import TextInput from "../../Common/TextInput";

/**
 * Envía los mensajes a ChatPanel.
 * @param props
 * @returns
 */
export default function MessageSender(props: any) {
  const [msgText, setMsgText] = useState("");

  async function handleSubmit(event: any) {
    if (
      msgText !== "" &&
      msgText.trim() !== "" &&
      props.friend !== "Welcome to ReacTalk"
    ) {
      // Post message in JSON.
      let newMsg: IMessage = {
        id: props.prevMsgCount + 1,
        from: props.user,
        to: props.friend,
        text: msgText,
      };

      await DataManager.postMessage(newMsg).then(() =>
        props.setMsgCount(props.prevMsgCount + 1)
      );
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
