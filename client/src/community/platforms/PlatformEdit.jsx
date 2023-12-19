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

function PlatformEdit({ openEditModal, onClose, id }) {
  const [platform, setPlatform] = useState({
    name: "",
    description: "",
    emblem: "",
  });
  const [editedPlatform, setEditedPlatform] = useState({
    name: "",
    description: "",
    emblem: "",
  });

  async function fetchPlatform(id) {
    try {
      const url = `http://localhost:3300/platforms/${id}`;
      const response = await axios.get(url);
      const { data } = response.data;
      setPlatform(data);
      // Set the initial values of the form fields
      setEditedPlatform(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // Fetch platform data when the modal is opened
    if (openEditModal) {
      fetchPlatform(id);
    }
  }, [openEditModal, id]);

  const handleInputChange = (e) => {
    if (e.target.name === "emblem") {
      setEditedPlatform({
        ...editedPlatform,
        emblem: e.target.files[0], // Store the file itself, not the filename
      });
    } else {
      const { name, value } = e.target;
      // Update the editedPlatform state when the user makes changes
      setEditedPlatform((prevPlatform) => ({
        ...prevPlatform,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Edited Platform:", editedPlatform);
    const formData = new FormData();
    formData.append("name", editedPlatform.name),
      formData.append("description", editedPlatform.description),
      formData.append("emblem", editedPlatform.emblem);

    try {
      const url = `http://localhost:3300/platforms/${id}/update`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      });
      console.log(response.data);
      // Check if the update was successful
      if (response.data.status === "success") {
        // Update the local state with the updated platform data
        setPlatform(response.data.data);
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
    <Modal show={openEditModal} onClose={onClose}>
      <Modal.Header>Edit Platform</Modal.Header>
      <Modal.Body>
        <form enctype="multipart/form-data">
          <div className="space-y-6">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Platform Name" />
            </div>
            <TextInput
              id="name"
              name="name"
              type="text"
              placeholder="Platform Name"
              value={editedPlatform.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-6">
            <div className="mb-2 block">
              <Label htmlFor="description" value="Description" />
            </div>
            <Textarea
              id="description"
              name="description"
              placeholder="Leave a comment..."
              required
              rows={4}
              value={editedPlatform.description}
              onChange={handleInputChange}
            />
          </div>

          <div id="fileUpload" className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Platform Emblem" />
            </div>
            <FileInput
              id="file"
              name="emblem"
              accept="*"
              onChange={handleInputChange}
              helperText="A platform emblem is useful to confirm your choice of platform"
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Save Changes</Button>
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
}

export default PlatformEdit;
