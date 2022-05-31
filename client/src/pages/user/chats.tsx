import { AuthContext } from "../../context/authContext";
import React, { useContext } from "react";

import { UserLayout } from "../../components/user-layout";

function Chats() {
  const { user, logout } = useContext(AuthContext);

  return <UserLayout sideComponent={<></>} />;
}

export default Chats;
