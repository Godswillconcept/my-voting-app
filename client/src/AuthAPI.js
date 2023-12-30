// AuthAPI.js
import axios from "axios";

const baseURL = "http://localhost:3300"; // Replace with your actual API base URL

export const login = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/users/login`, formData);
    
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${baseURL}/users/logout`);
    
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const register = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/users/user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};
