import React, { useState, useEffect } from "react";
import { Label, Checkbox, Button } from "flowbite-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AttachPlatform({ onClose, poll }) {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const fetchPlatforms = async () => {
    try {
      const url = "/platforms";
      const response = await axios.get(url);
      const { data } = response.data;
      setPlatforms(data);
    } catch (error) {
      console.error("Error fetching platforms:", error.message);
    }
  };

  const fetchSelectedPlatforms = async () => {
    try {
      const url = `/polls/${poll.id}/platforms`;
      const response = await axios.get(url);
      const { data } = response.data;
      const initialSelectedPlatforms = data.map(
        (platform) => platform.platform_id
      );
      setSelectedPlatforms(initialSelectedPlatforms);
    } catch (error) {
      console.error(
        "Error fetching selected platforms for poll:",
        error.message
      );
    }
  };

  const handlePlatformChange = (platformId) => {
    setSelectedPlatforms((prevSelected) =>
      prevSelected.includes(platformId)
        ? prevSelected.filter((id) => id !== platformId)
        : [...prevSelected, platformId]
    );
  };

  const handleSubmit = async () => {
    try {
      const url = "/polls/platform";
      const response = await axios.post(url, {
        platform_ids: selectedPlatforms,
        poll_id: poll.id,
      });

      const { status, data } = response.data;

      if (status === "success") {
        if (data.length === 0) {
          var message = "No changes made";
        } else {
          var message = `Platforms attached to ${poll.name}`;
        }
        const notify = () => {
          toast.success(message, {
            position: toast.POSITION.TOP_CENTER,
          });
        };
        notify();
      }

      setSelectedPlatforms([]);
      onClose();
    } catch (error) {
      const message = `Failed to attached platforms to ${poll.name}`;
      const notify = () => {
        toast.error(message, {
          position: toast.POSITION.TOP_CENTER,
        });
      };
      notify();

      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlatforms();
    fetchSelectedPlatforms();
    return () => setSelectedPlatforms([]);
  }, [poll.id]);

  return (
    <form className="space-y-6">
      <ToastContainer />
      <div>
        <div className="mb-2 block">
          <Label htmlFor="platforms" value="Choose Platforms" />
        </div>
        <div className="flex flex-wrap">
          {platforms.map((platform) => (
            <div className="flex items-center gap-2 me-2" key={platform.id}>
              <Checkbox
                id={`platform-${platform.id}`}
                checked={selectedPlatforms.includes(platform.id)}
                onChange={() => handlePlatformChange(platform.id)}
              />
              <Label htmlFor={`platform-${platform.id}`}>{platform.name}</Label>
            </div>
          ))}
        </div>
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

export default AttachPlatform;
