import * as React from "react";
import { useState } from "react";

/**
 * Muestra la lista de amigos.
 * @param props
 * @returns
 */

export default function FriendList(props: any) {
  const [friends, setFriends] = useState([<></>]);
  const handleClick = (event: any) => {
    props.friendSetter(event.target.id);
  };

  React.useEffect(() => {
    async function renderFriends() {
      let res: Array<JSX.Element> = new Array(0);
      await props.user.friends.then(
        (data: Array<{ name: string; status: string }>) => {
          data.map((friend: { name: string; status: string }) => {
            if (friend.status === "online") {
              res.push(
                <li
                  className="online"
                  key={friend.name}
                  id={friend.name}
                  onClick={(e) => handleClick(e)}
                >
                  {friend.name}
                </li>
              );
            } else {
              res.push(
                <li className="offline" key={friend.name}>
                  {friend.name}
                </li>
              );
            }
          });
        }
      );
      setFriends(res);
    }
    renderFriends();
  }, [props.user]);

  return <div className="Friend-list">{friends}</div>;
}
