'use client';
import { useState, useEffect } from 'react';
import Cart from "../components/Cart";
import { useBooleanValue } from '../app/context/CartBoolContext';
import { useCart } from '../app/context/CartContext'; 
import { Menu, X, ShoppingCart, HomeIcon } from 'lucide-react';

function DesktopNav({ categories }) {
  return (
    <nav className="hidden sm:flex justify-left items-left gap-10 text-lg font-bold  px-5 py-3">
      <a href="/shop" className="hover:underline">All Categories</a>
      <ul className="flex gap-10">
        {categories.map((cat) => (
          <li key={cat.id}>
            <a href={`/search?cat=${cat.name}`} className="hover:underline">{cat.name}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const { isBooleanValue, setBooleanValue } = useBooleanValue();
  const [categories, setCategories] = useState([]);

  const handleClickc = () => {
    setBooleanValue(!isBooleanValue);
    const cartb2 = document.getElementById("cartid2");
    if (cartb2) {
      if (isBooleanValue) {
        cartb2.className += " MiniCart_Cart-visible";
      } else {
        cartb2.classList.remove("MiniCart_Cart-visible");
      }
    }
  };

  useEffect(() => {
    fetch('/api/category')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error('Failed to fetch categories', err));
  }, []);

  return (
    <>
      <Cart />

      {/* -------- MOBILE TOP NAV -------- */}
      <div className="sm:hidden fixed top-0 w-full bg-black shadow z-50 flex items-center gap-2 px-4 py-2">
        <a href="/" className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1754069461/c770171d-b7c4-41bc-b7e8-0d8308805cb2-removebg-preview_uivh27.png"
            alt="Logo"
            className="h-12"
          />
        </a>
        <form action="/search" method="get" className="flex-1 flex">
          <input
            type="text"
            name="q"
            placeholder="Search..."
            className="w-full border rounded-lg px-3 py-2 outline-none"
          />
        </form>
      </div>

      {/* -------- MOBILE BOTTOM NAV -------- */}
      <div className=" fixed bottom-0 w-full bg-black shadow z-50 flex justify-around py-2 text-white" id='myMobHead'>
        <a href="/" className="flex flex-col items-center">
          <HomeIcon className="w-6 h-6 text-white" style={{color: 'white'}}/>
          <span className="text-xs text-white">Home</span>
        </a>
        <button onClick={() => setMenuOpen(true)} className="flex flex-col items-center">
          <Menu className="w-6 h-6" />
          <span className="text-xs">Menu</span>
        </button>
        <span onClick={handleClickc} className="flex flex-col items-center relative cursor-pointer">
          <ShoppingCart className="w-6 h-6  " style={{ color: 'white' }} />

          <span className="text-xs">Cart</span>
          {cart && cart.length > 0 && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          )}
        </span>
      </div>

      {/* -------- DESKTOP HEADER -------- */}
      <header className="hidden sm:block w-full sticky top-0 bg-black shadow z-40 text-white">
        <div className="flex items-center justify-between bg-black pl-10 pr-10">
          <a href="/">
            <img
              src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1754069461/c770171d-b7c4-41bc-b7e8-0d8308805cb2-removebg-preview_uivh27.png"
              alt="Logo"
              className="h-24 max-h-[80px]"
            />
          </a>
          <form action="/search" method="get" className="flex items-center w-full gap-2 px-5">
            <button type="submit" className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35.6 36" className="w-6 h-6">
                <path d="M35 32.6l-8.4-8.4A14.96 14.96 0 0 0 14.9 0C6.7 0 0 6.7 0 14.9s6.7 14.9 14.9 14.9c3.3 0 6.3-1.1 8.8-2.9l8.5 8.5c.4.4.9.6 1.4.6s1-.2 1.4-.6c.8-.8.8-2 0-2.8zM4 14.9C4 8.9 8.9 4 14.9 4s10.9 4.9 10.9 10.9-4.9 10.9-10.9 10.9S4 20.9 4 14.9z" />
              </svg>
            </button>
            <input
              type="text"
              name="q"
              placeholder="What are you looking for?"
              className="flex-1  border-2 border-gray-400 rounded-lg outline-none py-2 px-3"
            />
          </form>
          <span onClick={handleClickc} className="menuicon cursor-pointer">
            <ShoppingCart className="w-6 h-6  "  style={{ color: 'white' }}/>
            {cart && cart.length > 0 && <span className="MiniCart_CartIndicator_Badge1"></span>}
          </span>
        </div>
        <DesktopNav categories={categories} />
      </header>

      {/* Fullscreen Menu - only on mobile */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center z-50 sm:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-10 right-4"
            aria-label="Close menu"
          >
            <X className="w-8 h-8 stroke-[1]" id='myColorblack' />
          </button>
          <nav className="flex flex-col items-center gap-6 mt-12 text-3xl font-bold">
            <a href="/shop" onClick={() => setMenuOpen(false)}>All Categories</a>
            {categories.map((cat) => (
              <a key={cat.id} href={`/search?cat=${cat.name}`} onClick={() => setMenuOpen(false)}>
                {cat.name}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
