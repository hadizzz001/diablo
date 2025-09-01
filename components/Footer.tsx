'use client';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaLinkedinIn, FaTiktok, FaPhone } from "react-icons/fa";
import React, { useEffect, useState, useRef } from "react";

const Footer = () => {
    const [showPolicies, setShowPolicies] = useState(false);
    const [showCustomerCare, setShowCustomerCare] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [checkboxesData, setCheckboxesData] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("/api/category");
                const data = await response.json();
                setCheckboxesData(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const mobileSections = [
        {
            label: 'Policies',
            isOpen: showPolicies,
            setOpen: setShowPolicies,
            items: [
                { href: '/privacy', text: 'Privacy Policy' },
                { href: '/term', text: 'Terms of Service' },
            ],
        },
        {
            label: 'Customer Care',
            isOpen: showCustomerCare,
            setOpen: setShowCustomerCare,
            items: [
                { href: '/contact', text: 'Contact Us' },
            ],
        },
        {
            label: 'Category', // changed from Services to Category
            isOpen: showCategories,
            setOpen: setShowCategories,
            items: checkboxesData.map(cat => ({
                href: "/search?cat=" + encodeURIComponent(cat.name),
                text: cat.name
            })),
        },
    ];

    return (
        <footer className="bg-[#f8f8f8] text-[#222] py-10   ">


            <div className="p-5  bg-[#555555]">
                {/* Payment Methods */}
                <div className="flex justify-center flex-wrap gap-6 mb-6">
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231450/icon_visa_footer_ysxrzi.webp" alt="Visa" className="h-10" />
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231450/icon_sofort_footer_ggbmjy.webp" alt="MasterCard" className="h-10" />
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231449/Klarna_Payment_Badge_iglzex.svg" alt="PayPal" className="h-10" />
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231450/icon_amazonpay_footer_tkdjol.webp" alt="American Express" className="h-10" />
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231449/icon_mastercard_footer_cfsb4w.webp" alt="Apple Pay" className="h-10" />
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231449/download_q2d8zb.png" alt="Apple Pay" className="h-10" />
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231449/icon_paypal_footer_hjtb3i.webp" alt="Apple Pay" className="h-10" />
                </div>

                {/* Delivery Brands */}
                <div className="flex justify-center flex-wrap gap-6 border-b border-[#c5c5c5] pb-8">
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231450/icon_nachnahme_footer_pqskg5.webp" alt="Aramex" className="h-10" />
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231449/icon_amex_footer_vttyqp.webp" alt="DHL" className="h-10" />
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231449/icon_vorkasse_footer_ulluzy.webp" alt="FedEx" className="h-10" />
                    <img src="https://res.cloudinary.com/dlqj4aigl/image/upload/v1756231449/images_kamftn.jpg" alt="UPS" className="h-10" />

                </div>
            </div>





            {/* PC FOOTER */}
            <div className="hidden md:block ">
                {/* Top Row */}
                <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm border-b border-[#c5c5c5] pb-8 items-center mt-20">
                    {/* Policies */}
                    <div className="flex flex-col items-center">
                        <div className="text-left">
                            <p className="mb-3 myfp">Policies</p>
                            <ul className="space-y-2">
                                <li><a href="/privacy" className="colorp">Privacy Policy</a></li>
                                <li><a href="/term" className="colorp">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Customer Care */}
                    <div className="flex flex-col items-center">
                        <div className="text-left">
                            <p className="myfp mb-3">Customer Care</p>
                            <ul className="space-y-2">
                                <li><a href="/contact" className="colorp">Contact us</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col items-center">
                        <div className="text-left">
                            <p className="myfp mb-3">Category</p>
                            <ul className="space-y-2">
                                {checkboxesData.map((category) => (
                                    <li><a href={"/search?cat=" + encodeURIComponent(category.name)} className="colorp"> {category.name}</a></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>









                <div className="flex justify-center gap-8 mt-6">
                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/diablo.hobbyshop/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center justify-center rounded-full" style={{ background: "linear-gradient(45deg,#f58529,#dd2a7b,#8134af,#515bd4)", width: "60px", height: "60px" }}>
                            <FaInstagram style={{ fontSize: "40px", color: "white" }} />
                        </div>
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/p/Diablo-Hobby-Shop-61558014394197/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center justify-center rounded-full bg-[#1877F2]" style={{ width: "60px", height: "60px" }}>
                            <FaFacebookF style={{ fontSize: "40px", color: "white" }} />
                        </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/96181820902"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center justify-center rounded-full bg-[#25D366]" style={{ width: "60px", height: "60px" }}>
                            <FaWhatsapp style={{ fontSize: "40px", color: "white" }} />
                        </div>
                    </a>

                    {/* TikTok */}
                    <a
                        href="https://www.tiktok.com/@diablohobbyshop.lb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center justify-center rounded-full bg-black" style={{ width: "60px", height: "60px" }}>
                            <FaTiktok style={{ fontSize: "40px", color: "white" }} />
                        </div>
                    </a>

                    {/* Phone */}
                    <a href="tel:+96181820902" className="flex flex-col items-center text-gray-700">
                        <div
                            className="flex items-center justify-center rounded-full bg-[red]"
                            style={{ width: "60px", height: "60px" }}
                        >
                            <FaPhone style={{ fontSize: "40px", color: "white" }} />
                        </div>
                        <span className="colorp mt-2">+96181820902</span>
                    </a>

                </div>







                {/* Bottom Row */}
                <div className="text-center mt-20 mb-20">
                    <p className="myRights">
                        © Diablo Hobby Shop {new Date().getFullYear()} ALL RIGHTS RESERVED
                    </p>
                </div>
            </div>
















            {/* MOBILE FOOTER */}
            <div id='mymobfoot' className="block md:hidden text-sm space-y-6 mt-20 mb-20 px-4">
                {mobileSections.map(({ label, isOpen, setOpen, items }, index) => (
                    <div key={index}>
                        <div
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setOpen(!isOpen)}
                        >
                            <p className="myfp">{label}</p>
                            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                <FaChevronDown />
                            </div>
                        </div>
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <ul className="mt-2 space-y-2">
                                {items.map((item, i) => (
                                    <li key={i}>
                                        <a href={item.href} className="colorp">{item.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <hr id='myhrbar1' className="my-4" />
                    </div>
                ))}

                {/* Social Icons */}
                <div className="flex justify-center gap-8 mt-6">
                    {/* Instagram */}
                    <a
                        href="https://www.instagram.com/diablo.hobbyshop/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center justify-center rounded-full" style={{ background: "linear-gradient(45deg,#f58529,#dd2a7b,#8134af,#515bd4)", width: "35px", height: "35px" }}>
                            <FaInstagram style={{ fontSize: "25px", color: "white" }} />
                        </div>
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/p/Diablo-Hobby-Shop-61558014394197/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center justify-center rounded-full bg-[#1877F2]" style={{ width: "35px", height: "35px" }}>
                            <FaFacebookF style={{ fontSize: "25px", color: "white" }} />
                        </div>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/96181820902"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center justify-center rounded-full bg-[#25D366]" style={{ width: "35px", height: "35px" }}>
                            <FaWhatsapp style={{ fontSize: "25px", color: "white" }} />
                        </div>
                    </a>

                    {/* TikTok */}
                    <a
                        href="https://www.tiktok.com/@diablohobbyshop.lb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center justify-center rounded-full bg-black" style={{ width: "35px", height: "35px" }}>
                            <FaTiktok style={{ fontSize: "25px", color: "white" }} />
                        </div>
                    </a>

                    {/* Phone */}
                    <a href="tel:+96181820902" className="flex flex-col items-center text-gray-700">
                        <div
                            className="flex items-center justify-center rounded-full bg-[red]"
                            style={{ width: "35px", height: "35px" }}
                        >
                            <FaPhone style={{ fontSize: "25px", color: "white" }} />
                        </div>
                        <span className="colorp mt-2">+96181820902</span>
                    </a>

                </div>

                <div className="text-center mt-20 mb-20">
                    <p className="text-lg uppercase">
                        Diablo Hobby Shop {new Date().getFullYear()} ALL RIGHTS RESERVED
                    </p>
                </div>
            </div>
















        </footer>
    );
};

export default Footer;
