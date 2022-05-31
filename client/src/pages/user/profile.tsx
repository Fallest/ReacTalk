import { AuthContext } from "../../context/authContext";
import React, { useContext } from "react";

function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      ReacTalk is an instant messaging web app, developed for a degree
      coursework.
    </>
  );
}

export default Profile;
