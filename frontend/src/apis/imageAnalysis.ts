import { request } from "../lib/Axios";
import { isEmptyData } from "../utils/commonUtils";

export const saveImageAnalysis = async (blobUrl: string, emailId: string) => {
  if (isEmptyData(blobUrl) || isEmptyData(emailId)) {
    return { success: false, message: "invalid image path or userId!" };
  }
  try {
    const res = await fetch(blobUrl);
    const blob = await res.blob();
    const formData = new FormData();
    formData.append("file", blob, "analysis_image.png");
    formData.append("emailId", emailId);
    const response = await request().post("/vem/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    return { success: false, message: "Error" };
  }
};

export const getUserEmotionAnalysis = async (emailId: string) => {
  if (isEmptyData(emailId)) {
    return {
      success: false,
      message: "userId not valid. Please try again later!",
    };
  }
  try {
    const response = await request().get(`/analysis/${emailId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error };
  }
};
