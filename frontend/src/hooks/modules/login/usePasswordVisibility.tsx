import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

export const usePasswordVisibility = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = (isConfirmPassword = false) => {
    return () => {
      if (isConfirmPassword) setIsConfirmPasswordVisible((prev) => !prev);
      else setIsPasswordVisible((prev) => !prev);
    };
  };

  const PasswordVisibilityIcon = ({
    isPasswordVisible,
  }: {
    isPasswordVisible: boolean;
  }) => {
    return (
      <>{isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}</>
    );
  };

  return {
    isPasswordVisible,
    togglePasswordVisibility,
    PasswordVisibilityIcon,
    isConfirmPasswordVisible,
  };
};
