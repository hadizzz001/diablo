'use client';
import { useState, useEffect } from 'react';
import CarCard from './CarCard';
import { useRouter } from "next/navigation";

const YourComponent = () => {
  const [allTemps, setAllTemps] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/productss', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setAllTemps(data.slice(-21)); // last 5 items
      } else {
        console.error('Failed to fetch categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="ProvidersIfSelectedProductMatchesFilter mt-4 container">
      <content-block slug="product-page-wssb">
        <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL">

          {allTemps && allTemps.length > 0 ? (
            <>
              <style
                dangerouslySetInnerHTML={{
                  __html: ".ProductTile-SliderContainer--YMAL .ProductTile-SliderContainer-Title{height:auto;text-align:center;}"
                }}
              />

              <div className="px-3">
                <section
                  className="mb-5 grid grid-cols-2 md:grid-cols-3 gap-4"
                  style={{ maxWidth: "100%" }}
                >
                  {allTemps.map((temp, index) => (
                    <div key={temp.id}>
                      <CarCard temp={temp} index={index}/>
                    </div>
                  ))}
                </section>
              </div>
            </>
          ) : (
            <div className="home___error-container">
              <h2 className="text-black text-xl font-bold">No products available</h2>
            </div>
          )}

        </div>
      </content-block>
    </div>
  );
};

export default YourComponent;
