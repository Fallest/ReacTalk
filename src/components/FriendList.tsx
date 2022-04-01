import * as React from "react";
import { useState } from "react";

/**
 * Muestra la lista de amigos.
 * @param props
 * @returns
 */

export default function FriendList(props: any) {
  const handleClick = (event: any) => {
    props.friendSetter(event.target.id);
  };

  return (
    <div className="Friend-list">
      {props.user.friends.map((friend: any) => {
        if (friend.status === "online") {
          return (
            <li
              className="online"
              key={friend.name}
              id={friend.name}
              onClick={(e) => handleClick(e)}
            >
              {friend.name}
            </li>
          );
        }
        return (
          <li className="offline" key={friend.name}>
            {friend.name}
          </li>
        );
      })}
    </div>
  );
}
