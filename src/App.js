import React from "react";
import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { UserProvider } from "./components/UserContext";

const App = () => {
  return (
    <UserProvider>
      {" "}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
