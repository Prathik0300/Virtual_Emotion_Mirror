import { request } from "../lib/Axios";
import { isEmptyData } from "../utils/commonUtils";

export const handleLogin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (isEmptyData(email) || isEmptyData(password)) {
    return {
      success: false,
      message: "Invalid email id or password",
    };
  }
  try {
    const response = await request().post(
      "/auth/login",
      {
        emailId: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.message || "",
    };
  }
};

export const handleSignup = async ({
  firstName,
  lastName,
  email,
  password,
}: any) => {
  if (
    isEmptyData(firstName) ||
    isEmptyData(lastName) ||
    isEmptyData(email) ||
    isEmptyData(password)
  ) {
    return {
      success: false,
      message: "Bad Request",
    };
  }

  try {
    const response = await request().post("/auth/signup", {
      firstName,
      lastName,
      emailId: email,
      password,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error?.message || "",
    };
  }
};
