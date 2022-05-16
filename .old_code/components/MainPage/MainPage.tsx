import * as React from "react";
import { useEffect, useState } from "react";
import Conversations from "../ChatPage/Conversations";
import LoginForm from "../LoginPage/LoginForm";

/**
 * Root component of the app.
 * Both sub-main components will be rendered here (Chat and Login).
 */
function MainPage(props: any) {
  // Auth and username states.
  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState();

  // If the user has been authenticated, store their name in userName state.
  useEffect(() => {
    userAuth ? setUserName(userName) : setUserName(undefined);
  }, [userAuth]);

  // If the user is authenticated, render the chat.
  if (userAuth) {
    return <Conversations user={userName} authSetter={setUserAuth} />;
  }

  // Else, render the login.
  return <LoginForm authUpdater={setUserAuth} userSetter={setUserName} />;
}

export default MainPage;
