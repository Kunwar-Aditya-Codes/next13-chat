import { FC } from "react";

interface Props {
  name: string;
  review: string;
  stars: number;
}

const ReviewCard: FC<Props> = ({ name, review, stars }) => {
  return (
    <div className="flex  h-[12rem] max-h-[15rem] flex-col justify-between rounded-lg bg-[#343941] px-12 py-6 text-white shadow-xl lg:h-full ">
      <p className="text-xl font-light italic lg:text-2xl">
        {" "}
        &#34;{review}&#34;
      </p>
      <p className="mt-2  text-lg lg:text-2xl">{stars} ⭐</p>
      <h1 className="mt-2 text-base font-medium text-green-400 lg:text-xl">
        {name}
      </h1>
    </div>
  );
};

export default ReviewCard;
