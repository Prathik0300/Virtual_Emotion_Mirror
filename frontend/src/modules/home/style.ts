import { mediaQueryMaxWidth } from "@/src/utils/mediaQueries";
import { css } from "@emotion/css";

export const homeContainer = css`
  display: flex;
  max-width: 100%;
  width: 100%;
  gap: 25px;
  padding: 15px;

  ${mediaQueryMaxWidth.sm} {
    flex-direction: column;
  }
`;

export const dashboardContainerWrapper = css`
  width: 50%;
  max-width: 50%;
  ${mediaQueryMaxWidth.sm} {
    width: 100%;
    max-width: 100%;
  }
`;
export const recommendationContainerWrapper = css`
  width: 50%;
  max-width: 50%;
  ${mediaQueryMaxWidth.sm} {
    width: 100%;
    max-width: 100%;
  }
`;
