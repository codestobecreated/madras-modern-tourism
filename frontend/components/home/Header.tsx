"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { contact, navItems } from "./data";

export function Logo() {
  return (
    <Link href="/" className="mmt-logo" aria-label="Madras Modern Tourism home">
      <span className="mmt-logo-mark"><i className="fa-solid fa-plane-up" /></span>
      <span className="mmt-logo-name"><b>M</b>adras</span>
      <span className="mmt-logo-sub">MODERN TOURISM LLC</span>
    </Link>
  );
}

export default function Header() {
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
    <header className={`mmt-header${sticky ? " sticky" : ""}`}>
      <div className="mmt-topbar">
        <div className="mmt-topbar-info">
          <span><i className="fa-solid fa-location-dot" />{contact.address}</span>
          <a href={`mailto:${contact.email}`}><i className="fa-regular fa-envelope" />{contact.email}</a>
        </div>
        <div className="mmt-topbar-right">
          <Link href="/contact"><i className="fa-solid fa-circle-user" />Sign in or Register</Link>
          <div className="mmt-socials">
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" /></a>
            <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter" /></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            <a href="#" aria-label="Pinterest"><i className="fa-brands fa-pinterest" /></a>
          </div>
        </div>
      </div>

      {sticky && <div className="mmt-header-spacer" />}
      <div className="mmt-navbar">
        <Logo />
        <div className="mmt-nav-panel">
          <nav aria-label="Main">
            <ul className="mmt-menu">
              {navItems.map((item) => (
                <li key={item.label} className={item.href === "/" ? "active" : undefined}>
                  <Link href={item.href}>
                    {item.label}
                    {item.children && <i className="fa-solid fa-chevron-down" />}
                  </Link>
                  {item.children && (
                    <ul className="mmt-submenu">
                      {item.children.map((child) => (
                        <li key={child.label}><Link href={child.href}>{child.label}</Link></li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mmt-nav-actions">
            <a className="mmt-call" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
              <span className="mmt-call-icon"><i className="fa-solid fa-phone-volume" /></span>
              <span><small>Call Anytime</small><strong>{contact.phone}</strong></span>
            </a>
            <button className="mmt-icon-btn" aria-label="Cart, 0 items">
              <i className="fa-solid fa-cart-shopping" /><span className="mmt-cart-count">0</span>
            </button>
            <button className="mmt-icon-btn" aria-label="Search"><i className="fa-solid fa-magnifying-glass" /></button>
            <Link href="/tours-page" className="mmt-btn">Start Booking</Link>
            <button className="mmt-icon-btn mmt-burger" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <i className="fa-solid fa-bars" />
            </button>
          </div>
        </div>
      </div>

      <div className={`mmt-mobile-menu${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mmt-mobile-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="mmt-mobile-panel">
          <button className="mmt-icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <i className="fa-solid fa-xmark" />
          </button>
          <nav aria-label="Mobile">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
                {item.children?.map((child) => (
                  <Link key={child.label} href={child.href} className="child" onClick={() => setMenuOpen(false)}>
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
          <Link href="/tours-page" className="mmt-btn" style={{ marginTop: 24 }}>Start Booking</Link>
        </div>
      </div>
    </header>
  );
}
