'use client';

import { TempProps } from "../types";
import { motion } from "framer-motion";

interface CarCardProps {
  temp: TempProps;
}

const CarCard = ({ temp }: CarCardProps) => {
  const { _id, title, price, discount, img, category, stock, type, color } = temp;

  return (
    <a href={`/product?id=${_id}`}>
      <div className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]">
        <div className="Layout br_contents">
<div className="border shadow-sm rounded-lg p-3 h-[300px] flex flex-col justify-between">
  <div className="relative w-full h-[200px]">
    <img
      src={img[0]}
      alt="Default"
      className="w-full h-full object-contain object-center rounded"
    />

    {(
      (type === 'single' && parseInt(stock) === 0) ||
      (type === 'collection' &&
        color?.every(color =>
          color.sizes?.every(size => parseInt(size.qty) === 0)
        )
      )
    ) && (
      <div className="absolute inset-0 bg-gray-600 bg-opacity-70 text-white flex items-center justify-center text-lg font-bold z-10 rounded">
        Out of Stock
      </div>
    )}
  </div>

  <div className="flex flex-col items-start justify-start px-2 mt-4 text-left flex-1">
    
      <a href={`/product?id=${_id}`} className="text-current no-underline">
        <h2 className="text-sm font-bold myGray py-1">{title}</h2>
      </a>
  

    <div className="flex flex-col items-start justify-start text-white mt-auto">
      {/* Discount Price */}
      <span className="font-bold text-lg py-1 text-black">
        ${parseFloat(discount)}
        <span className="text-xs mt-1 ml-2 px-2 py-0.5  text-red-500 rounded myRedBo">
          -{Math.round(((price - discount) / price) * 100)} %
        </span>
      </span>

      {/* Old Price */}
      <span className="font-light text-[11px] text-gray-400 line-through">
        ${parseFloat(price)}
      </span>
    </div>
  </div>
</div>

        </div>
      </div>
    </a>
  );
}

export default CarCard;
