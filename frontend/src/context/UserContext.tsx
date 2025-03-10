import { createContext, useEffect, useMemo, useState } from "react";
import {
  getLocalStorageData,
  removeLocalStorageData,
} from "../utils/localStorageUtil";
import { ACCESS_TOKEN, VEM_USER } from "../constants/keys";
import { getCookieData, removeCookieData } from "../utils/cookieUtil";
import { isEmptyData } from "../utils/commonUtils";

export const UserContextValue = createContext({});
export const UserContextUpdater = createContext({});

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfile, setUserProfile] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check Cookie Data
  const access_token = useState(() => {
    const token = getCookieData(ACCESS_TOKEN);
    console.log({ token });
    if (token) {
      return token;
    }
    return "";
  });

  // Check Local Storage for user info
  const vem_user = JSON.parse(getLocalStorageData(VEM_USER) || "{}");

  useEffect(() => {
    if (isEmptyData(access_token)) {
      removeLocalStorageData(VEM_USER);
      setIsLoggedIn(false);
      removeCookieData(VEM_USER);
    } else {
      setIsLoggedIn(true);
      setUserProfile(vem_user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValues = useMemo(
    () => ({
      accessToken: access_token[0],
      userProfile,
      isLoggedIn,
    }),
    [access_token, userProfile, isLoggedIn]
  );

  const contextUpdater = useMemo(
    () => ({
      setUserProfile,
    }),
    [setUserProfile]
  );

  return (
    <UserContextUpdater.Provider value={contextUpdater}>
      <UserContextValue.Provider value={contextValues}>
        {children}
      </UserContextValue.Provider>
    </UserContextUpdater.Provider>
  );
};

export default UserContextProvider;
