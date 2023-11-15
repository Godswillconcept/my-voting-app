import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import Home from "./pages/home/Home";
import Login from "./pages/home/Login";
import Register from "./pages/home/Register";
import Polls from "./pages/home/Polls";
import Updates from "./pages/home/Updates";
import Results from "./pages/home/Results";
import Users from "./pages/community/Users";
import Platforms from "./pages/community/Platforms";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <React.Fragment>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/results" element={<Results />} />
        <Route path="/users" element={<Users />} />
        <Route path="/platforms" element={<Platforms />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
