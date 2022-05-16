import * as React from "react";
import FriendsPanel from "./FriendListSection/FriendsPanel";
import ChatPanel from "./ChatSection/ChatPanel";
import { useState } from "react";
import "./Conversations.css";

/**
 * Componente raíz para mostrar todos los componentes una vez iniciada la sesión.
 * Va a tener dos elementos principales, el panel de amigos y el chat.
 * En el panel de amigos va a haber dos secciones, una para añadir amigos y otra para
 * ver los amigos añadidos.
 */

function Conversations(props: any) {
  const [currentFriend, setCurrentFriend] = useState("Welcome to ReacTalk");

  return (
    <div className="Conversations-page">
      <FriendsPanel
        user={props.user}
        authSetter={props.authSetter}
        friendSetter={setCurrentFriend}
      />
      <ChatPanel user={props.user} friend={currentFriend} />
    </div>
  );
}

export default Conversations;
