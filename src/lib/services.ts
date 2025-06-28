/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const createOrLoginUser = async (userData: any) => {
  try {
    const response = await api.post("/users/google-login", userData);
    return response.data;
  } catch (error) {
    console.error("Auth failed", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await api.get(`/users/${storedUser._id}`);
    return response.data;
  } catch (error) {
    console.error("User API failed", error);
    throw error;
  }
};
