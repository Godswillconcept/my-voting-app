import React, { useState, useEffect } from "react";
import { Modal, Label, Checkbox, Button } from "flowbite-react";
import axios from "axios";

function AddPlatform({ openModal, onClose, poll }) {
  const [platforms, setPlatforms] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  useEffect(() => {
    // Fetch platforms when the component mounts
    const fetchPlatforms = async () => {
      try {
        const url = "http://localhost:3300/platforms";
        const response = await axios.get(url);
        const { data } = response.data;
        setPlatforms(data);
      } catch (error) {
        console.error("Error fetching platforms:", error.message);
      }
    };

    fetchPlatforms();
    () => selectedPlatforms([]);
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handlePlatformChange = (platformId) => {
    // Toggle the selected platform
    setSelectedPlatforms((prevSelected) =>
      prevSelected.includes(platformId)
        ? prevSelected.filter((id) => id !== platformId)
        : [...prevSelected, platformId]
    );
  };

  const handleSubmit = async () => {
    console.log(selectedPlatforms);
    console.log(poll.name);
    try {
      // Simulate an asynchronous API call
      const url = "http://localhost:3300/polls/add-platform";
      const response = await axios.post(url, {
        platform_ids: selectedPlatforms,
        poll_id: poll.id,
      });

      // Handle the response or throw an error if needed
      if (!response.data.success) {
        throw new Error("Failed to add platforms to poll");
      }

      // Close the modal after submission
      setSelectedPlatforms([]);
      onClose(onClose);
    } catch (error) {
      console.log(error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <Modal show={openModal} onClose={onClose}>
      <Modal.Header>Add Platform(s) to Poll</Modal.Header>
      <Modal.Body>
        <form className="space-y-6">
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
                  <Label htmlFor={`platform-${platform.id}`}>
                    {platform.name}
                  </Label>
                </div>
              ))}
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
}

export default AddPlatform;
