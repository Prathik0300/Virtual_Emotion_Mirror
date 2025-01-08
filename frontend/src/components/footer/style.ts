import { mediaQueryMaxWidth } from "@/src/utils/mediaQueries";
import { css } from "@emotion/css";

export const footerContainer = css`
  position: absolute;
  bottom: 15px;
  left: 10px;
  color: var(--primary-accent);
  font-size: 14px;
  z-index: 2;
  ${mediaQueryMaxWidth.sm} {
    width: 100%;
    left: 0;
    text-align: center;
  }
`;
