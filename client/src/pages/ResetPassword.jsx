import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../AuthAPI";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  const [error, setError] = useState("");
  const [user, setUser] = useState({
    otp: "",
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
      if (!otp || !email || !password) {
        setError("All fields are required!");
        const notify = () => {
          toast.error("All fields are required!", {
            position: toast.POSITION.TOP_CENTER,
          });
        };
        notify();
        return;
      }

      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", user.otp);
      formData.append("password", user.password);
      const response = await resetPassword(formData);
      if (response.status === "success") {
        setError("");
        const notify = () => {
          toast.success("Password reset successful!", {
            position: toast.POSITION.TOP_CENTER,
          });
        };
        notify();
        navigate("/login");
      } else {
        setError("Invalid OTP or email or password");
        console.error("Reset password failed:", response.status);
      }
    } catch (error) {
      setError("Invalid OTP or email or password");
      console.error(
        "Reset password failed:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 flex">
      <ToastContainer />
      <div className="auth w-1/2 flex justify-center h-screen items-center">
        <div className="text-white">
          <h3 className="text-xl font-extrabold leading-none tracking-tight  sm:text-2xl md:text-3xl lg:text-4xl dark:text-whitesemibold">
            VoteHive
          </h3>
          <p>Reset your password. Enter OTP, email and new password.</p>
        </div>
      </div>
      <div className="flex items-center justify-center mx-auto">
        <form encType="multipart/form-data" className="space-y-3">
          <h2 className="text-4xl font-bold dark:text-white my-4">
            Reset Password
          </h2>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="otp" value="OTP" />
            </div>
            <TextInput
              id="otp"
              name="otp"
              type="text"
              placeholder="OTP"
              value={user.otp}
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
            Reset Password
          </Button>
          <h5 className="text-base font-bold dark:text-white ">
            Remember your password?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login Here
            </a>{" "}
          </h5>
        </form>
      </div>
    </section>
  );
}

export default ResetPassword;
