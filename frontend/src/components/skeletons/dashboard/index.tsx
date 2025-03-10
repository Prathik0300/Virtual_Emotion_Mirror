import { Skeleton } from "@mui/material";
import { dashboardSkeletonContainer, dashboardSkeleton } from "./style";

const DashboardSkeleton = () => {
  return (
    <div className={dashboardSkeletonContainer}>
      <Skeleton
        className={dashboardSkeleton}
        variant="rectangular"
        width={163}
        height={36}
      />
      <Skeleton
        className={dashboardSkeleton}
        variant="rectangular"
        width="100%"
        height={450}
      />
      <Skeleton
        className={dashboardSkeleton}
        variant="rectangular"
        width={175}
        height={45}
      />
    </div>
  );
};

export default DashboardSkeleton;
