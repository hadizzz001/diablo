"use client";

import React from "react";

const MyCarousel = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden  ">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="vid.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full p-4 text-left text-black bg-black/30">
        <h1 className="text-5xl font-bold uppercase animate-slideInLeft myWhite">Sunny-Day Sale</h1>
        <p className="text-[14px] mt-2 animate-slideInLeft delay-200 myWhite">
          Become aquaholic with up to 50% on our summer collection!
        </p>
        <a
          href="/shop"
          style={{ padding: "1em" }}
          className="mt-10 px-12 py-6 bg-white font-semibold  transition-all duration-300 transform hover:scale-105 myGray"
        >
          Shop Now!
        </a>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slideInLeft {
          animation: slideInLeft 1s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default MyCarousel;
