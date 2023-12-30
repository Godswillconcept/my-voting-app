import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const url = "http://localhost:3300/users";
      const response = await axios.get(url);
      const { data } = response.data;
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (newUser) => {
    try {
      const url = "http://localhost:3300/users/user";
      const response = await axios.post(url, newUser, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      });

      fetchUsers();
    } catch (error) {
      console.log({ status: "failed", data: error });
    }
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};
