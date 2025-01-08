import { EMAIL_REGEX, NAME_REGEX } from "../constants";
import { isEmptyData } from "./commonUtils";

export const isPasswordConfirmed = (
  password: string,
  confirmPassword: string
) => {
  if (isEmptyData(password) || isEmptyData(confirmPassword)) return true;
  if (password === confirmPassword) return true;
  return false;
};

export const isValidName = (name: string) => {
  if (isEmptyData(name)) return true;
  return NAME_REGEX.test(name);
};

export const isValidEmail = (email: string) => {
  if (isEmptyData(email)) return true;
  return EMAIL_REGEX.test(email);
};
