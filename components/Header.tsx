"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Logo from "../public/logo.png";

export default function Navbar() {
  return (
    <header
      className="relative z-50 w-full"
      style={{
        fontFamily:
          'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif',
      }}
    >
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}
      <div className="relative h-[118px] w-full overflow-hidden bg-white">
        {/* =================================================
            RIGHT BLUE AREA
        ================================================= */}
        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-[40.5%]
            bg-[#0866c9]
          "
        >
          {/* EXACT CURVED LEFT EDGE */}
          <svg
            className="
              absolute
              -left-[108px]
              top-0
              h-[118px]
              w-[110px]
            "
            viewBox="0 0 110 118"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="
                M110 0
                C110 25 104 43 91 56
                C82 65 68 70 55 77
                C42 84 30 93 18 104
                C13 109 7 114 0 118
                L110 118
                Z
              "
              fill="#0866c9"
            />
          </svg>

          {/* LIGHT CURVE / SOFT BACKGROUND */}
          <svg
            className="
              absolute
              -left-[108px]
              top-0
              h-[118px]
              w-[110px]
            "
            viewBox="0 0 110 118"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="
                M0 0
                H110
                C110 25 104 43 91 56
                C82 65 68 70 55 77
                C42 84 30 93 18 104
                C13 109 7 114 0 118
                Z
              "
              fill="#f3f5f8"
            />
          </svg>
        </div>

        {/* =================================================
            NAVBAR INNER
        ================================================= */}
        <div
          className="
            relative
            mx-auto
            flex
            h-[118px]
            w-full
            max-w-[1360px]
            items-center
            justify-between
            px-[24px]
            sm:px-[40px]
          "
        >
          {/* =================================================
              LOGO
          ================================================= */}
          <Link
            href="/"
            className="
              relative
              z-20
              flex
              items-center
            "
          >
            <Image
              src={Logo}
              alt="Travivu"
              width={150}
              height={50}
              className="object-contain"
              style={{ width: "150px", height: "auto" }}
              priority
            />
          </Link>

          {/* =================================================
              MENU
          ================================================= */}
          <nav
            className="
              relative
              z-20
              flex
              items-center
              gap-[28px]
            "
          >
            <NavItem label="Home" active dropdown />

            <NavItem label="Tours" dropdown />

            <NavItem label="Destination" dropdown />

            <NavItem label="Activities" dropdown />

            <NavItem label="Pages" dropdown />

            <NavItem label="News" dropdown />

            <NavItem label="Contact" />
          </nav>

          {/* =================================================
              RIGHT AREA
          ================================================= */}
          <div
            className="
              relative
              z-30
              ml-auto
              flex
              h-full
              items-center
              gap-[18px]
              pr-[10px]
            "
          >
            {/* USER ICON */}
            <Link
              href="/login"
              className="
                flex
                h-[42px]
                w-[42px]
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white
                text-white
              "
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="8" r="3" />

                <path
                  d="M5.5 20c.8-3.5 3-5.3 6.5-5.3s5.7 1.8 6.5 5.3"
                  strokeLinecap="round"
                />
              </svg>
            </Link>

            {/* START BOOKING */}
            <Link
              href="/booking"
              className="
                flex
                h-[42px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                px-[19px]
                text-[14px]
                font-medium
                text-[#172238]
                whitespace-nowrap
              "
            >
              Start Booking
            </Link>

            {/* PHONE CIRCLE */}
            <div
              className="
                flex
                h-[42px]
                w-[42px]
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#ff9d3d]
                text-white
              "
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  d="
                    M22 16.92v3
                    a2 2 0 0 1-2.18 2
                    19.8 19.8 0 0 1-8.63-3.07
                    19.5 19.5 0 0 1-6-6
                    19.8 19.8 0 0 1-3.07-8.67
                    A2 2 0 0 1 4.11 2h3
                    a2 2 0 0 1 2 1.72
                    12.8 12.8 0 0 0 .7 2.81
                    2 2 0 0 1-.45 2.11L8.09 9.91
                    a16 16 0 0 0 6 6l1.27-1.27
                    a2 2 0 0 1 2.11-.45
                    12.8 12.8 0 0 0 2.81.7
                    A2 2 0 0 1 22 16.92z
                  "
                />
              </svg>
            </div>

            {/* PHONE TEXT */}
            <div
              className="
                -ml-[7px]
                w-[103px]
                leading-[15px]
                text-white
              "
            >
              <div className="text-[11px] font-normal">Call Anytime</div>

              <div className="whitespace-nowrap text-[15px] font-semibold">
                (69)-868 168
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          ORANGE INFORMATION BAR
      ===================================================== */}
      <div
        className="
          absolute
          left-1/2
          top-[97px]
          z-[100]
          flex
          h-[40px]
          w-[min(1360px,calc(100%-80px))]
          -translate-x-1/2
          items-center
          justify-between
          rounded-full
          bg-[#ff9d3d]
          px-[28px]
          sm:px-[52px]
        "
      >
        {/* =================================================
            LEFT INFO
        ================================================= */}
        <div className="flex items-center gap-[28px] text-white">
          {/* LOCATION */}
          <div className="flex items-center gap-[8px]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="2.3" />
            </svg>

            <span className="text-[13px] leading-none">
              30 Road Fratton, Australia
            </span>
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-[8px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>

            <span className="text-[13px] leading-none">
              contact@example.com
            </span>
          </div>
        </div>

        {/* =================================================
            RIGHT SOCIAL ICONS
        ================================================= */}
        <div className="flex items-center gap-[20px] text-white">
          {/* SEARCH */}
          <button
            aria-label="Search"
            className="inline-flex items-center justify-center"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
          </button>

          {/* FACEBOOK */}
          <a href="#" aria-label="Facebook" className="text-[13px] font-bold">
            f
          </a>

          {/* TWITTER */}
          <a
            href="#"
            aria-label="Twitter"
            className="text-[13px] font-semibold"
          >
            ♥
          </a>

          {/* INSTAGRAM */}
          <a
            href="#"
            aria-label="Instagram"
            className="inline-flex items-center justify-center"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>

          {/* PINTEREST */}
          <a href="#" aria-label="Pinterest" className="text-[13px] font-bold">
            p
          </a>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   MENU ITEM
============================================================ */

function NavItem({
  label,
  active = false,
  dropdown = false,
}: {
  label: string;
  active?: boolean;
  dropdown?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Explore", href: "#" },
    { label: "Popular Places", href: "#" },
    { label: "Special Offers", href: "#" },
  ];

  return (
    <div
      className="relative flex h-full items-center"
      onMouseLeave={() => setIsOpen(false)}
    >
      {dropdown ? (
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={() => setIsOpen(true)}
          className={`
            relative
            flex
            h-full
            items-center
            px-[13px]
            text-[15px]
            font-semibold
            transition

            ${active ? "text-[#ff963d]" : "text-[#747780] hover:text-[#ff963d]"}
          `}
        >
          {label}

          <svg
            className="ml-[4px] h-[9px] w-[9px]"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="m3 4.5 3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <Link
          href="#"
          className={`
            relative
            flex
            h-full
            items-center
            px-[13px]
            text-[15px]
            font-semibold
            transition

            ${active ? "text-[#ff963d]" : "text-[#747780] hover:text-[#ff963d]"}
          `}
        >
          {label}
        </Link>
      )}

      {dropdown && isOpen && (
        <div className="absolute left-0 top-full z-50 mt-[10px] min-w-[190px] rounded-xl border border-[#e7ebf0] bg-white p-[8px] shadow-lg">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-lg px-[10px] py-[8px] text-[14px] font-semibold text-[#172238] transition hover:bg-[#f7f9fc] hover:text-[#ff963d]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
