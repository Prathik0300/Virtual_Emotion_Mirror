import {
  UserContextValue,
  UserContextUpdater,
} from "@/src/context/UserContext";
import { useContext } from "react";

export const useUserContext = () => {
  const userContextValues = useContext(UserContextValue) || {};
  const userContextUpdater = useContext(UserContextUpdater) || {};

  return { userContextValues, userContextUpdater };
};
