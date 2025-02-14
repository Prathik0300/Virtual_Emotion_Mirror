import { css } from "@emotion/css";

export const circularProgress = css`
  height: 24px;
  width: 24px;
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const analyzeBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: bold;
  padding: 12px 24px;
  color: white;
  background-color: #3f51b5;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: not-allowed;
  opacity: 0.8;
  min-width: 160px;
`;
