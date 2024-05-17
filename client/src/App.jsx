import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
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
import { Spinner } from "flowbite-react";
import PollVote from "./partials/polls/PollVote";
import NotFound from "./pages/NotFound";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { full_name } from "./helpers/helper";
import { login } from "./AuthAPI";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import VoteAnalysis from "./pages/VoteAnalysis";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null); // Initialize user as null

  axios.defaults.baseURL = "http://localhost:3300";
  axios.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      config.headers.Authorization = token ? token : "";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  function getAuthToken() {
    return localStorage.getItem("token");
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get("/users/detail");
        const { status, data } = response.data;
        setUser(data);
        if (status === "success") {
          const authenticatedUser = full_name(data.first_name, data.last_name);
          const message = `${authenticatedUser} logged in successfully`;
          const notify = () => {
            toast.success(message, {
              position: toast.POSITION.TOP_CENTER,
            });
            navigate("/profile");
          };
          notify();
        }
      } catch (error) {
        console.error(
          "Failed to fetch user details:",
          error.response ? error.response.data.error : error.message
        );
      }
    };

    if (token) {
      fetchUserDetails();
    }
  }, [token]);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = async (formData) => {
    try {
      const response = await login(formData);
      const { token } = response;
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data.error : error.message
      );
      const notify = () => {
        toast.error(
          error.response ? error.response.data.error : error.message,
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      };
      notify();
    }
  };

  const handleLogout = async () => {
    setToken("");
    setUser(null); // Set user to null on logout
    localStorage.removeItem("token");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center mx-auto h-screen">
        <div className="flex flex-wrap gap-2">
          <Spinner size="xl" color="info" aria-label="Info spinner example" />
          <Spinner
            size="xl"
            color="success"
            aria-label="Success spinner example"
          />
          <Spinner
            size="xl"
            color="failure"
            aria-label="Failure spinner example"
          />
          <Spinner
            size="xl"
            color="warning"
            aria-label="Warning spinner example"
          />
          <Spinner size="xl" color="pink" aria-label="Pink spinner example" />
          <Spinner
            size="xl"
            color="purple"
            aria-label="Purple spinner example"
          />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Routes>
        <Route
          index
          element={
            token ? (
              <Layout user={user}>
                <Dashboard handleLogout={handleLogout} user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/users"
          element={
            token ? (
              <Layout user={user}>
                <Users user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/platforms"
          element={
            token ? (
              <Layout user={user}>
                <Platforms user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/candidates"
          element={
            token ? (
              <Layout user={user}>
                <Candidates user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/polls"
          element={
            token ? (
              <Layout user={user}>
                <Polls user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/:pollId?/detail"
          element={
            token ? (
              <Layout user={user}>
                <PollDetail user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/:pollId?/vote"
          element={
            token ? (
              <Layout user={user}>
                <PollVote user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            token ? (
              <Layout user={user}>
                <Profile user={user} />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={
            <Layout user={user}>
              <NotFound />
            </Layout>
          }
        />
        <Route
          path="/vote-analysis"
          element={
            token ? (
              <Layout user={user}>
                <VoteAnalysis />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
