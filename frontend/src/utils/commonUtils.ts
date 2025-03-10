import { toast } from "react-toastify";
import { MONTH_MAP, PERMISSION_STATUS } from "../constants/enums";

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
    } else if (permissionStatus.state === PERMISSION_STATUS.PROMPT) {
      await navigator.mediaDevices.getUserMedia({ video: true });
      getSuccessToast("Permission granted!");
    } else if (permissionStatus.state === PERMISSION_STATUS.DENIED) {
      console.warn("Camera Permission denied!");
      getErrorToast("Camera access denied!");
    }
  } catch {
    getErrorToast("Error accessing the camera");
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

const addSuffixToDate = (date: number) => {
  let suffix = "th";

  if (date % 10 === 1 && date !== 11) {
    suffix = "st";
  } else if (date % 10 === 2 && date !== 12) {
    suffix = "nd";
  } else if (date % 10 === 3 && date !== 13) {
    suffix = "rd";
  }

  return `${date}${suffix}`;
};
export const generateGraphDataKey = (dataKey: string) => {
  if (isEmptyData(dataKey)) {
    return "";
  }
  const dataKeyArr = dataKey.trim().split("/");
  if (dataKeyArr.length === 3) {
    const month = MONTH_MAP[dataKeyArr[1]];
    return `${addSuffixToDate(parseInt(dataKeyArr[0], 10))} ${month}, ${
      dataKeyArr[2]
    }`;
  } else if (dataKeyArr.length === 2) {
    const month = MONTH_MAP[dataKeyArr[0]];
    return `${month}, ${dataKeyArr[1]}`;
  } else if (dataKeyArr.length === 1) {
    return dataKeyArr[0];
  }
};
