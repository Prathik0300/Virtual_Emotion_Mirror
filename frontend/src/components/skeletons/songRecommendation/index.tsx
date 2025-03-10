import { Skeleton } from "@mui/material";
import {
  songSkeletonContainer,
  songWrapper,
  songSkeleton,
  textSkeleton,
} from "./style";

const SongSkeleton = () => {
  return (
    <div className={songSkeletonContainer}>
      {[...Array(10)].map((_, idx) => (
        <div className={songWrapper} key={`song-skeleton-${idx}`}>
          <Skeleton
            className={songSkeleton}
            variant="rectangular"
            width={150}
            height={150}
          />
          <Skeleton
            variant="rectangular"
            className={textSkeleton}
            width={27}
            height={10}
          />
          <Skeleton variant="rectangular" width={100} height={18} />
        </div>
      ))}
    </div>
  );
};

export default SongSkeleton;
