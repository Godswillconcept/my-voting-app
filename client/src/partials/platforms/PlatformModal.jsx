import React, { useState } from "react";
import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import axios from "axios";


const PlatformModal = ({ openModal, onClose, fetchPlatforms }) => {
  const [platform, setPlatform] = useState({
    name: "",
    description: "",
    emblem: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "emblem") {
      setPlatform({
        ...platform,
        emblem: e.target.files[0], // Store the file itself, not the filename
      });
    } else {
      const { name, value } = e.target;
      setPlatform((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", platform.name);
    formData.append("description", platform.description);
    formData.append("emblem", platform.emblem);

    // sending the information to the database

    try {
      const url = "/platforms/platform";
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      });
      if (response.data.status === "success") {
        fetchPlatforms();
      }
    } catch (error) {
      console.log({ status: "failed", data: error });
    }
    // clearing form field
    setPlatform({
      name: "",
      description: "",
      emblem: "",
    });
    onClose(onClose);
  };

  
  return (
    <Modal show={openModal} onClose={onClose}>
      <Modal.Header>Add New Platform</Modal.Header>
      <Modal.Body>
        <form encType="multipart/form-data">
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
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
                shadow
              />
            </div>

            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Platform Description
            </label>
            <textarea
              id="description"
              name="description"
              value={platform.description}
              onChange={handleChange}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Platform Description"
            ></textarea>

            <div id="fileUpload" className="w-full">
              <div className="mb-2 block">
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
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button
          color="transparent"
          className="bg-red-500 text-white hover:bg-red-800"
          onClick={onClose}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlatformModal;
