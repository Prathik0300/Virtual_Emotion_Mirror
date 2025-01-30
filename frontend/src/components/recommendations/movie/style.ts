import { css } from "@emotion/css";

export const movieContainer = css`
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
`;

export const movieContainerTitle = css`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--secondary-accent);
`;

export const movieSuggestionContainer = css`
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

export const movieTileContainer = css`
  position: relative;
  flex: 0 0 140px; /* Smaller fixed width for tiles */
  height: auto; /* Let the height adjust based on content */
  cursor: pointer;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    border-radius: 8px;
  }
`;

export const movieTile = css`
  width: 100%;
  height: 180px; /* Smaller height for the image */
  object-fit: cover;
  border-radius: 8px;
`;

export const movieTileContentContainer = css`
  margin-top: 8px;
`;

export const ratingContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  margin-bottom: 5px;
  color: #666;
`;

export const ratingIcon = css`
  margin-right: 5px;
`;

export const movieTitle = css`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin: 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
