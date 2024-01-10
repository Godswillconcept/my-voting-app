import axios from "axios";
const baseUrl = "http://localhost:3300";

export const getUsers = async () => {
  try {
    const url = `${baseUrl}/users/count`;
    const response = await axios.post(url);
    const { data } = response.data;
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getPolls = async () => {
  try {
    const url = `${baseUrl}/polls/count`;
    const response = await axios.post(url);
    const { data } = response.data;
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getCandidates = async () => {
  const url = `${baseUrl}/candidates/count`;
  const response = await axios.post(url);
  try {
    const { data } = response.data;
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const getPlatforms = async () => {
  const url = `${baseUrl}/platforms/count`;
  const response = await axios.post(url);
  try {
    const { data } = response.data;
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
