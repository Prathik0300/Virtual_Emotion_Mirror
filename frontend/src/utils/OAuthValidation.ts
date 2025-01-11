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

export const setLoginData = (profile: any) => {
  setLocalStorageData(VEM_USER, {
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
  setLocalStorageData(VEM_USER, {
    access_token: profile["access_token"],
    token_type: profile["token_type"],
    email: profile["email"],
    family_name: profile["family_name"],
    given_name: profile["given_name"],
    id: profile["id"],
    name: profile["name"],
    picture: profile["picture"],
    verified_email: profile["verified_email"],
    last_login: new Date(),
    expires_in: (profile?.expires_in || 3600) * 1000,
  });

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
