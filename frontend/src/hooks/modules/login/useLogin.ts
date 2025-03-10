import { handleLogin } from "@/src/apis/auth";
import { useToastMessage } from "@/src/hooks/useToastMessage";
import { useRouter } from "next/router";
import { formatResponse, setLoginData } from "@/src/utils/OAuthValidation";
import { useForm } from "../../useForm";
import { useUserContext } from "../../useContext/useUserContext";

export const useLogin = () => {
  const { email, password, error, handleOnChange, validateInput } = useForm();
  const {
    userContextUpdater: { setUserProfile },
  } = useUserContext();
  const { triggerErrorToast, triggerSuccessToast } = useToastMessage();
  const { replace } = useRouter();
  const onLogin = async () => {
    try {
      const loginResponse = await handleLogin({ email, password });
      if (loginResponse.success) {
        const formattedData = formatResponse(loginResponse);
        triggerSuccessToast("Successfully Logged in!");
        setLoginData(formattedData);
        setUserProfile(formattedData);
        replace("/");
      } else {
        triggerErrorToast(loginResponse?.message);
      }
    } catch (error) {
      triggerErrorToast(error?.message || "Unable to login at the moment");
    }
  };

  return { email, password, error, handleOnChange, validateInput, onLogin };
};
