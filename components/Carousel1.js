'use client';

import { useEffect, useState } from 'react';

const PromoBanner = () => {
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch('/api/banner2');
        const data = await res.json();
        setBanner(data[0]); // first object
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="bg-black w-full px-4 py-4 flex items-center justify-between container mt-10 mb-10">
      <div className="flex items-center space-x-2">
        <h2 className="text-white mythiner">
          {banner ? banner.name : 'Loading...'}
        </h2>
        <h2 className="text-red-500 mythiner1">
          {banner ? `- ${banner.off}` : ''}
        </h2>
      </div>

      <a
        href="/shop"
        className=" bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200 transition myButtonoffer"
      >
        Shop <b>Now</b>
      </a>
    </div>
  );
};

export default PromoBanner;
