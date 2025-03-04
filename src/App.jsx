import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import PasswordControl from "./pages/PasswordControl";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<PasswordControl />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
};

export default App;