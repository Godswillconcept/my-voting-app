import { Button, FileInput, Label, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserExcelFile({ openModal, onClose }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    console.log(file);

    // sending information to the database
    try {
      const url = "http://localhost:3300/users/bulk-create";
      const response = await axios.post(url, formData);
      console.log(response.data);
    } catch (error) {
      console.log({ status: "failed", data: error });
    }
    setFile({
      file: null,
    });
    onClose(onClose);
  };

  return (
    <Modal show={openModal} onClose={onClose}>
      <Modal.Header>Create Bulk Users with xls file</Modal.Header>
      <Modal.Body>
        <form className="space-y-6">
          <div id="fileUpload" className="max-w-full">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              type="file"
              id="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
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
  );
}

export default UserExcelFile;
