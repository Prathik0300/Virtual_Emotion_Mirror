import { mediaQueryMaxWidth } from "@/src/utils/mediaQueries";
import { css } from "@emotion/css";

export const movieDetailsContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 20px 20px 20px;
  gap: 30px;

  ${mediaQueryMaxWidth.sm} {
    padding: 20px;
  }
`;

export const movieImage = css`
  border-radius: 8px;
`;

export const movieInformationKeys = css`
  text-decoration: underline;
  font-weight: bold;
  font-style: italic;
`;

export const movieInformation = css`
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 16px;
  font-weight: 500;
`;
