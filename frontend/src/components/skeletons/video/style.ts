import { mediaQueryMaxWidth } from "@/src/utils/mediaQueries";
import { css } from "@emotion/css";

export const videoSkeletonContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 390px;
  z-index: 100;

  ${mediaQueryMaxWidth.sm} {
    max-height: 278px;
  }
`;

export const videoSkeleton = css`
  position: absolute;
  top: 14px;
  left: 25px;
  width: 500px;
  height: 375px;
  z-index: 322;
  display: block;

  ${mediaQueryMaxWidth.sm} {
    width: 90%;
    height: 100%;
    top: 0;
    left: 21px;
  }
`;
