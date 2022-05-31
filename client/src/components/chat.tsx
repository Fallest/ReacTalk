import { AuthContext } from "../context/authContext";
import React, { useContext, FC } from "react";

export const Chat: FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      ReacTalk is an instant messaging web app, developed for a degree
      coursework.
    </>
  );
};
