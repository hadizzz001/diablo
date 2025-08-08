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
        const response = await fetch("/api/sub");
        const data = await response.json();
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (name) => {
    router.push("/search?sub=" + name);
  };

  return (
    <div className="container mx-auto px-4 mt-10 mb-10">
      <div className="grid grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
<div
  className="w-18 h-18 sm:w-40 sm:h-40 bg-gray-100 rounded-full flex justify-center items-center cursor-pointer overflow-hidden"
  onClick={() => handleCategoryClick(category.name)}
>
<img
  src={category.img[0]}
  alt={category.name}
  className="  object-contain myimgClassheere"
/>

            </div>
<h3
  className="mt-2 text-sm sm:text-lg font-semibold text-center text-gray-800 cursor-pointer"
  onClick={() => handleCategoryClick(category.name)}
>
  {category.name}
</h3>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveVideo;
