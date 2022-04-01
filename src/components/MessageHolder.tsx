import * as React from "react";

export default function MessageHolder(props: any) {
  let msgs: Array<JSX.Element> = [];

  // Por cada mensaje que haya se crea una ROW de la tabla de mensajes.
  // La variables messages contiene todas estas rows
  if (props.friend === "Bienvenido a ReacTalk") {
    msgs = [
      <tr>
        <td></td>
        <td className="user-message">Haz click en algún amigo conectado</td>
      </tr>,
      <tr>
        <td></td>
        <td className="user-message">Y comienza a hablar!</td>
      </tr>,
    ];
  } else if (props.messages !== undefined) {
    // eslint-disable-next-line array-callback-return
    props.messages.map((msg: { sender: string; text: string }) => {
      if (msg.sender.toLowerCase() === props.user.toLowerCase()) {
        msgs.push(
          <tr>
            <td></td>
            <td className="user-message">{msg.text}</td>
          </tr>
        );
      } else {
        msgs.push(
          <tr>
            <td className="friend-message">{msg.text}</td>
            <td></td>
          </tr>
        );
      }
    });
  }
  return (
    <div className="Message-holder">
      <table>
        <thead>
          <tr>
            <th className="chat-friend-name" colSpan={2}>
              {props.friend}
            </th>
          </tr>
        </thead>
        <tbody>
          {msgs.length !== 0 ? (
            msgs.map((msg) => {
              return msg;
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
}
