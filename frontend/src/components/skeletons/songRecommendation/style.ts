import { mediaQueryMinWidth } from "@/src/utils/mediaQueries";
import { css } from "@emotion/css";

export const songSkeletonContainer = css`
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 10px;
  position: relative;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const songWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const textSkeleton = css`
  height: auto;
  width: 100%;
`;

export const songSkeleton = css`
  position: relative;
  flex: 0 0 150px;
  height: auto;
  overflow: hidden;
  border-radius: 8px;

  ${mediaQueryMinWidth.sm} {
    flex: 0 0 150px;
  }
`;
