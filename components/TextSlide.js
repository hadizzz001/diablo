'use client';
import Marquee from 'react-fast-marquee';

const NewsTicker = () => {
  const textItems = [
    '🔥 Hot Sale Today!',
    '50% Off Selected Items',
    'Limited Stock Available!',
    'New Arrivals In Store',
    'Exclusive Offers for You',
    'Hurry! While Stocks Last',
    'Big Discounts On Electronics',
    'Flash Sale Ends Soon',
  ];

  const loopedText = [...textItems, ...textItems];

  return (
    <div className="flex justify-center items-center w-full overflow-hidden">
      <div className="bg-black text-white rounded-xl overflow-hidden  w-[1400px]" id='newSlider'>
        <Marquee speed={100} gradient={false} pauseOnHover={true} direction="left">
          {loopedText.map((text, index) => (
            <div key={index} className="mx-10 text-[14px] md:text-4xl flex items-center overflow-hidden">
              {text}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default NewsTicker;
