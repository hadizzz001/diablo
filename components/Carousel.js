"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const MyCarousel = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch("/api/banner");
        if (!res.ok) throw new Error("Failed to fetch banner data");
        const data = await res.json();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);

  if (!banners.length) return null;

  return (
    <div className="w-full flex justify-center py-4">
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={20}
        slidesPerView={1} // Always 1 video per slide
        pagination={{ clickable: true }}
        loop
        grabCursor
        className="w-[1500px] h-[600px]" // Fixed size
      >
        {banners.map((banner, index) => (
          <SwiperSlide
            key={index}
            className="relative w-[1500px] h-[600px] rounded-lg overflow-hidden"
          >
            <video
              src={banner.img[0]}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
            <div className="text-6xl italic font-black absolute bottom-4 left-4 bg-red-600 text-white px-20 py-10  ">
              {banner.name || `Video ${index + 1}`}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MyCarousel;
