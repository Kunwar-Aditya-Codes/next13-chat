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
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    name: "John Doe",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    stars: 5,
  },
  {
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    name: "John Doe",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    stars: 4,
  },

  {
    image:
      "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    name: "John Doe",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    stars: 3,
  },

  {
    image:
      "https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    name: "John Doe",
    review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
    stars: 5,
  },
];

const Reviews: FC = ({}) => {
  return (
    <>
      <style>
        {`
        .swiper-pagination-bullet {
          background-color: #f1f1f1;
          width: 10px;
          height: 10px;
          margin: 0 5px;
          border-radius: 50%;
          cursor: pointer;
        }

        .swiper-pagination-bullet-active {
          background-color: #4ade80;
        }
        `}
      </style>
      <h1
        className={`${dyna.className} text-center text-3xl font-bold tracking-widest text-white first-letter:text-green-400 lg:text-5xl`}
      >
        Testimonials
      </h1>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
          bulletClass: "swiper-pagination-bullet",
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
          <SwiperSlide key={index} className="mb-10 p-4">
            <ReviewCard
              name={review.name}
              review={review.review}
              stars={review.stars}
              image={review.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Reviews;
