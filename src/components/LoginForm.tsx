import * as React from "react";
import { useState } from "react";
import DataManager from "./DataManager";
/**
 * Componente para el formulario de inicio de sesión.
 * Está compuesto de dos áreas de texto y un botón.
 * Cuando se presione el botón se realizará un intento de inicio de sesión:
 *  -Se recogerán los datos de los campos de texto.
 *  -Se contrastarán con los usuarios guardados.
 *      >Si el usuario no existe: Error.
 *      >Si el usuario existe pero está online: Error:
 *      >Si el usuario existe y está offline: Iniciar sesión.
 */
export default function LoginForm(props: any) {
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");

  function tryLogin() {
    // Comparamos los datos introducidos con los datos en el archivo
    if (DataManager.checkCredentials(userName.toLowerCase(), pwd)) {
      // Inicio de sesión correcto:
      // Actualizamos el valor de userAuth y cambiamos el estado del usuario a "online"
      props.userSetter(userName);
      props.authUpdater(true);

      DataManager.logIn(userName);
    }
  }

  const performValidation = () => {
    return userName.length > 0 && pwd.length > 0;
  };

  const handleUserChange = (event: any) => {
    setUserName(event.target.value);
  };

  const handlePwdChange = (event: any) => {
    setPwd(event.target.value);
  };

  return (
    <div className="Login-form">
      <h1>
        <sup>React</sup>Talk
      </h1>
      <form onSubmit={tryLogin}>
        <label>User </label>
        <input type="text" onChange={handleUserChange} value={userName} />
        <br />
        <label>Password </label>
        <input type="password" onChange={handlePwdChange} value={pwd} />
        <br />
        <input
          className="login-button"
          type="submit"
          value="Log in"
          disabled={!performValidation()}
        />
      </form>
    </div>
  );
}
