import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loading = ({}) => {
  return (
    <div className="mt-4 py-5">
      <Skeleton width={"20rem"} height={60} baseColor="#343941" />
      <Skeleton
        width={"30rem"}
        height={40}
        baseColor="#343941"
        className="mt-4"
      />
    </div>
  );
};

export default loading;
