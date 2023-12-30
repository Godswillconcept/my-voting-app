import React, { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../AuthAPI";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {
  const { loginAuth } = useAuth();
  const navigate = useNavigate();

  // Use the useAuth hook to access the context
  const [user, setUser] = useState({
    email: "",
    password: "",
    remember_me: false,
  });

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setUser({
        ...user,
        photo: e.target.files[0], // Store the file itself, not the filename
      });
    } else if (e.target.name === "remember_me") {
      setUser((prevState) => ({
        ...prevState,
        remember_me: e.target.checked,
      }));
    } else {
      const { name, value } = e.target;
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", user.email); // Add the email field if it's needed
    formData.append("password", user.password);
    formData.append("remember_me", user.remember_me);

    const result = await login(formData);
    loginAuth(result.data);
    navigate("/");

    setUser({
      email: "",
      password: "",
      remember_me: false,
    });
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
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember_me"
              name="remember_me"
              checked={user.remember_me}
              onChange={handleChange}
            />
            <Label htmlFor="remember_me">Remember me</Label>
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
