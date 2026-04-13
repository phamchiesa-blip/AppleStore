import { useState } from "react";
import { footerLinks } from "../constants/index";

// Cấu trúc menu footer chuẩn Apple
// Có vẻ responsive đã oke
const footerSections = [
  {
    title: "Cửa hàng",
    links: [
      { label: "Tìm cửa hàng", href: "#" },
      { label: "iPad", href: "#" },
      { label: "iPhone", href: "#" },
      { label: "Mac", href: "#" },
      { label: "Apple Watch", href: "#" },
      { label: "Apple Vision Pro", href: "#" },
      { label: "AirPods", href: "#" },
      { label: "Apple TV 4K", href: "#" },
    ],
  },
  {
    title: "Dịch vụ",
    links: [
      { label: "Apple Music", href: "#" },
      { label: "Apple TV+", href: "#" },
      { label: "Apple Arcade", href: "#" },
      { label: "iCloud+", href: "#" },
      { label: "Apple One", href: "#" },
      { label: "Apple Card", href: "#" },
      { label: "Apple Books", href: "#" },
      { label: "App Store", href: "#" },
    ],
  },
  {
    title: "Tài khoản",
    links: [
      { label: "Quản lý Apple ID", href: "#" },
      { label: "Apple Store Account", href: "#" },
      { label: "iCloud.com", href: "#" },
    ],
  },
  {
    title: "Apple Store",
    links: [
      { label: "Tìm cửa hàng", href: "#" },
      { label: "Genius Bar", href: "#" },
      { label: "Today at Apple", href: "#" },
      { label: "Apple Summer Camp", href: "#" },
      { label: "Apple Store App", href: "#" },
      { label: "Chứng nhận Refurbished", href: "#" },
      { label: "Tài chính", href: "#" },
      { label: "Apple Trade In", href: "#" },
      { label: "Đặt hàng trạng thái", href: "#" },
    ],
  },
  {
    title: "Doanh nghiệp",
    links: [
      { label: "Apple và Doanh nghiệp", href: "#" },
      { label: "Mua cho Doanh nghiệp", href: "#" },
    ],
  },
  {
    title: "Giáo dục",
    links: [
      { label: "Apple và Giáo dục", href: "#" },
      { label: "Mua cho Đại học", href: "#" },
    ],
  },
  {
    title: "Về Apple",
    links: [
      { label: "Newsroom", href: "#" },
      { label: "Apple Leadership", href: "#" },
      { label: "Career Opportunities", href: "#" },
      { label: "Nhà đầu tư", href: "#" },
      { label: "Đạo đức & Tuân thủ", href: "#" },
      { label: "Sự kiện", href: "#" },
      { label: "Liên hệ Apple", href: "#" },
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
              <a
                href={href}
                className="text-[13px] text-[#86868b] hover:text-white transition-colors duration-150"
              >
                {label}
              </a>
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
          Nhiều cách mua sắm hơn:{" "}
          <a href="#" className="text-[#2997ff] hover:underline">
            Tìm Apple Store
          </a>{" "}
          hoặc{" "}
          <a href="#" className="text-[#2997ff] hover:underline">
            nhà bán lẻ khác
          </a>{" "}
          gần bạn. Hoặc gọi 1800 1061 (miễn phí).
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
                    <a
                      href={href}
                      className="text-[12px] text-[#86868b] hover:text-white transition-colors duration-150 leading-snug block"
                    >
                      {label}
                    </a>
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
            Copyright © 2026 Apple Inc. Mọi quyền được bảo lưu.
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
            Việt Nam
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
