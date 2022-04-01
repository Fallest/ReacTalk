import * as React from "react";

export default function MessageHolder(props: any) {
  let msgs: Array<JSX.Element> = [];

  // Por cada mensaje que haya se crea una ROW de la tabla de mensajes.
  // La variables messages contiene todas estas rows
  if (props.friend === "Welcome to ReacTalk") {
    msgs = [
      <div className="friend-message">Click on any friend</div>,
      <div className="user-message">And begin chatting!</div>,
    ];
  } else if (props.messages !== undefined) {
    // eslint-disable-next-line array-callback-return
    props.messages.map((msg: { from: string; to: string; text: string }) => {
      /* Tratamiento de mensajes que envía el usuario:
        -Hay que comprobar que el amigo al que van dirigidos estos mensajes es el actual.
        -Y hay que comprobar que el mensaje viene del usuario.
      */
      if (
        msg.to.toLowerCase() === props.friend.toLowerCase() &&
        msg.from.toLowerCase() === props.user.toLowerCase()
      ) {
        msgs.push(<div className="user-message">{msg.text}</div>);
      } else if (
        msg.to.toLowerCase() === props.user.toLowerCase() &&
        msg.from.toLowerCase() === props.friend.toLowerCase()
      ) {
        /* Tratamiento de mensajes que son enviados al usuario:
        -Hay que comprobar que van dirigidos al usuario.
        -Hay que comprobar que provienen del amigo actual.
      */
        msgs.push(<div className="friend-message">{msg.text}</div>);
      }
    });
  }
  return (
    <div className="Message-holder">
      <div key={props.friend} className="chat-friend-name">
        <p>{props.friend}</p>
      </div>
      <div className="Messages-box">
        {msgs.length !== 0 ? (
          msgs.map((msg) => {
            return msg;
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
