import * as React from "react";
import { useState } from "react";
import FriendList from "./FriendList";
import DataManager from "./DataManager";
/**
 * Componente raíz para renderizar la lista de amigos y
 * el componente para añadir amigos.
 * En este componente vamos a extraer la lista de amigos del usuario.
 *
 */
export default function FriendsPanel(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friends, setFriends] = useState(DataManager.getFriends(props.user));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState({
    name: props.user,
    friends: friends,
  });

  return (
    <div className="Friend-list-section">
      <h2>
        <sup>React</sup>
        Talk
      </h2>
      <FriendList user={userData} friendSetter={props.friendSetter} />
    </div>
  );
}
