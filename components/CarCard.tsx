'use client';
import { TempProps } from "../types";

interface CarCardProps {
  temp: TempProps;
  index: number; // add index
}

const CarCard = ({ temp, index }: CarCardProps) => {
  const { _id, title, price, discount, img, stock, type, color } = temp;

  // Rotate 3 colors: red -> blue -> green -> repeat
  const bgColors = ["bg-red-600", "bg-blue-600", "bg-green-600"];
  const selectedBg = bgColors[index % bgColors.length];

  return (
    <a href={`/product?id=${_id}`}>
      <div className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]">
        <div className="Layout br_contents">
          <div className="border shadow-sm rounded-lg overflow-hidden h-[400px] flex flex-col">

            {/* Image Container */}
            <div className="relative w-full h-[250px] bg-white">
              <img
                src={img[0].replace(
                  '/upload/',
                  '/upload/c_pad,w_400,h_400,b_white,q_25/'
                )}
                alt={title || "Product"}
                className="w-full h-full object-contain object-center"
              />

              {/* Discount Badge */}
              <span className="absolute bottom-2 right-2 bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                -25%
              </span>

              {/* Out of Stock */}
              {(
                (type === 'single' && parseInt(stock) === 0) ||
                (type === 'collection' &&
                  color?.every(c =>
                    c.sizes?.every(size => parseInt(size.qty) === 0)
                  )
                )
              ) && (
                <div className="absolute inset-0 bg-gray-600 bg-opacity-70 text-white flex items-center justify-center text-lg font-bold z-10">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Title with Dynamic BG */}
            <div className={`${selectedBg} w-full px-2 py-2`}>
              <a href={`/product?id=${_id}`} className="text-white no-underline">
                <h2 className="text-lg font-bold truncate">{title}</h2>
              </a>
            </div>

            {/* Sizes */}
            <span className="font-bold text-lg text-black truncate bg-yellow-200">
              {Array.from(new Set(
                color.flatMap(c => c.sizes?.map(s => s.size) || [])
              )).join(', ') || 'N/A'}
            </span>

            {/* Price Section */}
            <div className="w-full px-2 py-3 bg-yellow-200">
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-lg text-black truncate">
                  {type === 'single' || (type === 'collection' && !color)
                    ? (`$${discount}` || 'N/A')
                    : (type === 'collection' && color && color.some(c => c.sizes?.length)
                      ? (() => {
                        const prices = color.flatMap(c => c.sizes || []).map(s => s.price);
                        if (prices.length === 0) return 'N/A';
                        const minPrice = Math.min(...prices);
                        const maxPrice = Math.max(...prices);
                        return minPrice === maxPrice
                          ? `$${minPrice.toFixed(2)}`
                          : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
                      })()
                      : `$${discount}`
                    )
                  }
                </span>
              </div>

              <span className="block font-light text-[15px] text-gray-400 line-through mt-1">
                {type === 'single' || (type === 'collection' && !color)
                  ? (`$${(discount * 1.25).toFixed(2)}` || 'N/A')
                  : (type === 'collection' && color && color.some(c => c.sizes?.length)
                    ? (() => {
                      const prices = color.flatMap(c => c.sizes || []).map(s => s.price * 1.25);
                      if (prices.length === 0) return 'N/A';
                      const minPrice = Math.min(...prices);
                      const maxPrice = Math.max(...prices);
                      return minPrice === maxPrice
                        ? `$${minPrice.toFixed(2)}`
                        : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
                    })()
                    : `$${(discount * 1.25).toFixed(2)}`
                  )
                }
              </span>
            </div>

          </div>
        </div>
      </div>
    </a>
  );
}

export default CarCard;
