'use client';

import { useEffect } from "react";
import RawHtmlRenderer from "./RawHtmlRenderer";
import HeroSearchHandler from "./HeroSearchHandler";
import DestinationCarouselHandler from "./DestinationCarouselHandler";
import { WpStylesheet } from "@/lib/wpPageUtils";

interface WpPageContentProps {
  html: string;
  bodyClass: string;
  bodyStyle?: string;
  stylesheets?: WpStylesheet[];
}

// Caret override CSS injected AFTER all WP theme stylesheets
// so it always wins the cascade (last stylesheet wins at same specificity).
const CARET_OVERRIDE_CSS = `
  /* ── Navbar dropdown chevron override ─────────────────
     Applied after all WP/Bootstrap stylesheets so it wins.
     Uses an inline SVG chevron – no icon-font dependency.
  ─────────────────────────────────────────────────────── */

  /* Safety-net: hide caret on menu items that have no submenu */
  header .gva-nav-menu > li:not(.menu-item-has-children) .caret,
  header .gva-nav-menu > li.menu-item-home .caret {
    display: none !important;
  }

  /* Force display title_field on top of inputs for search bar */
  .wpte-trip__search-fields .title_field,
  .wpte-trip__adv-field .title_field {
    display: block !important;
    font-family: "Plus Jakarta Sans", "Inter", sans-serif !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    color: #94a3b8 !important;
    margin-bottom: 2px !important;
    line-height: 1.2 !important;
    text-transform: capitalize !important;
  }

  /* Force display dropdown popup on click (.active only) */
  .wpte-trip__adv-field.active .wpte__select-options {
    display: block !important;
  }

  /* 1. Reset Bootstrap's border-triangle .caret */
  header .gva-nav-menu .caret,
  header .gva-nav-menu li a .caret {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 16px !important;
    height: 16px !important;
    margin-left: 3px !important;
    vertical-align: middle !important;
    border: none !important;
    border-top: none !important;
    border-right: none !important;
    border-bottom: none !important;
    border-left: none !important;
    border-width: 0 !important;
    background: none !important;
    overflow: visible !important;
    position: relative !important;
    flex-shrink: 0 !important;
    padding: 0 !important;
    margin-bottom: 0 !important;
    opacity: 1 !important;
  }

  /* 2. Draw an SVG chevron-down via ::after */
  header .gva-nav-menu .caret::after,
  header .gva-nav-menu li a .caret::after {
    content: '' !important;
    display: block !important;
    width: 10px !important;
    height: 6px !important;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231e2a44' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: contain !important;
    transition: background-image 0.2s ease !important;
    flex-shrink: 0 !important;
  }

  /* 3. Orange chevron on hover */
  header .gva-nav-menu > li > a:hover .caret::after,
  header .gva-nav-menu > li > a:hover .caret::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23f9a826' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
  }

  /* 4. Orange chevron for active/current page */
  header .gva-nav-menu > li.current-menu-item > a .caret::after,
  header .gva-nav-menu > li.current-menu-parent > a .caret::after,
  header .gva-nav-menu > li.current-menu-ancestor > a .caret::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23f9a826' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
  }

  /* Mobile / off-canvas menu caret */
  .gva-offcanvas-content.mobile .caret::after {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 6'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%231e2a44' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !important;
  }

  /* ── DESTINATION LIST — left / right layout (beats Elementor post CSS) ── */

  .elementor-16 .elementor-element.elementor-element-6de3ad4.dest-list-section {
    --display: flex !important;
    --flex-direction: row !important;
    --flex-wrap: nowrap !important;
    --align-items: center !important;
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
  }

  .elementor-16 .dest-list-section > .dest-list-left,
  .elementor-16 .dest-list-section > .elementor-element-11d7825 {
    --width: auto !important;
    flex: 0 1 36% !important;
    max-width: 420px !important;
    min-width: 0 !important;
    width: auto !important;
  }

  .elementor-16 .dest-list-section > .dest-list-right,
  .elementor-16 .dest-list-section > .elementor-element-3baafca {
    --width: auto !important;
    flex: 1 1 64% !important;
    min-width: 0 !important;
    width: auto !important;
    overflow: hidden !important;
  }

  @media (max-width: 1024px) {
    .elementor-16 .elementor-element.elementor-element-6de3ad4.dest-list-section {
      --flex-direction: column !important;
      flex-direction: column !important;
      align-items: stretch !important;
    }

    .elementor-16 .dest-list-section > .dest-list-left,
    .elementor-16 .dest-list-section > .dest-list-right,
    .elementor-16 .dest-list-section > .elementor-element-11d7825,
    .elementor-16 .dest-list-section > .elementor-element-3baafca {
      --width: 100% !important;
      flex: 1 1 auto !important;
      max-width: 100% !important;
      width: 100% !important;
    }
  }

  /* ── DESTINATION CARDS (dest-list-section only) ──────── */

  .dest-list-section .banner-three__single,
  .dest-list-section div.banner-three__single {
    background: #ffffff !important;
    border: 1px solid rgba(226, 232, 240, 0.9) !important;
    border-radius: var(--dest-arch-radius, 110px) var(--dest-arch-radius, 110px) 24px 24px !important;
    overflow: hidden !important;
    position: relative !important;
    box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.06) !important;
  }

  .dest-list-section .banner-three__single::after {
    display: none !important;
  }

  .dest-list-section .banner-three__single--blue,
  .dest-list-section div.banner-three__single.banner-three__single--blue {
    background: linear-gradient(180deg, #0284c7 0%, #0264d8 100%) !important;
    border: 1px solid rgba(2, 100, 216, 0.3) !important;
  }

  .dest-list-section .banner-three__content {
    background: #ffffff !important;
  }
  .dest-list-section .banner-three__single--blue .banner-three__content {
    background: transparent !important;
  }

  .dest-list-section .banner-three__image,
  .dest-list-section div.banner-three__image {
    border-radius: var(--dest-arch-radius, 110px) var(--dest-arch-radius, 110px) 0 0 !important;
  }

  .dest-list-section .banner-three__image img,
  .dest-list-section div.banner-three__image img {
    border-radius: var(--dest-arch-radius, 110px) var(--dest-arch-radius, 110px) 0 0 !important;
  }

  .dest-list-section .banner-three__count {
    color: #ffffff !important;
    font-weight: 700 !important;
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
    width: auto !important;
    display: inline-block !important;
    border-radius: 999px !important;
    position: absolute !important;
    bottom: 14px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4) !important;
  }

  .dest-list-section .banner-three__single--blue .banner-three__count {
    background: #ffffff !important;
    color: #0264d8 !important;
  }

  .dest-list-section .banner-three__sub-title {
    color: #0264d8 !important;
    font-weight: 800 !important;
  }

  .dest-list-section .banner-three__single--blue .banner-three__sub-title {
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .dest-list-section .banner-three__title,
  .dest-list-section h3.banner-three__title,
  .dest-list-section .banner-three__title a {
    color: #0f172a !important;
    font-weight: 800 !important;
  }

  .dest-list-section .banner-three__single--blue .banner-three__title,
  .dest-list-section .banner-three__single--blue h3.banner-three__title,
  .dest-list-section .banner-three__single--blue .banner-three__title a {
    color: #ffffff !important;
  }
`;

