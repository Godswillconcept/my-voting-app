import React from "react";
import { Avatar, Checkbox, Table } from "flowbite-react";
import { image } from "../../helpers/helper";
import { FiEdit } from "react-icons/fi";
import { FcFullTrash } from "react-icons/fc";
import { PiEyeFill } from "react-icons/pi";

function PlatformTable({ platforms }) {
  return (
    <Table hoverable className="mt-4">
      <Table.Head>
        <Table.HeadCell className="p-4"></Table.HeadCell>
        <Table.HeadCell>Platform name</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
        <Table.HeadCell>Emblem</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Action</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {platforms.length === 0 ? (
          <Table.Row
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
            key="empty-row" // Key should be unique for each element
          >
            <Table.Cell className="p-4">
              <Checkbox />
            </Table.Cell>
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
            <Table.Row
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              key={platform.id}
            >
              <Table.Cell className="p-4">
                <Checkbox />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {platform.name}
              </Table.Cell>
              <Table.Cell>{platform.description}</Table.Cell>
              <Table.Cell>
                <Avatar img={image(platform.emblem)} />{" "}
              </Table.Cell>
              <Table.Cell>
                <div className="flex">
                  <a
                    href={`/platforms/${platform.id}/view`}
                    className="font-medium px-1 text-green-600 hover:underline dark:text-green-500"
                  >
                    <PiEyeFill />
                  </a>
                  <a
                    href={`/platforms/${platform.id}/edit`}
                    className="font-medium px-1 text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <FiEdit />
                  </a>
                  <a
                    href={`/platforms/${platform.id}/delete`}
                    className="font-medium px-1 text-red-600 hover:underline dark:text-red-500"
                  >
                    <FcFullTrash />
                  </a>
                </div>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table>
  );
}

export default PlatformTable;
