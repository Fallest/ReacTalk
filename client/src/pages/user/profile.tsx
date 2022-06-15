import React from "react";

import { UserLayout } from "../../components/user-layout";
import { ChatMessages } from "../../components/chat/chat-messages";
import { ErrorNotLogged } from "../../components/error-not-logged";

function Profile() {
  let token = localStorage.getItem("token");

  return token ? (
    <UserLayout sideComponent={<ChatMessages />} />
  ) : (
    <ErrorNotLogged />
  );
}

export default Profile;
