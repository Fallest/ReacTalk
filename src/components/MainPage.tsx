import * as React from "react";
import { useEffect, useState } from "react";
import Conversations from "./Conversations";
import LoginForm from "./LoginForm";
import "../styles/MainPage.css";

/**
 * Componente raíz para la página.
 * Aquí se renderizarán tanto el inicio de sesión como el chat.
 */
function MainPage(props: any) {
  // Estado de autenticación
  const [userAuth, setUserAuth] = useState(false);
  const [userName, setUserName] = useState();

  useEffect(() => {
    userAuth ? setUserName(userName) : setUserName(undefined);
  }, [userAuth, userName]);

  if (userAuth) {
    return (
      <div className="Conversations-page">
        <Conversations user={userName} authSetter={setUserAuth} />
      </div>
    );
  }

  return (
    <div className="Login-form">
      <LoginForm authUpdater={setUserAuth} userSetter={setUserName} />
    </div>
  );
}

export default MainPage;
