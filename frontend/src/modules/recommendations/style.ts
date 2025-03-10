import { mediaQueryMaxWidth } from "@/src/utils/mediaQueries";
import { css } from "@emotion/css";

export const recommendationContainer = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  max-height: 100%;
  gap: 10px;
  padding: 15px;
  height: max-content;
  background-color: var(--primary-accent);
  color: var(--secondary-accent);
  border-radius: 10px;
`;

export const recommendationContent = css`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${mediaQueryMaxWidth.sm} {
    flex-direction: column;
  }
`;

export const title = css`
  font-weight: bold;
  font-size: 30px;
`;

export const movieRecommendations = css`
  width: 50%;
  max-width: 50%;
  height: max-content;
  border: 0.1px solid var(--secondary-accent-light);
  border-radius: 10px;
  overflow-x: hidden;

  ${mediaQueryMaxWidth.sm} {
    width: 100%;
    max-width: 100%;
  }
`;
export const songRecommendations = css`
  width: 50%;
  max-width: 50%;
  border: 0.1px solid var(--secondary-accent-light);
  border-radius: 10px;
  overflow-x: hidden;

  ${mediaQueryMaxWidth.sm} {
    width: 100%;
    max-width: 100%;
  }
`;
