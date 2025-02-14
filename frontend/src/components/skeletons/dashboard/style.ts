import { css } from "@emotion/css";

export const dashboardSkeletonContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 621px;
  border-radius: 10px;
  gap: 25px;
  padding: 15px;
  background-color: var(--primary-accent);
`;

export const dashboardSkeleton = css`
  border-radius: 8px;
`;
