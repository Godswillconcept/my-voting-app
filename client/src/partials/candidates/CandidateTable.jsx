import React, { useState, useEffect } from "react";
import { Modal, Pagination, Table } from "flowbite-react";
import male from "../../images/profile (2).svg";
import { image, truncateSentenceByWords } from "../../helpers/helper";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import CandidateDelete from "../candidates/CandidateDelete";
import CandidateEdit from "../candidates/CandidateEdit";

function CandidateTable({ candidates }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); // Set your desired page size here
  const [totalPages, setTotalPages] = useState(1); // Initialize with a default value
  const [candidate, setCandidate] = useState({});

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    setTotalPages(Math.ceil(candidates.length / pageSize));
  }, [candidates, pageSize]);

  const onPageChange = (page) => setCurrentPage(page);

  const handleEditClick = (clickedCandidate) => {
    setOpenEditModal(true);
    setCandidate(clickedCandidate);
  };

  const handleDeleteClick = (clickedCandidate) => {
    setOpenDeleteModal(true);
    setCandidate(clickedCandidate);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, candidates.length);
  const displayedCandidates = candidates.slice(startIndex, endIndex);

  return (
    <React.Fragment>
      <div className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Bio</Table.HeadCell>
            <Table.HeadCell>Platform</Table.HeadCell>
            <Table.HeadCell>Photo</Table.HeadCell>
            <Table.HeadCell>
              Actions
              <span className="sr-only">Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {candidates.length === 0 ? (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  ---
                </Table.Cell>
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
              displayedCandidates.map((candidate) => (
                <React.Fragment key={candidate.id}>
                  <Table.Row
                    key={candidate.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {candidate.name}
                    </Table.Cell>
                    <Table.Cell>
                      {truncateSentenceByWords(candidate.bio, 30)}{" "}
                    </Table.Cell>
                    <Table.Cell>
                      {candidate.platform_id != null
                        ? candidate.platform.name
                        : "Independent Candidacy"}
                    </Table.Cell>{" "}
                    {/* Update this line */}
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      <img
                        className="rounded-md h-10"
                        src={
                          candidate.photo != null
                            ? image(candidate.photo)
                            : male
                        }
                        alt="candidate image"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex">
                        <button
                          className="outline outline-blue-600 p-1 hover:bg-blue-400 rounded mx-2"
                          onClick={() => handleEditClick(candidate)}
                        >
                          <FiEdit color="blue" />
                        </button>
                        <button
                          className="outline outline-red-600 p-1 hover:bg-red-400 rounded mx-2"
                          onClick={() => handleDeleteClick(candidate)}
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
        <h3>{`Showing ${startIndex + 1} to ${endIndex} of ${
          candidates.length
        }`}</h3>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Modal.Header>Edit Candidate</Modal.Header>
        <Modal.Body>
          <CandidateEdit value={candidate} onClose={() => setOpenEditModal(false)} />
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
          <CandidateDelete value={candidate} onClose={() => setOpenDeleteModal(false)} />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default CandidateTable;
