"use client";

import React, { useEffect, useState } from "react";

const MyCarousel = () => {
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch("/api/banner");
        if (!res.ok) throw new Error("Failed to fetch banner data");

        const data = await res.json();
        setVideoSrc(data[0].img[0]);
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);

  if (!videoSrc) return null;

  return (
    <div className="carousel-container w-[1500px] h-[500px] overflow-hidden container  ">
      <video
        src={videoSrc}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
};

export default MyCarousel;
