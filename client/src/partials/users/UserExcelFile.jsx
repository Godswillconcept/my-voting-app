import { Button, FileInput, Label, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { previewExcelFile } from "../../helpers/helper";

function UserExcelFile({ openModal, onClose, fetchUsers }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    previewExcelFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    // sending information to the database
    try {
      const url = "/users/bulk-create";
      const response = await axios.post(url, formData);
      if (response.data.status === "success") {
        fetchUsers();
        const notify = () => {
          toast.success("Users created from excel", {
            position: toast.POSITION.TOP_CENTER,
          });
        };
        notify();
      }
    } catch (error) {
      console.log({ status: "failed", data: error });
    }
    setFile({
      file: null,
    });
    onClose();
  };

  return (
    <Modal show={openModal} onClose={onClose} size="3xl">
      <Modal.Header>Create Bulk Users with xls file</Modal.Header>
      <Modal.Body>
        <ToastContainer />
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
        <div id="spreadsheet-container" className="preview-table"></div>
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
