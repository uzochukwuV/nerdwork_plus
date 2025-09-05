"use server";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function axiosGet(url: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fullUrl = `${apiUrl}${url}`;

  const response = await axios.get(fullUrl, config);
  return response;
}

async function axiosPost<T>(url: string, body: T) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const fullUrl = `${apiUrl}${url}`;

  const response = await axios.post(fullUrl, body, config);
  return response;
}

async function axiosImagePost<T>(url: string, body: T) {
  const config = {
    headers: {
      "Content-Type": "multipart/formData",
    },
  };
  const fullUrl = `${apiUrl}${url}`;

  const response = await axios.post(fullUrl, body, config);
  return response;
}

export { axiosGet, axiosPost, axiosImagePost };
