import Image from "next/image";
import { FC } from "react";

interface Props {
  name: string;
  review: string;
  stars: number;
  image: string;
}

const ReviewCard: FC<Props> = ({ name, review, stars, image }) => {
  return (
    <div className="flex h-[12rem] max-h-[20rem] flex-col justify-between rounded-lg border-2 border-[#343941] bg-transparent px-12 py-6 text-white shadow-xl backdrop-blur-sm lg:h-[15rem] ">
      <div className="flex items-start space-x-4">
        <Image
          alt="profile picture"
          src={image}
          width={30}
          height={30}
          className="h-auto w-auto rounded-full"
        />
        <p className="text-xl font-light italic lg:text-2xl">
          {" "}
          &#34;{review}&#34;
        </p>
      </div>
      <p className="mt-2  text-lg lg:text-2xl">{stars} ⭐</p>
      <h1 className="mt-2 text-base font-medium text-green-400 lg:text-xl">
        {name}
      </h1>
    </div>
  );
};

export default ReviewCard;
