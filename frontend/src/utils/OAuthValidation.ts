import axios from "axios";
import { setLocalStorageData } from "./localStorageUtil";
import { ACCESS_TOKEN, VEM_USER } from "../constants/keys";
import { setCookieData } from "./cookieUtil";
import { isEmptyData } from "./commonUtils";

export const OAuthValidate = async (user: any) => {
  if (isEmptyData(user)) return new Error("User data not available!");

  try {
    return await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      }
    );
  } catch {
    return new Error("Unable to Validate!");
  }
};

export const formatResponse = (responseData: any) => {
  return {
    userId: responseData?.["userId"] || responseData?.["id"],
    email: responseData["email"] || responseData?.["emailId"],
    family_name: responseData?.["lastName"] || responseData?.["family_name"],
    given_name: responseData?.["firstName"] || responseData?.["given_name"],
    verified_email: responseData["email"],
    last_login: new Date(),
    expires_in: (responseData?.expires_in || 3600) * 1000,
    access_token: responseData?.["access_token"],
  };
};
export const setLoginData = (profile: any) => {
  setLocalStorageData(VEM_USER, {
    userId: profile["userId"],
    email: profile["email"],
    family_name: profile["lastName"],
    given_name: profile["firstName"],
    verified_email: profile["email"],
    last_login: new Date(),
    expires_in: 3600 * 1000,
  });

  setCookieData(
    VEM_USER,
    JSON.stringify({
      last_login: new Date(),
      expires_in: 3600 * 1000,
    }),
    {
      expires: 30,
      path: "",
      sameSite: "Strict",
      secure: true,
    }
  );
};

export const setOAuthLoginData = (profile: any) => {
  setLocalStorageData(VEM_USER, profile);

  setCookieData(ACCESS_TOKEN, profile["access_token"], {
    expires: 30,
    path: "",
    sameSite: "Strict",
    secure: true,
  });

  setCookieData(
    VEM_USER,
    JSON.stringify({
      last_login: new Date(),
      expires_in: (profile?.expires_in || 3600) * 1000,
    }),
    {
      expires: 30,
      path: "",
      sameSite: "Strict",
      secure: true,
    }
  );
};
