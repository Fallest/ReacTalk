import * as React from "react";
import { useState } from "react";

/**
 * Envía los mensajes a ChatPanel.
 * @param props
 * @returns
 */
export default function MessageSender(props: any) {
  const [msgText, setMsgText] = useState("");

  const handleMsgChange = (event: any) => {
    setMsgText(event.trigger.value);
  };

  function handleSubmit(event: any) {
    if (msgText !== "" && msgText.trim() !== "") {
      props.addMessage((prevMsgs: any) => [
        ...prevMsgs,
        { sender: props.user, text: msgText },
      ]);
    }
  }

  return (
    <div className="Message-sender">
      <form onSubmit={handleSubmit}>
        <input
          className="msg-box"
          onChange={handleMsgChange}
          value={msgText}
          type="text"
        />
        <input className="send-button" type="submit" value="&nbsp;>&nbsp;" />
      </form>
    </div>
  );
}
