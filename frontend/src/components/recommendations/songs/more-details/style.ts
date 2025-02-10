import { mediaQueryMaxWidth } from "@/src/utils/mediaQueries";
import { css } from "@emotion/css";

export const songDetailsContainer = css`
  display: flex;
  align-items: start;
  justify-content: space-around;
  width: 100%;
  padding: 0 20px 20px 20px;
  gap: 20px;
  ${mediaQueryMaxWidth.sm} {
    padding: 20px;
  }
`;

export const songImageContainer = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const songDetailsActionContainer = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  width: 100%;
`;

export const iconBase = css`
  background-color: var(--primary-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    fill: var(--primary-light);
  }

  :hover {
    background-color: var(--primary-accent);
  }
`;

export const songImage = css`
  border-radius: 8px;
`;

export const songInformation = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 15px;
  font-size: 16px;
  font-weight: 500;
`;

export const songInformationKeys = css`
  font-weight: bold;
  font-style: italic;
`;

export const artistNameLink = css`
  text-decoration: underline;
  margin: 0 1px;
  font-style: italic;
`;
