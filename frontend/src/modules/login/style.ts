import { mediaQueryMaxWidth } from "@/src/utils/mediaQueries";
import { css } from "@emotion/css";

export const loginContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  background-color: var(--primary-accent);
  width: fit-content;
  height: fit-content;
  gap: 20px;
  padding: 30px;
  border-radius: 20px;
  z-index: 2;
  position: relative;
`;

export const logoContainer = css`
  ${mediaQueryMaxWidth.sm} {
    display: none;
  }
`;
