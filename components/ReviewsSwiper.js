"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const reviews = [
  { name: "Rami Saab", image: "https://randomuser.me/api/portraits/men/12.jpg", text: "Truly outstanding service from start to finish!" },
  { name: "Diala Kassem", image: "https://randomuser.me/api/portraits/women/22.jpg", text: "Very helpful team, though the wait was a little long." },
  { name: "Omar Daher", image: "https://randomuser.me/api/portraits/men/19.jpg", text: "Couldn’t have asked for a better experience." },
  { name: "Tala Barakat", image: "https://randomuser.me/api/portraits/women/16.jpg", text: "Impressed by the professionalism and quality." },
  { name: "Nadim Fakhoury", image: "https://randomuser.me/api/portraits/men/28.jpg", text: "Service was decent, but could be faster." },
  { name: "Lina Daouk", image: "https://randomuser.me/api/portraits/women/26.jpg", text: "Everything went perfectly. Highly recommend!" },
  { name: "Hani Makarem", image: "https://randomuser.me/api/portraits/men/35.jpg", text: "Staff was courteous and the process was smooth." },
  { name: "Joumana Rahme", image: "https://randomuser.me/api/portraits/women/36.jpg", text: "A flawless experience from beginning to end!" },
  { name: "Kamal Hariri", image: "https://randomuser.me/api/portraits/men/41.jpg", text: "Very satisfied. Would definitely return." },
  { name: "Carla Yammine", image: "https://randomuser.me/api/portraits/women/41.jpg", text: "Above and beyond my expectations—thank you!" },
];

const ReviewsSwiper = () => {
  return (
    <div className="mx-auto my-20 relative">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {reviews.map((review, index) => (
          <SwiperSlide
            key={index}
            className="bg-red-600 p-12 text-center text-white"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-20 h-20 mx-auto rounded-full mb-3 border-2 border-white"
            />
            <h3 className="font-semibold text-lg">{review.name}</h3>
            <div className="flex justify-center my-2 text-[20px]">{"★★★★★"}</div>
            <p>{review.text}</p>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom CSS for white arrows */}
      <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white; /* Make arrows white */
        }
      `}</style>
    </div>
  );
};

export default ReviewsSwiper;
