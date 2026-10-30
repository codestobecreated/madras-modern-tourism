"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { contact, navItems } from "./data";
import { btn, cx } from "./ui";

const shadow = "[box-shadow:0_20px_50px_rgba(16,26,44,0.08)]";

/** Madras Modern Tourism logo image (public/images/shared/logo.png), used in the navbar. */
function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="Madras Modern Tourism home"
      className="flex flex-[0_0_270px] items-center justify-center max1600:basis-[214px] max1024:basis-auto max1024:px-[24px] max767:px-[12px]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/shared/logo.png" alt="Madras Modern Tourism LLC" width={530} height={190} className="w-auto h-[58px] max1024:h-[52px] max767:h-[44px]" />
    </Link>
  );
}

const topbarLink = "inline-flex items-center gap-[10px]";
const topbarIcon = "text-orange";
const socialLink = "inline-flex items-center justify-center w-[14px] text-[14px] hover:text-orange";
const iconBtn =
  "relative items-center justify-center w-[42px] h-[42px] [border:0] rounded-[50%] bg-transparent text-navy text-[21px] hover:text-orange";
// Cart and search are bare icons in the reference (20px / 18px, #292929).
const barIcon = "relative inline-flex items-center justify-center [border:0] bg-transparent p-0 text-[#292929] hover:text-orange";
const mobileLink =
  "max1024:block max1024:py-[12px] max1024:border-b max1024:border-b-line max1024:text-navy";

