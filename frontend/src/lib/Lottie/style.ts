import { css } from "@emotion/css";

export const lottieStyles = (
  isCursorPointer: boolean,
  width: number,
  height: number
) => css`
  cursor: ${isCursorPointer ? "pointer" : "default"};
  width: ${width};
  height: ${height};
`;
