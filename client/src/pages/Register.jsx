import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../AuthAPI";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
    dob: "",
    photo: "",
  });
  const [passwordError, setPasswordError] = useState("");
const [error, setError] = useState();

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setUser({
        ...user,
        photo: e.target.files[0], // Store the file itself, not the filename
      });
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
    if (user.password !== user.confirm_password) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
      const formData = new FormData();
      formData.append("first_name", user.first_name);
      formData.append("last_name", user.last_name);
      formData.append("username", user.username);
      formData.append("phone", user.phone);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("gender", user.gender);
      formData.append("dob", user.dob);
      formData.append("photo", user.photo);
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

      try {
        const response = await register(formData);
        const { status } = response;
        if (status === "success") {
          const message = "New User registered successfully!";
          const notify = () => {
            toast.success(message, {
              position: toast.POSITION.TOP_CENTER,
            });
          };
          notify();
          navigate("/users");
        } else {
          const message = "Something went wrong!";
          const notify = () => {
            toast.error(message, {
              position: toast.POSITION.TOP_CENTER,
            });
          };
          notify();
        }
      } catch (error) {
        console.log("error", error);
      }

      setUser({
        first_name: "",
        last_name: "",
        username: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: "",
        gender: "",
        dob: "",
        photo: "",
      });
    }
  };

  return (
    <section class="bg-white dark:bg-gray-900 flex flex-col md:flex-row">
      <ToastContainer />
      <div className="auth w-full md:w-1/2 flex justify-center h-screen items-center md:h-auto">
        <div className="text-white md:text-left text-center">
          <h3 className="text-xl font-extrabold leading-none tracking-tight  sm:text-2xl md:text-3xl lg:text-4xl dark:text-whitesemibold">
            OneVote
          </h3>
          <p className="md:w-1/2">Keep track of your voting process. Register to enjoy more.</p>
        </div>
      </div>
      <div className="mx-auto max-w-2xl py-1 md:w-1/2 md:py-5">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="py-5 md:py-0"
        >
          <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
            <div className="w-full">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="First Name"
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Last Name"
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Username"
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Email Address"
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Phone Number"
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="******"
                required=""
              />
            </div>
            <div class="w-full">
              <label
                htmlFor="confirm_password"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                value={user.confirm_password}
                onChange={handleChange}
                id="confirm_password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="******"
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="gender"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="w-full">
              <label
                htmlFor="dob"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                id="dob"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="12"
                required=""
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="photo"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User Avatar
              </label>
              <input
                class="block mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                name="photo"
                type="file"
                accept="*"
                onChange={handleChange}
              />
            </div>
          </div>
          <Button
            color="transparent"
            pill
            className="bg-primary text-white  px-8 my-4 hover:bg-blue-800" onClick={handleSubmit}
          >
            Register
          </Button>
          <h5 className="text-xl font-bold dark:text-white text-center">
            Already have an account?
            <a
              href="/login"
              className="ms-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login Here
            </a>
          </h5>
        </form>
      </div>
    </section>
  );
}

export default Register;
