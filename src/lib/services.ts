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
    const token = localStorage.getItem("token");
    const response = await api.get(`/users/${storedUser._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("User API failed", error);
    throw error;
  }
};

export const saveProfile = async (userProfile: any) => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  const response = await api.put(`/users/${storedUser._id}`, {
    ...userProfile,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export async function registerUser({ name, email, password }: { name: string; email: string; password: string }) {
  const res = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password
    }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Registration failed");
  }
  return res.json();
}

export async function loginUser({ email, password }: { email: string; password: string }) {
  const res = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Login failed");
  }
  return res.json();
}

export async function getSkills() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/skills", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch skills");
  }
  return res.json();
}

export async function createSkill(name: string) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/skills", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to create skill");
  }
  return res.json();
}