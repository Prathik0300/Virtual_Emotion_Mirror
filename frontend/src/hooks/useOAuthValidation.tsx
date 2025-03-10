import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  formatResponse,
  OAuthValidate,
  setLoginData,
  setOAuthLoginData,
} from "../utils/OAuthValidation";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useUserContext } from "./useContext/useUserContext";
import { isEmptyData } from "../utils/commonUtils";
import { useToastMessage } from "./useToastMessage";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export const useOAuthValidation = () => {
  const {
    userContextValues: { userProfile },
    userContextUpdater: { setUserProfile },
  } = useUserContext();
  console.log(">>>> ", { userProfile });
  const { replace } = useRouter();
  const { triggerSuccessToast, triggerErrorToast } = useToastMessage();
  const { mutate: authValidate } = useMutation({
    mutationFn: OAuthValidate,
    onSuccess: (response) => {
      onGoogleLoginSuccess(response.data);
    },
    onError: () => triggerErrorToast("Unable to login. Please Try again!"),
  });

  const login = useGoogleLogin({
    onSuccess: (res) => {
      const formattedData = formatResponse({
        ...res,
        access_token: res.access_token,
      });
      console.log(">>>> RES : ", { res });
      console.log(">>>> RES : ", { formattedData });
      setUserProfile(formattedData);
      authValidate(res);
    },
    onError: () => triggerErrorToast("Unable to login. Please Try again!"),
  });

  const onGoogleLoginSuccess = (userData: any) => {
    console.log(">>>> D2 ", { userData });
    const formattedData = formatResponse({ ...userProfile, ...userData });
    console.log(">>>> D2 ", { formattedData });
    setUserProfile(formattedData);
    triggerSuccessToast("Successfully Logged In!");
    replace("/");
  };

  const onGoogleOneTapSuccess = (userData: any) => {
    console.log(">>>> D1 ", { userData });
    const formattedData = formatResponse({ ...userData, userId: uuidv4() });
    console.log(">>>> D1 ", { formattedData });
    setUserProfile(formattedData);
    setLoginData(formattedData);
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
            console.log(">>>> D", { res, userData });
            onGoogleOneTapSuccess({
              ...userData,
              access_token: res.credential,
            });
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
