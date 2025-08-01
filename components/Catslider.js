"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const ResponsiveVideo = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      const selectedCategories = [data[0], data[1], data[3]].filter(Boolean); // Ensure items exist
      setCategories(selectedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchCategories();
}, []);


  const renderMedia = (category) => {
    if (category.img[0].endsWith(".mp4")) {
      return (
        <div className="w-full h-full overflow-hidden rounded-lg">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={category.img[0]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    return (
      <div className="w-full h-full overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover"
          src={category.img[0]}
          alt={category.name}
        />
      </div>
    );
  };

  return (
    <>
      <h1 className="center uppercase text-center text-3xl font-bold my-6 text-gray-700 px-4 myGray">
        Our Collections
      </h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">

        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-start"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            {renderMedia(category)}
            <h3 className="mt-3 text-lg font-semibold text-left myGray">{category.name}</h3>
            <button
              onClick={() => router.push("/search?cat=" + category.name)}
              className="mt-2 bg-[#53e6e6] font-bold text-white px-6 py-3    transition"
            >
              Shop Now
            </button>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default ResponsiveVideo;