export default function WpPageContent({
  html,
  bodyClass,
  bodyStyle = "--scroll-bar: 15px",
  stylesheets = []
}: WpPageContentProps) {
  useEffect(() => {
    // 1. Add page-specific stylesheets dynamically
    const addedLinks: HTMLLinkElement[] = [];

    stylesheets.forEach((style) => {
      // Avoid duplicates
      const exists = style.id 
        ? document.getElementById(style.id) 
        : document.querySelector(`link[href="${style.href}"]`);
        
      if (!exists) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        if (style.id) link.id = style.id;
        link.href = style.href;
        if (style.media) link.media = style.media;
        document.head.appendChild(link);
        addedLinks.push(link);
      }
    });

    // 2. Inject caret override AFTER all theme stylesheets
    //    so it always wins the CSS cascade.
    const caretStyleId = "wp-caret-override";
    let caretStyleEl = document.getElementById(caretStyleId) as HTMLStyleElement | null;
    if (!caretStyleEl) {
      caretStyleEl = document.createElement("style");
      caretStyleEl.id = caretStyleId;
      caretStyleEl.textContent = CARET_OVERRIDE_CSS;
      document.head.appendChild(caretStyleEl);
    }

    // 3. Set WordPress body attributes
    const prevClass = document.body.className;
    const prevStyle = document.body.getAttribute("style");
    const prevDeviceMode = document.body.getAttribute("data-elementor-device-mode");
    const prevCzShortcut = document.body.getAttribute("cz-shortcut-listen");

    document.body.className = bodyClass;
    if (bodyStyle) {
      document.body.setAttribute("style", bodyStyle);
    } else {
      document.body.removeAttribute("style");
    }
    document.body.setAttribute("data-elementor-device-mode", "desktop");
    document.body.setAttribute("cz-shortcut-listen", "true");

    return () => {
      // Cleanup: remove dynamic stylesheet links
      addedLinks.forEach((link) => {
        link.parentNode?.removeChild(link);
      });

      // Remove caret override style
      const caretEl = document.getElementById(caretStyleId);
      if (caretEl) caretEl.parentNode?.removeChild(caretEl);

      // Restore previous body attributes
      document.body.className = prevClass;
      if (prevStyle) {
        document.body.setAttribute("style", prevStyle);
      } else {
        document.body.removeAttribute("style");
      }
      if (prevDeviceMode) {
        document.body.setAttribute("data-elementor-device-mode", prevDeviceMode);
      } else {
        document.body.removeAttribute("data-elementor-device-mode");
      }
      if (prevCzShortcut) {
        document.body.setAttribute("cz-shortcut-listen", prevCzShortcut);
      } else {
        document.body.removeAttribute("cz-shortcut-listen");
      }
    };
  }, [bodyClass, bodyStyle, stylesheets]);

  return (
    <>
      <RawHtmlRenderer html={html} />
      <HeroSearchHandler />
      <DestinationCarouselHandler />
    </>
  );
}
