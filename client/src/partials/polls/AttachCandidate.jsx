import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AttachCandidate({ onClose, poll }) {
  const [platforms, setPlatforms] = useState([]);
  const [isIndependent, setIsIndependent] = useState(false);

  const [candidate, setCandidate] = useState({
    name: "",
    bio: "",
    poll_id: poll.id,
    platform_id: "",
    photo: "",
  });

  useEffect(() => {
    const fetchPlatformByPollId = async (pollId) => {
      try {
        let url = `/polls/${pollId}/platforms`;
        const response = await axios.get(url);
        const { data } = response.data;
        setPlatforms(data);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };
    if (candidate.poll_id) {
      fetchPlatformByPollId(candidate.poll_id);
    }
  }, [candidate.poll_id]);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setCandidate({
        ...candidate,
        photo: e.target.files[0], // Store the file itself, not the filename
      });
    } else if (e.target.name === "independent") {
      setIsIndependent(e.target.checked);
    } else {
      const { name, value } = e.target;
      setCandidate((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", candidate.name);
    formData.append("bio", candidate.bio);
    formData.append("poll_id", candidate.poll_id);
    formData.append("platform_id", candidate.platform_id);
    formData.append("photo", candidate.photo); // Append the file here
    formData.append("isIndependent", candidate.isIndependent); // Append the file here
    try {
      const url = "/candidates/candidate";
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      });

      const { status, data } = response.data;
      if (status === "success") {
        const message = `${data.name} have been attached to ${poll.name}`;
        const notify = () => {
          toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
          });
        };
        notify();
      } else {
        
      }
    } catch (error) {
      const message = `Failed to attach candidate to ${poll.name}`;
      const notify = () => {
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
        });
      };
      notify();
      console.log({ status: "failed", data: error });
    }
    setCandidate({
      name: "",
      bio: "",
      poll_id: "",
      platform_id: "",
      photo: "",
    });
    setIsIndependent(false); // Reset independent status
    onClose();
  };

  useEffect(() => {
    handleSubmit();
  }, [candidate]);

  return (
    <form encType="multipart/form-data">
      <ToastContainer />
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
          <Label htmlFor="poll_id" value="Poll" />
          <TextInput
            id="poll_id"
            name="poll_id"
            type="text"
            placeholder="Current Poll"
            disabled
            value={poll.name}
            required
          />
        </div>
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
            <option value="null">---</option>
          ) : (
            platforms.map((v) => (
              <option key={v.platform_id} value={v.platform_id}>
                {v.platform.name}
              </option>
            ))
          )}
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="independent"
          name="independent"
          checked={isIndependent}
          onChange={handleChange}
        />
        <Label htmlFor="independent">Independent Candidacy</Label>
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
        <Button onClick={handleSubmit}>Submit</Button>
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

export default AttachCandidate;
