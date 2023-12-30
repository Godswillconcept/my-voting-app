// app.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "./css/style.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Candidates from "./pages/Candidates";
import Platforms from "./pages/Platforms";
import Polls from "./pages/Polls";
import PollDetail from "./partials/polls/PollDetail";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center mx-auto h-screen">
        Loading...
      </div>
    );
  }

  return (
    <React.Fragment>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Users />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/polls" element={<Polls />} />
        <Route path="/:pollId?/detail" element={<PollDetail />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
