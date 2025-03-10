import { mediaQueryMinWidth } from "@/src/utils/mediaQueries";
import { css } from "@emotion/css";

export const initialFetchContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 221px;
  width: 100%;
`;

export const songContainer = css`
  padding: 10px;
  border-radius: 8px;
  overflow: hidden;
`;

export const songsLayout = css`
  display: flex;
  gap: 20px;
  overflow-x: auto;
`;
export const songContainerTitle = css`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--secondary-accent);
`;

export const songSuggestionContainer = css`
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

export const songTileContainer = css`
  position: relative;
  flex: 0 0 150px; /* Smaller fixed width for tiles */
  height: auto; /* Let the height adjust based on content */
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  border-radius: 8px;

  ${mediaQueryMinWidth.sm} {
    flex: 0 0 150px;
  }

  &:hover {
    transform: scale(1.05);
    border-radius: 8px;
  }
`;

export const songTile = css`
  width: 100%;
  height: 150px; /* Smaller height for the image */
  object-fit: cover;
  border-radius: 8px;
  ${mediaQueryMinWidth.sm} {
    width: 150px;
    height: 150px;
  }
`;

export const songTileContentContainer = css`
  margin-top: 8px;
`;

export const typeContainer = css`
  font-size: 12px;
  margin-bottom: 5px;
  color: #666;
  font-weight: bold;
`;

export const songNameContainer = css`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
