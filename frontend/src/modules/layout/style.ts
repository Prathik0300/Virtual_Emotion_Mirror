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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  height: calc(100% - 170px);
  max-height: calc(100% - 170px);
  overflow: hidden;
`;
