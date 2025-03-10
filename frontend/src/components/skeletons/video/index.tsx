import { Skeleton } from "@mui/material";
import { videoSkeletonContainer, videoSkeleton } from "./style";

const VideoSkeleton = () => {
  return (
    <div className={videoSkeletonContainer}>
      <Skeleton
        className={videoSkeleton}
        variant="rectangular"
      />
    </div>
  );
};

export default VideoSkeleton;
