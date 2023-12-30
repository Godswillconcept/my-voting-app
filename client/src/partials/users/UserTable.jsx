import React, { useState, useEffect } from "react";
import { Modal, Pagination, Table } from "flowbite-react";
import male from "../../images/profile (2).svg";
import { full_name, image } from "../../helpers/helper";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import UserDelete from "./UserDelete";
import UserEdit from "./UserEdit";

function UserTable({ users }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Set your desired page size here
  const [totalPages, setTotalPages] = useState(0); // Initialize with a default value
  const [user, setUser] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    setTotalPages(Math.ceil(users.length / pageSize));
  }, [users, pageSize]);

  const onPageChange = (page) => setCurrentPage(page);


  const handleEditClick = (clickedUser) => {
    setOpenEditModal(true);
    setUser(clickedUser);
  };

  const handleDeleteClick = (clickedUser) => {
    setUser(clickedUser);
    setOpenDeleteModal(true);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, users.length);
  const displayedUsers = users.slice(startIndex, endIndex);

  return (
    <>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Avatar</Table.HeadCell>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>
              Actions
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users.length === 0 ? (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  ---
                </Table.Cell>
                <Table.Cell>---</Table.Cell>
                <Table.Cell>---</Table.Cell>
                <Table.Cell>---</Table.Cell>
                <Table.Cell>---</Table.Cell>
                <Table.Cell>---</Table.Cell>
                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Actions
                  </a>
                </Table.Cell>
              </Table.Row>
            ) : (
              displayedUsers.map((user) => (
                <React.Fragment key={user.id}>
                  <Table.Row
                    key={user.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <img
                        className="rounded-full h-10"
                        src={user.photo != null ? image(user.photo) : male}
                        alt="user image"
                      />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {full_name(user.first_name, user.last_name)}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>{user.gender}</Table.Cell>
                    <Table.Cell>
                      <div
                        className={`p-1 text-center text-xs ${
                          user.role === "Admin"
                            ? "bg-green-500"
                            : user.role === "Voter"
                            ? "bg-red-500"
                            : ""
                        } rounded-full text-white`}
                      >
                        {user.role}
                      </div>
                    </Table.Cell>

                    <Table.Cell>
                      <div className="flex">
                        <button
                          className="outline outline-blue-600 p-1 hover:bg-blue-400 rounded mx-2"
                          onClick={() => handleEditClick(user)}
                        >
                          <FiEdit color="blue" />
                        </button>
                        <button
                          className="outline outline-red-600 p-1 hover:bg-red-400 rounded mx-2"
                          onClick={() => handleDeleteClick(user)}
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
      </div>
      <div className="flex justify-between my-4">
        <h3>{`Showing ${startIndex + 1} to ${endIndex} of ${users.length}`}</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Modal.Header>Edit User</Modal.Header>
        <Modal.Body>
          <UserEdit value={user} onClose={() => setOpenEditModal(false)} />
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
          <UserDelete value={user} onClose={() => setOpenDeleteModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserTable;
