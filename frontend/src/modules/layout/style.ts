import { css } from "@emotion/css";

export const layoutContainer = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow-x: hidden;
`;

export const childContainer = css`
  max-width: 100%;
  height: 100%;
  max-height: calc(100% - 170px);
`;
