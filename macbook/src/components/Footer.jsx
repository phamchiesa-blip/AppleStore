import { useState } from "react";
import { Link } from "react-router-dom";
import { footerLinks } from "../constants/index";

// Cấu trúc menu footer chuẩn Apple
// Có vẻ responsive đã oke
const footerSections = [
  {
    title: "Store",
    links: [
      { label: "Find a store", href: "https://www.apple.com/retail/" },
      { label: "iPad", href: "/ipad" },
      { label: "iPhone", href: "/iphone" },
      { label: "Mac", href: "/mac" },
      { label: "Apple Watch", href: "/watch" },
      { label: "Apple Vision Pro", href: "https://www.apple.com/apple-vision-pro/" },
      { label: "AirPods", href: "/airpods" },
      { label: "Apple TV 4K", href: "/tvhome" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Apple Music", href: "https://www.apple.com/apple-music/" },
      { label: "Apple TV+", href: "https://www.apple.com/apple-tv-plus/" },
      { label: "Apple Arcade", href: "https://www.apple.com/apple-arcade/" },
      { label: "iCloud+", href: "https://www.apple.com/icloud/" },
      { label: "Apple One", href: "https://www.apple.com/apple-one/" },
      { label: "Apple Card", href: "https://www.apple.com/apple-card/" },
      { label: "Apple Books", href: "https://www.apple.com/apple-books/" },
      { label: "App Store", href: "https://www.apple.com/app-store/" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Manage Apple ID", href: "https://appleid.apple.com/" },
      { label: "Apple Store Account", href: "https://secure.store.apple.com/shop/account/setup" },
      { label: "iCloud.com", href: "https://www.icloud.com/" },
    ],
  },
  {
    title: "Apple Store",
    links: [
      { label: "Find a store", href: "https://www.apple.com/retail/" },
      { label: "Genius Bar", href: "https://www.apple.com/retail/geniusbar/" },
      { label: "Today at Apple", href: "https://www.apple.com/today/" },
      { label: "Apple Summer Camp", href: "https://www.apple.com/today/camp/" },
      { label: "Apple Store App", href: "https://www.apple.com/apple-store-app/" },
      { label: "Refurbished Certificate", href: "https://www.apple.com/shop/refurbished" },
      { label: "Finance", href: "https://www.apple.com/apple-card/" },
      { label: "Apple Trade In", href: "https://www.apple.com/shop/trade-in" },
      { label: "Order status", href: "https://secure.store.apple.com/shop/order/list" },
    ],
  },
  {
    title: "Businesses",
    links: [
      { label: "Apple & Business", href: "https://www.apple.com/business/" },
      { label: "Buy for Businesses", href: "https://www.apple.com/retail/business/" },
    ],
  },
  {
    title: "Education",
    links: [
      { label: "Apple & Education", href: "https://www.apple.com/education/" },
      { label: "Buy for University", href: "https://www.apple.com/us-hed/shop" },
    ],
  },
  {
    title: "About Apple",
    links: [
      { label: "Newsroom", href: "https://www.apple.com/newsroom/" },
      { label: "Apple Leadership", href: "https://www.apple.com/leadership/" },
      { label: "Career Opportunities", href: "https://www.apple.com/careers/us/" },
      { label: "Investors", href: "https://investor.apple.com/" },
      { label: "Ethics & Compliance", href: "https://www.apple.com/compliance/" },
      { label: "Events", href: "https://www.apple.com/apple-events/" },
      { label: "Contact Apple", href: "https://www.apple.com/contact/" },
    ],
  },
];

// Accordion item cho mobile
function AccordionSection({ section }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#424245]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-[13px] font-semibold text-white">{section.title}</span>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px] pb-4" : "max-h-0"}`}
      >
        <ul className="space-y-3">
          {section.links.map(({ label, href }) => (
            <li key={label}>
              {href.startsWith("/") ? (
                <Link
                  to={href}
                  className="text-[13px] text-[#86868b] hover:text-white transition-colors duration-150"
                >
                  {label}
                </Link>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#86868b] hover:text-white transition-colors duration-150"
                >
                  {label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-black text-white">

      {/* Banner mua hàng — chuẩn Apple */}
      <div className="border-b border-[#424245] py-4 px-6 md:px-12 text-center">
        <p className="text-[13px] text-[#86868b]">
          More shopping options:{" "}
          <a href="#" className="text-[#2997ff] hover:underline">
            Find Apple Store
          </a>{" "}
         or{" "}
          <a href="#" className="text-[#2997ff] hover:underline">
            other retailers
          </a>{" "}
          Near you. Or call 1800 1061 (toll-free).
        </p>
      </div>

      {/* Khu vực links chính */}
      <div className="w-full px-6 md:px-12 pt-10 pb-4">

        {/* Desktop: grid 7 cột */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-x-6 gap-y-8 border-b border-[#424245] pb-10">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[12px] font-semibold text-white mb-4 tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map(({ label, href }) => (
                  <li key={label}>
                    {href.startsWith("/") ? (
                      <Link
                        to={href}
                        className="text-[12px] text-[#86868b] hover:text-white transition-colors duration-150 leading-snug block"
                      >
                        {label}
                      </Link>
                    ) : (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] text-[#86868b] hover:text-white transition-colors duration-150 leading-snug block"
                      >
                        {label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden border-t border-[#424245]">
          {footerSections.map((section) => (
            <AccordionSection key={section.title} section={section} />
          ))}
        </div>

        {/* Dòng quốc gia + copyright */}
        <div className="pt-6 pb-2 border-b border-[#424245]">
          <p className="text-[13px] text-[#86868b]">
            Copyright © 2026 Apple Inc. All rights reserved.
          </p>
        </div>

        {/* Links pháp lý cuối trang */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map(({ label, link }) => (
              <li key={label}>
                <a
                  href={link}
                  className="text-[12px] text-[#86868b] hover:text-white transition-colors duration-150"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Chọn quốc gia */}
          <a
            href="#"
            className="flex items-center gap-1.5 text-[12px] text-[#86868b] hover:text-white transition-colors shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
              <path
                strokeWidth="1.5"
                strokeLinecap="round"
                d="M2 12h20M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10"
              />
            </svg>
            VietNam
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