/** `current` is the nav href to highlight (the page you are on). */
export default function Header({ current = "/" }: { current?: string }) {
  const [sticky, setSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="relative z-50 bg-white">
      <div
        className={cx(
          "flex items-center justify-between gap-[20px] h-[45px] pl-[285px] pr-[70px] bg-blue text-white text-[14px] font-medium",
          "max1600:pl-[229px] max1600:pr-[30px] max1600:text-[14px] max1024:hidden"
        )}
      >
        <div className="flex items-center gap-[20px] font-dm leading-[29px]">
          <span className={topbarLink}><i className={cx("fa-solid fa-location-dot", topbarIcon)} />{contact.address}</span>
          <a href={`mailto:${contact.email}`} className={topbarLink}><i className={cx("fa-regular fa-envelope", topbarIcon)} />{contact.email}</a>
        </div>
        <div className="flex items-center gap-[30px]">
          <Link href="/contact" className={cx(topbarLink, "gap-[6px] text-[13px] font-semibold hover:text-orange")}>
            <i className="fa-regular fa-circle-user text-[16px]" />Sign in or Register
          </Link>
          <div className="flex items-center gap-[18px]">
            <a href="#" aria-label="Facebook" className={socialLink}><i className="fa-brands fa-facebook-f" /></a>
            <a href="#" aria-label="Twitter" className={socialLink}><i className="fa-brands fa-twitter" /></a>
            <a href="#" aria-label="Instagram" className={socialLink}><i className="fa-brands fa-instagram" /></a>
            <a href="#" aria-label="Pinterest" className={socialLink}><i className="fa-brands fa-pinterest" /></a>
          </div>
        </div>
      </div>

      {sticky && <div className="h-[80px] max1024:h-[84px] max767:h-[72px]" />}
      <div
        className={cx(
          "flex items-center bg-white",
          sticky
            ? "fixed top-0 left-0 right-0 h-[80px] [box-shadow:0_10px_30px_rgba(16,26,44,0.08)] [animation:mmt-drop_0.4s_ease]"
            : "h-[80px] max1024:h-[84px] max767:h-[72px]"
        )}
      >
        <BrandLogo />
        <div
          className={cx(
            "flex flex-1 items-center justify-between gap-[20px] self-stretch m-0 pl-[40px] pr-[70px] bg-white rounded-[50px_0_0_50px]",
            !sticky && "[box-shadow:0_4px_40px_rgba(0,0,0,0.1)]",
            "max1600:pl-[25px] max1600:pr-[31px] max1440:gap-[14px]",
            "max1024:justify-end max1024:pl-[20px] max1024:pr-[20px] max1024:rounded-[50px_0_0_50px]",
            "max767:gap-[6px] max767:pl-[14px] max767:pr-[8px]"
          )}
        >
          <nav aria-label="Main">
            <ul className="flex items-center gap-[42px] max1600:gap-[28px] max1280:gap-[22px] max1024:hidden">
              {navItems.map((item) => (
                <li key={item.label} className="group/item relative">
                  <Link
                    href={item.href}
                    className={cx(
                      "inline-flex items-center gap-[5px] py-[26px] text-[17px] font-medium max1600:text-[16px]",
                      item.href === current ? "text-orange" : "text-body group-hover/item:text-orange"
                    )}
                  >
                    {item.label}
                    {item.children && <i className="fa-solid fa-chevron-down text-[10px]" />}
                  </Link>
                  {item.children && (
                    <ul
                      className={cx(
                        "absolute top-full left-[-20px] min-w-[240px] bg-white rounded-[12px]",
                        shadow,
                        "opacity-0 invisible [transform:translateY(12px)] [transition:all_0.25s_ease]",
                        "group-hover/item:opacity-100 group-hover/item:visible group-hover/item:[transform:translateY(0)]"
                      )}
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            className="block py-[8px] px-[24px] text-navy text-[15px] hover:text-orange hover:pl-[30px]"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-[18px] max767:gap-0">
            <a
              className="flex items-center gap-[10px] pr-[26px] border-r border-r-line leading-[1.3] max1440:pr-[15px] max1280:hidden"
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
            >
              <span className="inline-flex items-center justify-center w-[40px] h-[40px] rounded-[50%] bg-orange text-white text-[18px]">
                <i className="fa-solid fa-phone-volume" />
              </span>
              <span>
                <small className="block text-body text-[13px] font-medium leading-[1.2] tracking-[-0.02em] whitespace-nowrap">Call Anytime</small>
                <strong className="text-navy text-[16px] font-semibold leading-[22px] whitespace-nowrap">{contact.phone}</strong>
              </span>
            </a>
            <button className={cx(barIcon, "text-[20px] max1024:w-[42px] max1024:h-[42px]")} aria-label="Cart, 0 items">
              <i className="fa-solid fa-cart-shopping" />
              <span className="absolute top-[-10px] right-[-10px] inline-flex items-center justify-center min-w-[17px] h-[17px] rounded-[50%] bg-orange text-white text-[10px] font-bold">0</span>
            </button>
            <button className={cx(barIcon, "text-[18px] max1024:w-[42px] max1024:h-[42px]")} aria-label="Search"><i className="fa-solid fa-magnifying-glass" /></button>
            <Link
              href="/book-now"
              className="inline-flex items-center gap-[10px] pt-[12px] px-[16px] pb-[15px] [border:0] rounded-[30px] bg-orange !text-white text-[15px] font-semibold leading-none whitespace-nowrap hover:bg-blue hover:[transform:translateY(-2px)] max1024:hidden hover:!text-white"
            >
              Start Booking
            </Link>
            <button className={cx(iconBtn, "hidden max1024:inline-flex")} aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={cx(
          "hidden max1024:fixed max1024:inset-0 max1024:z-[100] max1024:block",
          menuOpen ? "max1024:visible max1024:pointer-events-auto" : "max1024:invisible max1024:pointer-events-none"
        )}
        aria-hidden={!menuOpen}
      >
        <div
          className={cx(
            "max1024:absolute max1024:inset-0 max1024:bg-[rgba(16,26,44,0.6)] max1024:[transition:opacity_0.3s_ease]",
            menuOpen ? "max1024:opacity-100" : "max1024:opacity-0"
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cx(
            "max1024:absolute max1024:top-0 max1024:bottom-0 max1024:left-0 max1024:w-[min(320px,85vw)] max1024:p-[24px] max1024:overflow-y-auto max1024:bg-white",
            "max1024:[transition:transform_0.3s_ease]",
            menuOpen ? "max1024:[transform:none]" : "max1024:[transform:translateX(-100%)]"
          )}
        >
          <button className={cx(iconBtn, "inline-flex max1024:flex max1024:ml-auto")} aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <i className="fa-solid fa-xmark" />
          </button>
          <nav aria-label="Mobile">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link href={item.href} className={cx(mobileLink, "max1024:font-semibold")} onClick={() => setMenuOpen(false)}>{item.label}</Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    className={cx(mobileLink, "max1024:pl-[18px] max1024:font-normal max1024:text-[15px]")}
                    onClick={() => setMenuOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          <Link href="/book-now" className={btn} style={{ marginTop: 24 }}>Start Booking</Link>
        </div>
      </div>
    </header>
  );
}
