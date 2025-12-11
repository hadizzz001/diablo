'use client';

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
<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            {/* Image Container with white padding and square */}
            <div
              className="mywidthhere aspect-square bg-white flex justify-center items-center cursor-pointer overflow-hidden p-2"
              style={{ border: '1px solid #ddd' }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <img
                src={category.img[0].replace('/upload/', '/upload/q_25/')}
                alt={category.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Full width text background matching image */}
            <h3
              className="mywidthhere text-lg sm:text-2xl font-bold text-center text-white cursor-pointer bg-red-600 px-2 py-2 mt-2"
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
