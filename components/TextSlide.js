'use client';
import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';

const NewsTicker = () => {
  const [textItems, setTextItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/banner1');
        const data = await res.json();

        if (Array.isArray(data[0].name)) {
          setTextItems(data[0].name);
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchData();
  }, []);

  // duplicate array to make continuous loop effect
  const loopedText = [...textItems, ...textItems];

  return (
    <div className="flex justify-center items-center w-full overflow-hidden">
      <div className="bg-black text-white rounded-xl overflow-hidden w-[1400px]" id="newSlider">
        <Marquee speed={100} gradient={false} pauseOnHover={true} direction="left">
          {loopedText.map((text, index) => (
            <div
              key={index}
              className="mx-10 text-[14px] md:text-4xl flex items-center overflow-hidden"
            >
              {text}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default NewsTicker;
