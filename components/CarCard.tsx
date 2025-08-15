'use client';

import { TempProps } from "../types";

interface CarCardProps {
  temp: TempProps;
}

const CarCard = ({ temp }: CarCardProps) => {
  const { _id, title, price, discount, img, stock, type, color } = temp;

  return (
    <a href={`/product?id=${_id}`}>
      <div className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]">
        <div className="Layout br_contents">
          <div className="border shadow-sm rounded-lg overflow-hidden h-[400px] flex flex-col">
            
            {/* Image Container */}
            <div className="relative w-full h-[300px] bg-white">
              <img
                src={img[0]}
                alt={title || "Product"}
                className="w-full h-full object-contain object-center"
              />

              {/* Discount Badge in bottom right */}
              <span className="absolute bottom-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                -{Math.round(((price - discount) / price) * 100)}%
              </span>

              {/* Out of Stock Overlay */}
              {(
                (type === 'single' && parseInt(stock) === 0) ||
                (type === 'collection' &&
                  color?.every(color =>
                    color.sizes?.every(size => parseInt(size.qty) === 0)
                  )
                )
              ) && (
                <div className="absolute inset-0 bg-gray-600 bg-opacity-70 text-white flex items-center justify-center text-lg font-bold z-10">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Title (Red Background) */}
            <div className="bg-red-600 w-full px-2 py-2">
              <a href={`/product?id=${_id}`} className="text-white no-underline">
                <h2 className="text-sm font-bold truncate">{title}</h2>
              </a>
            </div>

            {/* Price Section (Gray Background) */}
            <div className="bg-gray-100 w-full px-2 py-3">
              <div className="flex items-center justify-between w-full">
                {/* Discount Price */}
                <span className="font-bold text-lg text-black truncate">
                  ${parseFloat(discount)}
                </span>
              </div>

              {/* Old Price */}
              <span className="block font-light text-[11px] text-gray-400 line-through mt-1">
                ${parseFloat(price)}
              </span>
            </div>

          </div>
        </div>
      </div>
    </a>
  );
}

export default CarCard;
