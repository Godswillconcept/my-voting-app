import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios, { Axios } from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../AuthAPI";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  // Use the useAuth hook to access the context
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", user.email); // Add the email field if it's needed
    formData.append("password", user.password);

    const result = await login(formData);
    const { data, auth, token } = result;
    if (!auth) {
      setLoginStatus(false);
    } else {
      setLoginStatus(true);
      localStorage.setItem("auth-token", token);
      loginAuth(data);
      userAuthenticated();
    }
    navigate("/");

    setUser({
      email: "",
      password: "",
    });
  };

  const userAuthenticated = async () => {
    const url = "http://localhost:3300/users/authUser";
    const response = await axios.post(url, {
      headers: { "x-access-token": localStorage.getItem("auth-token") },
    });
    const { data } = response.data;
    const notify = () => {
      toast.success(data, {
        position: toast.POSITION.TOP_CENTER,
      });
    };
    notify();
  };

  return (
    <section class="bg-white dark:bg-gray-900 flex">
      <div className="auth w-1/2 flex justify-center h-screen items-center">
        <div className="text-white">
          <h3 className="text-xl font-extrabold leading-none tracking-tight  sm:text-2xl md:text-3xl lg:text-4xl dark:text-whitesemibold">
            OneVote
          </h3>
          <p>Keep track of your voting process. Login to continue.</p>
        </div>
      </div>
      <div className="flex items-center justify-center mx-auto">
        <ToastContainer />
        <form encType="multipart/form-data" className="space-y-3">
          <h2 className="text-4xl font-bold dark:text-white my-4">
            Login to Continue
          </h2>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Email" />
            </div>
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Password" />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            color="transparent"
            pill
            className="bg-primary text-white  px-8 my-4 hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <h5 className="text-xl font-bold dark:text-white ">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Sign up Here
            </a>{" "}
          </h5>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
