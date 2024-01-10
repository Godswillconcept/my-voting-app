import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { getUsers } from "./dashboardAPI";
import { full_name, image } from "../../helpers/helper";
import member from "../../images/members/member1.png";
import member2 from "../../images/members/member2.png";

function DashboardUsers() {
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    const result = await getUsers();
    setUsers(result);
    console.log(result);
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="col-span-2 bg-white rounded-xl dark:bg-slate-950">
      <div className="flex justify-between items-center p-4 rounded-t-xl border-b shadow">
        <h6 className="text-lg font-medium dark:text-white">
          Registered Users
        </h6>
        <Link
          to="/users"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          See all
        </Link>
      </div>
      <div className="overflow-x-auto overflow-y-auto h-[400px] py-2">
        <Table>
          <Table.Head>
            <Table.HeadCell>Avatar</Table.HeadCell>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users !== 0 ? (
              <>
                {users.map((user, index) => (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>
                      <img
                        src={
                          user.photo !== null
                            ? image(user.photo)
                            : user.gender === "Male"
                            ? member  
                            : member2
                        }
                        className="rounded-full w-12"
                      />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {full_name(user.first_name, user.last_name)}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                    <Table.Cell>{user.gender}</Table.Cell>
                  </Table.Row>
                ))}
              </>
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>---</Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  ---
                </Table.Cell>
                <Table.Cell>---</Table.Cell>
                <Table.Cell>---</Table.Cell>
                <Table.Cell>---</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default DashboardUsers;
