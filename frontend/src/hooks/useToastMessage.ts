import { toast } from "react-toastify";

export const useToastMessage = () => {
  const triggerSuccessToast = (toastMsg: string) => toast.success(toastMsg);
  const triggerErrorToast = (toastMsg: string) => toast.error(toastMsg);
  const triggerWarningToast = (toastMsg: string) => toast.warning(toastMsg);
  const triggerInfoToast = (toastMsg: string) => toast.info(toastMsg);

  return {
    triggerSuccessToast,
    triggerErrorToast,
    triggerWarningToast,
    triggerInfoToast,
  };
};
