/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const createOrLoginUser = async (userData: any) => {
  try {
    const response = await api.post("/auth/google", userData);
    return response.data;
  } catch (error) {
    console.error("Auth failed", error);
    throw error;
  }
};
