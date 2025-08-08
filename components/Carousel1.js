'use client';

import Link from 'next/link';

const PromoBanner = () => {
  return (
    <div className="bg-black w-full px-4 py-4 flex items-center justify-between container mt-10 mb-10">
      <div className="flex items-center space-x-2">
        <h2 className="text-white  mythiner" >Upgrade and Safe</h2>
        <h2 className="text-red-500   mythiner1">- Up to 70% Off</h2>
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
