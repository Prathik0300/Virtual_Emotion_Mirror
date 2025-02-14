import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { OAuthValidate, setOAuthLoginData } from "../utils/OAuthValidation";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "./useContext/useUserContext";
import { isEmptyData } from "../utils/commonUtils";
import { useToastMessage } from "./useToastMessage";
import { useRouter } from "next/router";

export const useOAuthValidation = () => {
  const {
    userContextValues: { userProfile },
    userContextUpdater: { setUserProfile },
  } = useUserContext();

  const { replace } = useRouter();
  const { triggerSuccessToast, triggerErrorToast } = useToastMessage();
  const { mutate: authValidate } = useMutation({
    mutationFn: OAuthValidate,
    onSuccess: (response) => {
      onSuccessfulLogin(response.data);
    },
    onError: () => triggerErrorToast("Unable to login. Please Try again!"),
  });

  const login = useGoogleLogin({
    onSuccess: (res) => {
      setUserProfile((prev) => ({
        ...prev,
        ...res,
      }));
      authValidate(res);
    },
    onError: () => triggerErrorToast("Unable to login. Please Try again!"),
  });

  const onSuccessfulLogin = (userData: any) => {
    setUserProfile((prev) => ({
      ...prev,
      ...userData,
    }));
    triggerSuccessToast("Successfully Logged In!");
    replace("/");
  };

  const GoogleOneTap = () => {
    return (
      <div style={{ display: "none" }}>
        <GoogleLogin
          useOneTap
          onSuccess={(res) => {
            const userData = jwtDecode(res.credential as string);
            onSuccessfulLogin(userData);
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    if (!isEmptyData(userProfile)) {
      setOAuthLoginData(userProfile);
    }
  }, [userProfile]);

  return { userProfile, login, GoogleOneTap };
};
