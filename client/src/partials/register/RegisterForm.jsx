import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
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
      formData.append("email", user.email); // Add the email field if it's needed
      formData.append("password", user.password);
      formData.append("gender", user.gender);
      formData.append("dob", user.dob);
      formData.append("photo", user.photo); // Append the file here

      try {
        const url = "http://localhost:3300/users/user";
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for FormData
          },
        });
        console.log({ status: "success", data: response.data });
        navigate("/users");
      } catch (error) {
        console.log({ status: "failed", data: error });
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

  useEffect(() => {
    handleSubmit();
  }, [user]);

  return (
    <section class="bg-white dark:bg-gray-900 flex">
      <div className="auth w-1/2 flex justify-center h-screen items-center">
        <div className="text-white">
          <h3 className="text-xl font-extrabold leading-none tracking-tight  sm:text-2xl md:text-3xl lg:text-4xl dark:text-whitesemibold">
            OneVote
          </h3>
          <p>Keep track of your voting process. Register to enjoy more.</p>
        </div>
      </div>
      <div className="px-4 mx-auto max-w-2xl py-1">
        <form onSubmit={handleSubmit} enctype="multipart/form-data" className="py-10">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
          <button
            type="submit"
            class="inline-flex items-center px-12 py-2.5 mt-4 sm:mt-6 text-sm bg-primary font-medium text-center text-white bg-primary-700 rounded-full focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterForm;
