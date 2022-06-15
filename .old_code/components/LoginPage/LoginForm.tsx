import Button from "../../../client/src/components/button";
import "./LoginForm.css";
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
/*
export default function LoginForm(props: any) {
  const [userName, setUserName] = useState("");
  const [pwd, setPwd] = useState("");
  const [search, setSearch] = useState(false);

  React.useEffect(() => {
    async function tryLogin() {
      // Comparamos los datos introducidos con los datos en el archivo
      console.log("Trying to login...");
      await DataManager.checkCredentials(userName.toLowerCase(), pwd).then(
        (response) => {
          if (response) {
            DataManager.logIn(userName);
            props.userSetter(userName);
            props.authUpdater(true);
          }
        }
      );
    }
    if (search) {
      tryLogin();
    }
  }, [search]);

  const handleUserChange = (event: any) => {
    setUserName(event.target.value);
  };

  const handlePwdChange = (event: any) => {
    setPwd(event.target.value);
  };

  return (
    <div className="Login">
      <h1>
        <sup>React</sup>Talk
      </h1>
      <div className="Login-form">
        <TextInput
          label="User"
          type="text"
          actionOnChange={handleUserChange}
          actionOnSubmit={() => setSearch(true)}
          useValue={userName}
          cssClass=""
        />
        <TextInput
          label="Password"
          type="password"
          actionOnChange={handlePwdChange}
          actionOnSubmit={() => setSearch(true)}
          useValue={pwd}
          cssClass=""
        />
        <Button
          action={() => setSearch(true)}
          text="Log In"
          cssClass="login-button"
        />
      </div>
    </div>
  );
}
*/
