import { Skeleton } from "@mui/material";
import { skeleton, skeletonContainer, wrapper, textSkeleton } from "./style";
const MovieSkeleton = () => {
  return (
    <div className={skeletonContainer}>
      {[...Array(10)].map((_, idx) => (
        <div key={`movie-skeleton-${idx}`} className={wrapper}>
          <Skeleton
            className={skeleton}
            variant="rectangular"
            width={120}
            height={180}
          />
          <Skeleton variant="rectangular" className={textSkeleton} width={27} height={10} />
          <Skeleton variant="rectangular" width={100} height={18} />
        </div>
      ))}
    </div>
  );
};

export default MovieSkeleton;
