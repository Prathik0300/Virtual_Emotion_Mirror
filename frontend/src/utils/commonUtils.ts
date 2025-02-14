import { toast } from "react-toastify";
import { PERMISSION_STATUS } from "../constants/enums";

export const isLoginDateExpired = (
  loggedInDate: Date,
  returningDate: Date,
  expiresIn = 2592000000
) => {
  const time_difference = returningDate.getTime() - loggedInDate.getTime();
  const days = Math.round(time_difference / (1000 * 3600 * 24));
  const expires_in_days = Math.round(expiresIn / (1000 * 3600 * 24));
  if (days > expires_in_days) {
    return true;
  }
  return false;
};

export const isEmptyData = (dataStructure: any) => {
  if (dataStructure === "undefined" || dataStructure === "null") {
    return true;
  }
  if (Array.isArray(dataStructure) && dataStructure.length === 0) {
    return true;
  }
  if (
    typeof dataStructure === "object" &&
    Object.keys(dataStructure).length === 0
  ) {
    return true;
  }
  if (typeof dataStructure === "string" && !dataStructure) {
    return true;
  }
  if (!dataStructure) {
    return true;
  }
  if (typeof dataStructure === "undefined" || dataStructure === null) {
    return true;
  }

  return false;
};

export const getSuccessToast = (toastMsg: string) => toast.success(toastMsg);
export const getErrorToast = (toastMsg: string) => toast.error(toastMsg);
export const getWarningToast = (toastMsg: string) => toast.warning(toastMsg);
export const getInfoToast = (toastMsg: string) => toast.info(toastMsg);

export const askForCameraPermission = async () => {
  try {
    const permissionStatus = await navigator.permissions.query({
      name: "camera",
    });

    if (permissionStatus.state === PERMISSION_STATUS.GRANTED) {
      console.log("permission granted");
    } else if (permissionStatus.state === PERMISSION_STATUS.PROMPT) {
      console.log("Prompting for camera permission!");
      await navigator.mediaDevices.getUserMedia({ video: true });
      alert("Permission granted!");
    } else if (permissionStatus.state === PERMISSION_STATUS.DENIED) {
      console.warn("Camera Permission denied!");
      alert("Camera access denied!");
    }
  } catch (err) {
    console.log(`Error accessing the camera : ${err}`);
  }
};

export const getBase64EncodedData = (width: number, height: number) => {
  return `data:image/svg+xml;base64,${Buffer.from(
    `
  <svg width=${width} height=${height} xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#E0E0E0" rx="5" ry="5" />
  </svg>
`
  ).toString("base64")}`;
};
