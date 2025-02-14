import { handleLogin } from "@/src/apis/auth";
import { useToastMessage } from "@/src/hooks/useToastMessage";
import { useRouter } from "next/router";
import { setLoginData } from "@/src/utils/OAuthValidation";
import { useForm } from "../../useForm";

export const useLogin = () => {
  const { email, password, error, handleOnChange, validateInput } = useForm();

  const { triggerErrorToast, triggerSuccessToast } = useToastMessage();
  const { replace } = useRouter();
  const onLogin = async () => {
    try {
      const loginResponse = await handleLogin({ email, password });
      console.log({ loginResponse });
      if (loginResponse.success) {
        replace("/");
        // triggerSuccessToast("Successfully Logged in!");
        setLoginData(loginResponse);
      } else {
        triggerErrorToast(loginResponse?.message);
      }
    } catch (error) {
      triggerErrorToast(error?.message || "Unable to login at the moment");
    }
  };

  return { email, password, error, handleOnChange, validateInput, onLogin };
};
