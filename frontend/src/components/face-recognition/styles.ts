import {
  mediaQueryMaxWidth,
  mediaQueryMinWidth,
} from "@/src/utils/mediaQueries";
import { css } from "@emotion/css";

export const faceRecognitionContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${mediaQueryMinWidth.sm} {
    align-items: center;
    justify-content: center;
  }
`;

export const videoContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  z-index: 100;

  ${mediaQueryMaxWidth.sm} {
    min-height: 280px;
  }
`;

export const videoStyles = (isCameraActive: boolean) => css`
  width: ${isCameraActive ? "500px" : "0px"};
  height: ${isCameraActive ? "400px" : "0px"};
  position: relative;
  display: ${isCameraActive ? "block" : "none"};
  z-index: 100;

  ${mediaQueryMaxWidth.sm} {
    width: 90%;
    height: 90%;
  }
`;

export const canvasStyles = (isCameraActive: boolean) => css`
  position: absolute;
  top: 14px;
  left: 25px;
  width: ${isCameraActive ? "500px" : "0px"};
  height: ${isCameraActive ? "375px" : "0px"};
  z-index: 222;
  display: ${isCameraActive ? "block" : "none"};

  ${mediaQueryMaxWidth.sm} {
    width: 90%;
    height: 100%;
    top: 0px;
    left: 21px;
  }
`;

export const captureBtn = css`
  background-color: var(--primary-accent);
  color: var(--secondary-accent);
  font-weight: bold;
  margin: 4px 20px;
  font-size: 16px;
  width: 92%;
  :hover {
    background: var(--primary-accent);
  }
`;

export const imageCaptured = css`
  position: absolute;
  top: 20px;
  left: 25px;
  width: 500px;
  height: 375px;
  z-index: 422;
  display: block;

  ${mediaQueryMaxWidth.sm} {
    width: 90%;
    height: 100%;
    top: 0px;
    left: 21px;
  }
`;

export const imageContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 500px;
  height: 385px;
  z-index: 400;

  ${mediaQueryMaxWidth.sm} {
    width: 90%;
    height: 280px;
    top: 0px;
    left: 21px;
  }
`;

export const btnContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 21px;
  gap: 5px;
  width: 100%;
`;

export const retakeBtn = css`
  color: var(--primary-accent);
  border: 1px solid var(--primary-accent);
  font-weight: bold;
  transition: all 300ms ease-in-out;
  font-size: 16px;
  :hover {
    background: var(--primary-accent);
    color: var(--secondary-accent);
  }
`;

export const btn = css`
  width: 50%;
`;

export const analyzeBtn = css`
  background-color: var(--primary-accent);
  color: var(--secondary-accent);
  font-weight: bold;
  font-size: 16px;
  transition: all 300ms ease-in-out;
  :hover {
    background: var(--primary-accent);
  }
`;
