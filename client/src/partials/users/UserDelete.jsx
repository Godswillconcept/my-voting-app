import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import React from "react";
import axios from "axios";
import { full_name } from "../../helpers/helper";

function UserDelete({ onClose, value }) {
  const handleDeleteUser = async (userId) => {
    try {
      const url = `http://localhost:3300/users/${userId}/delete`;
      const response = await axios.delete(url);
      const { data } = response.data;
    } catch (error) {
      console.log({ status: "failed", data: error });
    }
    // After deletion, close the delete modal
    onClose();
  };
  return (
    <form>
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete{" "}
          {full_name(value.first_name, value.last_name)}?
        </h3>
        <div className="flex justify-center gap-4">
          <Button color="failure" onClick={() => handleDeleteUser(value.id)}>
            {"Yes, I'm sure"}
          </Button>
          <Button color="gray" onClick={onClose}>
            No, cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UserDelete;
