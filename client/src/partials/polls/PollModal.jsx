import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function PollModal({ openModal, onClose, fetchPolls}) {
  const [poll, setPoll] = useState({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoll({ ...poll, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", poll.name);
    formData.append("description", poll.description);
    formData.append("start_time", poll.start_time);
    formData.append("end_time", poll.end_time);

    // sending information to the database
    try {
      const url = "/polls/poll";
      const response = await axios.post(url, formData);
      if (response.data.status === "success") {
        fetchPolls();
      }
    } catch (error) {
      console.log({ status: "failed", data: error });
    }
    setPoll({
      name: "",
      description: "",
      start_time: "",
      end_time: "",
    });
    onClose();
  };

  useEffect(() => {
    handleSubmit();
  }, [poll]);

  return (
    <div>
      <Modal show={openModal} onClose={onClose}>
        <Modal.Header>Create a poll</Modal.Header>
        <Modal.Body>
          <form className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Poll Name" />
              </div>
              <TextInput
                id="name"
                name="name"
                type="name"
                placeholder="Poll Name"
                value={poll.name}
          
                onChange={handleChange}
                required
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Poll Description" />
              </div>
              <Textarea
                id="description"
                name="description"
                placeholder="Poll Description"
                value={poll.description}
                onChange={handleChange}
                required
                rows={4}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="start_time" value="Start Time" />
              </div>
              <TextInput
                id="start_time"
                name="start_time"
                type="datetime-local"
                placeholder="Start Time"
                value={poll.start_time}
                onChange={(e) =>
                  setPoll({ ...poll, start_time: e.target.value })
                }
                required
                shadow
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="end_time" value="End Time" />
              </div>
              <TextInput
                id="end_time"
                name="end_time"
                type="datetime-local"
                placeholder="End Time"
                value={poll.end_time}
                onChange={handleChange}
                required
                shadow
              />
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
    </div>
  );
}

export default PollModal;
