import * as React from "react";
import { useEffect, useState } from "react";
import DataManager from "../../../DataManager";
import { IMessage } from "../../../DataManager";

export default function MessageHolder(props: any) {
  const [jsxMessages, setJsxMessages] = useState([<></>]);

  useEffect(() => {
    async function renderMessages() {
      let res: Array<JSX.Element> = Array(0);
      await DataManager.fetchMessages(props.user, props.friend).then(
        (msgs: Array<IMessage>) => {
          if (msgs.length !== 0) {
            msgs.map((msg: IMessage) => {
              if (msg.from.toLowerCase() === props.user.toLowerCase()) {
                res.push(
                  <div key={msg.id} className="user-message">
                    {msg.text}
                  </div>
                );
              } else {
                res.push(
                  <div key={msg.id} className="friend-message">
                    {msg.text}
                  </div>
                );
              }
            });
          }
        }
      );
      setJsxMessages(res);
      props.setMsgCount(res.length);
    }
    renderMessages();
  }, [props.msgCount, props.friend]);

  if (props.friend === "Welcome to ReacTalk") {
    return (
      <div className="Message-holder">
        <div key={props.friend} className="chat-friend-name">
          <p>{props.friend}</p>
        </div>
        <div className="Messages-box">
          <div className="friend-message">Click on any friend</div>
          <div className="user-message">And begin chatting!</div>
        </div>
      </div>
    );
  }
  return (
    <div className="Message-holder">
      <div key={props.friend} className="chat-friend-name">
        <p>{props.friend}</p>
      </div>
      <div className="Messages-box">
        {jsxMessages.length !== 0 ? (
          jsxMessages.map((msg) => {
            return msg;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
