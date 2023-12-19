import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import React from "react";
import axios from "axios";

function PlatformDelete({ openDeleteModal, onClose, platform }) {
  const handleDeletePlatform = async (platformId) => {
      // You may want to call an API or perform some other actions here
      console.log(platformId);
    try {
      const url = `http://localhost:3300/platforms/${platformId}/delete`;
      const response = await axios.delete(url);
      const { data } = response.data;
      console.log(data);
    } catch (error) {
      console.log({ status: "failed", data: error });
    }
    // After deletion, close the delete modal
    onClose();
  };
  return (
    <Modal show={openDeleteModal} size="md" onClose={onClose} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete {platform.name}?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => handleDeletePlatform(platform.id)}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={onClose}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default PlatformDelete;
