"use client";
import { dyna } from "@/lib/utils";
import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import ReviewCard from "./ReviewCard";

const reviews = [
  {
    name: "John Doe",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    stars: 5,
  },
  {
    name: "John Doe",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    stars: 4,
  },

  {
    name: "John Doe",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    stars: 3,
  },

  {
    name: "John Doe",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    stars: 5,
  },
];

const Reviews: FC = ({}) => {
  return (
    <>
      <h1
        className={`${dyna.className} text-center text-3xl font-bold tracking-widest text-green-400 lg:text-5xl`}
      >
        Review
      </h1>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        className="mx-auto mt-10 lg:w-[75%]"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index} className="mb-6 p-4">
            <ReviewCard
              name={review.name}
              review={review.review}
              stars={review.stars}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Reviews;
