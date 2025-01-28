import { css } from "@emotion/css";

export const videoContainer = (isCameraActive: boolean) => css`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: calc(100% - 500px);
  top: 130px;
  left: 20px;
  display: ${isCameraActive ? "block" : "none"};
`;
