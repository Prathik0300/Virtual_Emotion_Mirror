import { BaseSyntheticEvent, useState } from "react";
import { isEmptyData } from "../utils/commonUtils";
import { debounce } from "lodash-es";
import {
  isPasswordConfirmed,
  isValidEmail,
  isValidName,
} from "../utils/formUtil";

export const useForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    firstName: { status: false, msg: "" },
    lastName: { status: false, msg: "" },
    email: { status: false, msg: "" },
    password: { status: false, msg: "" },
    confirmPassword: { status: false, msg: "" },
  });

  const validateInput = (fieldId: string) => {
    return () => {
      if (isEmptyData(fieldId)) return;
      let isError = false;
      if (fieldId === "firstName") {
        isError = !isValidName(firstName);
        setError((prev) => ({
          ...prev,
          firstName: {
            status: isError,
            msg: isError ? "Invalid First Name" : "",
          },
        }));
      }
      if (fieldId === "lastName") {
        isError = !isValidName(lastName);
        setError((prev) => ({
          ...prev,
          lastName: {
            status: isError,
            msg: isError ? "Invalid Last Name" : "",
          },
        }));
      }
      if (fieldId === "email") {
        isError = !isValidEmail(email);
        setError((prev) => ({
          ...prev,
          email: {
            status: isError,
            msg: isError ? "Invalid Email ID" : "",
          },
        }));
      }
      if (fieldId === "confirmPassword") {
        isError = !isPasswordConfirmed(password, confirmPassword);
        setError((prev) => ({
          ...prev,
          confirmPassword: {
            status: isError,
            msg: isError ? "Passwords don't match" : "",
          },
        }));
      }
    };
  };

  const debounceUpdateForm = debounce((value: string, fieldId: string) => {
    if (isEmptyData(fieldId)) return;

    if (fieldId === "firstName") setFirstName(value);
    if (fieldId === "lastName") setLastName(value);
    if (fieldId === "email") setEmail(value);
    if (fieldId === "password") setPassword(value);
    if (fieldId === "confirmPassword") setConfirmPassword(value);
  }, 50);

  const handleOnChange = (e: BaseSyntheticEvent, fieldId: string) => {
    const { value } = e.target;
    debounceUpdateForm(value, fieldId);
  };
  return {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    error,
    handleOnChange,
    validateInput,
  };
};
