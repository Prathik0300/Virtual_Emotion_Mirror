import { css } from "@emotion/css";

export const dashboardContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: max-content;
  background-color: var(--primary-accent);
  color: var(--secondary-accent);
  border-radius: 10px;
  gap: 25px;
  padding: 15px;
`;

export const title = css`
  font-weight: bold;
  font-size: 30px;
`;

export const contentContainer = css`
  display: flex;
  width: 100%;
  height: 100%;
`;