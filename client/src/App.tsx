import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Navbar from "./components/navbar";
import Register from "./pages/login/register";
import Login from "./pages/login/login";

/**
 * Here we have our routes, where all pages will be linked with one another.
 * The structure of the page is as follows:
 * / -> Homepage. Explains what ReacTalk is, has links to Login and Register pages.
 * /login -> Login page. Has a link to the Register page.
 * /register -> Register page. Has a link to the Login page.
 * /$username/chats -> Chats of the logged in user. Has links to ALL the user chats.
 * /$username/chats/$friendusername -> Is the chat of the current friend that the user
 *    is talking to.
 * /$username/profile -> Is the profile of the current user, being able to change the email,
 *    the password, and the username.
 */
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<Homepage />} />
        <Route path="/profile" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
