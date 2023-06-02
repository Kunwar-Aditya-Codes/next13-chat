import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = ({}) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Skeleton width={"20rem"} height={90} baseColor="#d7d9d7" />
    </div>
  );
};

export default loading;
