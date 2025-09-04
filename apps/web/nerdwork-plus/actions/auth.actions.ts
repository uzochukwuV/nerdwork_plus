"use server";

import { axiosPost } from "@/lib/api/apiClient";
import axios from "axios";

type createReaderProfileData = {
  fullName: string;
  genres: string[];
};

export const googleAuth = async (idToken: string) => {
  try {
    const response = await axiosPost("auth/signin", { idToken });

    console.log("response", response.data);

    return {
      success: true,
      data: response.data,
      message: "Authentication Successful",
      status: response?.status ?? 200,
    };
  } catch (error: unknown) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error?.status ?? 500,
        message:
          error?.response?.data?.detail ??
          error.response?.data.message ??
          "Google sign in failed. Please try again.",
      };
    }
    return {
      success: false,
      status: 500,
      message: "Google sign in failed. Please try again.",
    };
  }
};

export const createReaderProfile = async (data: createReaderProfileData) => {
  try {
    const requestBody = {
      fullName: data.fullName,
      genres: data.genres,
    };

    console.log(requestBody);
    const response = await axiosPost("api/profile/reader", requestBody);

    return {
      success: true,
      data: response.data,
      message: "Reader Profile created successfully.",
    };
  } catch (error: unknown) {
    console.error("Reader profile creation failed:", error);

    if (axios.isAxiosError(error)) {
      return {
        success: false,
        status: error?.status,
        message:
          error?.response?.data?.detail ||
          error?.response?.data?.message ||
          "Failed to create reader profile. Please try again.",
      };
    }
    return {
      success: false,
      status: 500,
      message: "Failed to create reader profile. Please try again.",
    };
  }
};
