import React, { useState } from "react";
import { Avatar, Table } from "flowbite-react";
import { image } from "../../helpers/helper";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import flag from "../../images/emblem.jpeg";
import PlatformEdit from "./PlatformEdit";
import PlatformDelete from "./PlatformDelete";

function PlatformTable({ platforms }) {
  const [openEditModal, setOpenEditModal] = useState(
    Array(platforms.length).fill(false)
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(
    Array(platforms.length).fill(false)
  );

  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleEditClick = (index) => {
    const newOpenEditModal = [...openEditModal];
    newOpenEditModal[index] = true;
    setOpenEditModal(newOpenEditModal);
  };

  const handleDeleteClick = (index) => {
    setDeleteIndex(index);
    const newOpenDeleteModal = [...openDeleteModal];
    newOpenDeleteModal[index] = true;
    setOpenDeleteModal(newOpenDeleteModal);
  };

  const handleCloseModal = (index) => {
    const newOpenEditModal = [...openEditModal];
    newOpenEditModal[index] = false;
    setOpenEditModal(newOpenEditModal);
  };

  const handleCloseDeleteModal = (index) => {
    const newOpenDeleteModal = [...openDeleteModal];
    newOpenDeleteModal[index] = false;
    setOpenDeleteModal(newOpenDeleteModal);
    setDeleteIndex(null);
  };

  return (
    <Table hoverable className="mt-4">
      <Table.Head>
        <Table.HeadCell>Name</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Emblem</Table.HeadCell>
        <Table.HeadCell>
          Action
          <span className="sr-only">Action</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {platforms.length === 0 ? (
          <Table.Row
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
            key="empty-row" // Key should be unique for each element
          >
            <Table.Cell className="p-4"></Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              ----
            </Table.Cell>
            <Table.Cell>---</Table.Cell>
            <Table.Cell>----</Table.Cell>
            <Table.Cell>
              <a
                href="#"
                className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Edit
              </a>
            </Table.Cell>
          </Table.Row>
        ) : (
          platforms.map((platform) => (
            <React.Fragment key={platform.id}>
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={platform.id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {platform.name}
                </Table.Cell>
                <Table.Cell>{platform.description}</Table.Cell>
                <Table.Cell>
                  <Avatar
                    className=" shadow-lg"
                    img={platform.emblem != "" ? image(platform.emblem) : flag}
                  />
                </Table.Cell>
                <Table.Cell>
                  <div className="flex">
                    <button
                      className="outline outline-blue-600 p-1 hover:bg-blue-400 rounded mx-2"
                      onClick={() => handleEditClick(platform.id)}
                    >
                      <FiEdit color="blue" />
                    </button>
                    <button
                      className="outline outline-red-600 p-1 hover:bg-red-400  rounded mx-2"
                      onClick={() => handleDeleteClick(platform.id)}
                    >
                      <RiDeleteBin6Fill color="red" />
                    </button>
                  </div>
                </Table.Cell>
              </Table.Row>
              <PlatformEdit
                value={platform}
                openEditModal={openEditModal[platform.id]}
                onClose={() => handleCloseModal(platform.id)}
              />
              <PlatformDelete
                platform={platform}
                openDeleteModal={openDeleteModal[platform.id]}
                onClose={() => handleCloseDeleteModal(platform.id)}
              />
            </React.Fragment>
          ))
        )}
      </Table.Body>
    </Table>
  );
}

export default PlatformTable;
