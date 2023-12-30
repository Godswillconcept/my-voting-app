import axios from "axios";
import {
  Button,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useEffect, useState } from "react";

function CandidateEdit({ onClose, value }) {
  const [platforms, setPlatforms] = useState([]);
  const [candidate, setCandidate] = useState(value);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const url = "http://localhost:3300/platforms";
        const response = await axios.get(url);
        const { data } = response.data;

        setPlatforms(data);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };
    fetchPlatforms();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setCandidate({
        ...candidate,
        photo: e.target.files[0], // Store the file itself, not the filename
      });
    } else {
      const { name, value } = e.target;
      // Update the editedCandidate state when the candidate makes changes
      setCandidate((prevCandidate) => ({
        ...prevCandidate,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", candidate.name);
    formData.append("bio", candidate.bio);
    formData.append("platform_id", candidate.platform_id);
    formData.append("photo", candidate.photo); // Append the file here

    try {
      const url = `http://localhost:3300/candidates/${value.id}/update`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      });
      // Check if the update was successful
      if (response.data.status === "success") {
        // Update the local state with the updated candidate data
        const { data } = response.data;
        setCandidate(data);
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
      <div>
        <div className="my-3">
          <div className="mb-2 block">
            <Label htmlFor="name" value="Candidate Name" />
          </div>
          <TextInput
            id="name"
            name="name"
            type="text"
            placeholder="Candidate Name"
            value={candidate.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-3">
          <div className="mb-2 block">
            <Label htmlFor="bio" value="Candidate Bio" />
          </div>
          <Textarea
            id="bio"
            name="bio"
            type="text"
            placeholder="Candidate Bio"
            value={candidate.bio}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>
        <div className="my-3">
          <div className="mb-2 block">
            <Label htmlFor="platform_id" value="Select Platform" />
          </div>
          <Select
            id="platform_id"
            name="platform_id"
            value={candidate.platform_id}
            onChange={handleChange}
            required
          >
            <option value="">Select platform</option>
            {platforms.length === 0 ? (
              <option value="---">---</option>
            ) : (
              platforms.map((platform) => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))
            )}
          </Select>
        </div>
        <div id="fileUpload" className="w-full">
          <div className="mb-2 block">
            <Label htmlFor="file" value="Candidate Photo" />
          </div>
          <FileInput
            id="file"
            name="photo"
            accept="*"
            onChange={handleChange}
            helperText="A candidate photo is useful to confirm your choice of candidate"
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
      </div>
    </form>
  );
}

export default CandidateEdit;
