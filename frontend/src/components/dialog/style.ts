import { css } from "@emotion/css";

export const drawerContainer = css`
  position: relative;
  height: 100%;
`;

export const drawerTitleContainer = css`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  position: sticky;
  top: 0;
  background-color: var(--primary-light);
  z-index: 400;
`;
