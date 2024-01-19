import axios from "axios";
import {
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import React, { useState } from "react";

function UserEdit({ onClose, value }) {
  const [user, setEditedUser] = useState(value);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setEditedUser({
        ...user,
        photo: e.target.files[0], // Store the file itself, not the filename
      });
    } else {
      const { name, value } = e.target;
      // Update the editedUser state when the user makes changes
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const url = `users/${value.id}/update`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      });
      console.log(response.data);
      if (response.data.status === "success") {
        const { data } = response.data;
        setUser(data);
        onClose();
      } else {
        console.log("Update failed:", response.data.error);
      }
    } catch (error) {
      console.log({ status: "failed", data: error });
    }

    onClose();
  };

  return (
    <form encType="multipart/form-data">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="first_name" value="First Name" />
          </div>
          <TextInput
            id="first_name"
            name="first_name"
            type="text"
            placeholder="First Name"
            value={user.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="last_name" value="Last Name" />
          </div>
          <TextInput
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Last Name"
            value={user.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
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
            <Label htmlFor="phone" value="Phone" />
          </div>
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="">
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
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Gender" />
          </div>
          <Select
            id="gender"
            name="gender"
            value={user.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </div>
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="dob" value="Date of Birth" />
          </div>
          <TextInput
            id="dob"
            name="dob"
            type="date"
            placeholder="Date of Birth"
            value={user.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div id="fileUpload" className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="file" value="User Photo" />
          </div>
          <FileInput
            id="file"
            name="photo"
            accept="*"
            onChange={handleChange}
            helperText="A user photo is useful to confirm your choice of user"
          />
        </div>
      </div>
      <div className="flex flex-row space-x-2 my-5">
        <Button onClick={handleSubmit} type="submit">
          Save Changes
        </Button>
        <Button
          color="transparent"
          className="bg-red-500 text-white hover:bg-red-800"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default UserEdit;
