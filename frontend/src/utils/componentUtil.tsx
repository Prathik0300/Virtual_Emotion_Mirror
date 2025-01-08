import LoginButton from "../components/button/navbar/login";
import SignupButton from "../components/button/navbar/signup";
import { isEmptyData } from "./commonUtils";

export const getPathBasedNavbarComponents = (
  path = ""
): Array<React.ReactNode> => {
  if (isEmptyData(path)) return [<></>];
  if (path === "/login") {
    return [<SignupButton key="signup-btn" />];
  }
  if (path === "/signup") {
    return [<LoginButton key="login-btn" />];
  }
  return [<></>];
};
