import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [error, setError] = useState("");
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

    try {
      if (!user.email || !user.password) {
        setError("Email and Password are required!");
        const notify = () => {
          toast.error("Email and Password are required!", {
            position: toast.POSITION.TOP_CENTER,
          });
        };
        notify();
        return;
      }
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("password", user.password);
      await onLogin(formData);
      setError("");
    } catch (error) {
      setError("Invalid email or password");
      console.error(
        "Login failed:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  return (
    <section class="bg-white dark:bg-gray-900 flex">
      <ToastContainer />
      <div className="auth w-1/2 flex justify-center h-screen items-center">
        <div className="text-white">
          <h3 className="text-xl font-extrabold leading-none tracking-tight  sm:text-2xl md:text-3xl lg:text-4xl dark:text-whitesemibold">
            VoteHive
          </h3>
          <p>Keep track of your voting process. Login to continue.</p>
        </div>
      </div>
      <div className="flex items-center justify-center mx-auto">
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
          <h5 className="text-base font-bold dark:text-white ">
            Forget Password?{" "}
            <a
              href="/forgot-password"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Click Here
            </a>{" "}
          </h5>
        </form>
      </div>
    </section>
  );
}

export default Login;
