import axiosClient from "../../../services/axiosClient";

export const fetchUser = async (username) => {
  const response = await axiosClient.get(`/users/${username}`);
  return response.data;
};
