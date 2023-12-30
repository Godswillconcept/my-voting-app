import React, { useEffect, useState } from "react";
import { Avatar, Pagination, Table, Modal } from "flowbite-react";
import { image, truncateSentenceByWords } from "../../helpers/helper";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import flag from "../../images/emblem.jpeg";
import PlatformEdit from "./PlatformEdit";
import PlatformDelete from "./PlatformDelete";

function PlatformTable({ platforms }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Set your desired page size here
  const [totalPages, setTotalPages] = useState(1); // Initialize with a default value
  const [platform, setPlatform] = useState({});

  useEffect(() => {
    setTotalPages(Math.ceil(platforms.length / pageSize));
  }, [platforms, pageSize]);

  const onPageChange = (page) => setCurrentPage(page);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleEditClick = (clickedPlatform) => {
    setPlatform(clickedPlatform);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (clickedPlatform) => {
    setPlatform(clickedPlatform);
    setOpenDeleteModal(true);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, platforms.length);
  const displayedPlatforms = platforms.slice(startIndex, endIndex);

  return (
    <React.Fragment>
      <Table striped className="mt-4">
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
            displayedPlatforms.map((platform) => (
              <React.Fragment key={platform.id}>
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={platform.id}
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {platform.name}
                  </Table.Cell>
                  <Table.Cell>
                    {truncateSentenceByWords(platform.description, 15)}
                  </Table.Cell>
                  <Table.Cell>
                    <Avatar
                      className=" shadow-lg"
                      img={
                        platform.emblem != null ? image(platform.emblem) : flag
                      }
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex">
                      <button
                        className="outline outline-blue-600 p-1 hover:bg-blue-400 rounded mx-2"
                        onClick={() => handleEditClick(platform)}
                      >
                        <FiEdit color="blue" />
                      </button>
                      <button
                        className="outline outline-red-600 p-1 hover:bg-red-400  rounded mx-2"
                        onClick={() => handleDeleteClick(platform)}
                      >
                        <RiDeleteBin6Fill color="red" />
                      </button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            ))
          )}
        </Table.Body>
      </Table>
      <div className="flex justify-between my-8">
        <h3>{`Showing ${startIndex + 1} to ${endIndex} of ${
          platforms.length
        }`}</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Modal.Header>Edit Platform</Modal.Header>
        <Modal.Body>
          <PlatformEdit value={platform} onClose={() => setOpenEditModal(false)} />
        </Modal.Body>
      </Modal>
      <Modal
        show={openDeleteModal}
        size="md"
        onClose={() => setOpenDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <PlatformDelete value={platform} onClose={() => setOpenDeleteModal(false)} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default PlatformTable;
