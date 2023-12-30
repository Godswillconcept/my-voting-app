import axios from "axios";
import {
  Button,
  FileInput,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useEffect, useState } from "react";

function PlatformEdit({ onClose, value }) {
  const [platform, setPlatform] = useState(value);

  const handleChange = (e) => {
    if (e.target.name === "emblem") {
      setPlatform({
        ...platform,
        emblem: e.target.files[0], // Store the file itself, not the filename
      });
    } else {
      const { name, value } = e.target;
      // Update the platform state when the user makes changes
      setPlatform((prevPlatform) => ({
        ...prevPlatform,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", platform.name),
      formData.append("description", platform.description),
      formData.append("emblem", platform.emblem);

    try {
      const url = `http://localhost:3300/platforms/${value.id}/update`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      });
      if (response.data.status === "success") {
        const { data } = response.data;
        setPlatform(data);
        // Close the modal
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
      <div className="mb-5">
        <div className="mb-2">
          <Label htmlFor="name" value="Platform Name" />
        </div>
        <TextInput
          id="name"
          name="name"
          type="text"
          placeholder="Platform Name"
          value={platform.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-5">
        <div className="mb-2">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea
          id="description"
          name="description"
          placeholder="Leave a comment..."
          required
          rows={4}
          value={platform.description}
          onChange={handleChange}
        />
      </div>
      <div className="mb-5">
        <div className="mb-2">
          <Label htmlFor="file" value="Platform Emblem" />
        </div>
        <FileInput
          id="file"
          name="emblem"
          accept="*"
          onChange={handleChange}
          helperText="A platform emblem is useful to confirm your choice of platform"
        />
      </div>

      <div className="flex flex-row space-x-2 my-5">
        <Button onClick={handleSubmit}>Save Changes</Button>
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

export default PlatformEdit;
