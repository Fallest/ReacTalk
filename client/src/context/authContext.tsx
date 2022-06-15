import jwtDecode from "jwt-decode";
import React, { useReducer, createContext } from "react";

// Create the initial state
let initialState = {
  user: null,
};

/**
 * If there is a token in the local storage we have to check
 * whether that token is expired or not.
 * To do that, jwt-decode is used to decode de JWT token,
 * then the expiration date is extracted, converted into
 * milliseconds, and compared to Date.now.
 *
 * If the token is expired, we remove the token from the local
 * storage; else, it is assigned to the initial state variable.
 */
const token = localStorage.getItem("token");
if (token) {
  const decodedToken: any = jwtDecode(token);
  if (decodedToken.exp * 3600 < Date.now()) {
    // 1 hour before it expires
    localStorage.removeItem("token");
  } else {
    initialState.user = { ...decodedToken, currentChat: null };
  }
}

// Create the actual context that is going to be used.
const AuthContext = createContext({
  user: {
    exp: null,
    iat: null,
    user_id: null,
    username: null,
    token: null,
    currentChat: null,
    inProfile: null,
  },
  login: (userData: any) => {},
  logout: () => {},
  setCurrentChat: (chatName: string) => {},
  showProfile: (show: boolean) => {},
});

/**
 * This is the reducer that will be used in the useReducer hook,
 * in the AuthContext provider.
 *
 * In this reducer we check the type of action that is going to be performed:
 * If it's login, we update the state with the new user.
 * If it's logout, we remove the user from the state.
 *
 * The actual login is performed in the Apollo Server, so no adicional
 * checks are performed here.
 */
function authReducer(state: any, action: any) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: { ...action.payload, currentChat: null },
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "SET_CHAT":
      return {
        ...state,
        user: { ...state.user, currentChat: action.payload },
      };
    case "SHOW_PROFILE":
      return {
        ...state,
        user: { ...state.user, inProfile: action.payload },
      };
    default:
      return state;
  }
}

/**
 * This is the AuthContext provider, or what React will actually "see".
 * Whenever the state changes, the reducer function will be called,
 * and the context will be changed according to the change in state.
 * @param {*} props
 * @returns
 */
function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: any) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };

  function logout() {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  }

  const setCurrentChat = (chatName: string) => {
    dispatch({
      type: "SET_CHAT",
      payload: chatName,
    });
  };

  const showProfile = (show: boolean) => {
    dispatch({
      type: "SHOW_PROFILE",
      payload: show,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, setCurrentChat, showProfile }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
