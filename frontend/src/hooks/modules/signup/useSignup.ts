import { useRouter } from "next/router";
import { useForm } from "../../useForm";
import { useToastMessage } from "@/src/hooks/useToastMessage";
import { handleSignup } from "@/src/apis/auth";

export const useSignup = () => {
  const {
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    error,
    isError,
    handleOnChange,
    validateInput,
  } = useForm();
  const { triggerErrorToast, triggerSuccessToast } = useToastMessage();
  const { replace } = useRouter();

  const onSignup = async () => {
    if (isError) {
      return triggerErrorToast("Invalid data");
    }
    try {
      const signupResponse = await handleSignup({
        firstName,
        lastName,
        email,
        password,
      });
      if (signupResponse?.success) {
        triggerSuccessToast("Successfully created account");
        replace("/login");
      } else {
        triggerErrorToast(signupResponse?.message);
      }
    } catch (error) {
      triggerErrorToast(error?.message || "Unable to signup at the moment");
    }
  };

  return {
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    error,
    handleOnChange,
    validateInput,
    onSignup,
  };
};
