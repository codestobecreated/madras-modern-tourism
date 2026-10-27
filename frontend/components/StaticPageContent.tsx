'use client';

import { useEffect } from "react";
import RawHtmlRenderer from "./RawHtmlRenderer";
import HeroSearchHandler from "./HeroSearchHandler";
import DestinationCarouselHandler from "./DestinationCarouselHandler";
import { StaticStylesheet } from "@/lib/staticPageData";

interface StaticPageContentProps {
  html: string;
  bodyClass: string;
  bodyStyle?: string;
  stylesheets?: StaticStylesheet[];
}

// Caret override CSS injected AFTER all WP theme stylesheets
// so it always wins the cascade (last stylesheet wins at same specificity).
const CARET_OVERRIDE_CSS = `
  /* ── Navbar dropdown chevron override ─────────────────
     Applied after all source stylesheets so it wins.
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

  /* Destination list reference layout */
  .dest-list-section {
    --dest-card-width: 284px;
    --dest-card-gap: 30px;
    --dest-arch-radius: 142px;
    padding: clamp(74px, 8vw, 112px) clamp(20px, 4vw, 48px) clamp(82px, 7vw, 110px) !important;
    gap: clamp(42px, 5vw, 68px) !important;
    background: #ffffff !important;
  }

  .dest-list-section .gsc-heading .sub-title .tagline {
    background: #f3f6fb !important;
    border: 0 !important;
    color: #0b4fc4 !important;
    padding: 10px 22px !important;
    min-height: 42px !important;
    box-shadow: none !important;
  }

  .dest-list-section .gsc-heading .title span {
    color: #14213d !important;
    font-size: clamp(38px, 3.65vw, 54px) !important;
    line-height: 1.12 !important;
    letter-spacing: 0 !important;
  }

  .dest-list-section .dest-highlight-blue {
    color: #14213d !important;
  }

  .dest-list-section .dest-title-underline {
    display: none !important;
  }

  .dest-list-section .gsc-heading .title-desc {
    color: #6d7488 !important;
    font-size: 16px !important;
    line-height: 1.8 !important;
    margin-top: 22px !important;
    margin-bottom: 30px !important;
    max-width: 405px !important;
  }

  .dest-list-section .gsc-heading .heading-action .btn-theme,
  .dest-list-section .gsc-heading .heading-action a.btn-cta {
    background: #ff9838 !important;
    border-radius: 22px !important;
    padding: 16px 31px !important;
    min-width: 172px !important;
    min-height: 52px !important;
    box-shadow: none !important;
  }

  .dest-list-section .gsc-listings-banner-group,
  .dest-list-section .swiper-slider-wrapper {
    padding: 0 !important;
    overflow: visible !important;
  }

  .dest-list-section .gsc-listings-banner-group .swiper-slide,
  .dest-list-section .gsc-listings-banner-group .dest-slide,
  .dest-list-section .gsc-listings-banner-group .item {
    width: var(--dest-card-width) !important;
    max-width: var(--dest-card-width) !important;
    margin-right: var(--dest-card-gap) !important;
  }

  .dest-list-section .banner-three__single,
  .dest-list-section div.banner-three__single {
    width: var(--dest-card-width) !important;
    min-height: 448px !important;
    background: #f8f4ef !important;
    border: 0 !important;
    border-radius: var(--dest-arch-radius) var(--dest-arch-radius) 0 0 !important;
    box-shadow: none !important;
    overflow: hidden !important;
  }

  .dest-list-section .banner-three__single:hover,
  .dest-list-section .banner-three__single--blue:hover {
    transform: none !important;
    box-shadow: none !important;
  }

  .dest-list-section .banner-three__single--blue,
  .dest-list-section div.banner-three__single.banner-three__single--blue {
    background: #0667c8 !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  .dest-list-section .banner-three__wrap {
    min-height: 448px !important;
    border-radius: inherit !important;
    overflow: hidden !important;
  }

  .dest-list-section .banner-three__image,
  .dest-list-section div.banner-three__image {
    width: var(--dest-card-width) !important;
    height: var(--dest-card-width) !important;
    border-radius: 50% !important;
    overflow: hidden !important;
    flex: 0 0 var(--dest-card-width) !important;
  }

  .dest-list-section .banner-three__image img,
  .dest-list-section div.banner-three__image img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 50% !important;
  }

  .dest-list-section .banner-three__single:hover .banner-three__image img {
    transform: none !important;
  }

  .dest-list-section .banner-three__count {
    position: absolute !important;
    left: 50% !important;
    bottom: 17px !important;
    transform: translateX(-50%) !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-width: 68px !important;
    height: 31px !important;
    padding: 0 16px !important;
    border-radius: 999px !important;
    background: #ff9838 !important;
    color: #ffffff !important;
    font-size: 12px !important;
    font-weight: 800 !important;
    line-height: 1 !important;
    white-space: nowrap !important;
    box-shadow: none !important;
    z-index: 6 !important;
  }

  .dest-list-section .banner-three__single--blue .banner-three__count {
    background: #005ec8 !important;
    color: #ffffff !important;
  }

  .dest-list-section .banner-three__content {
    background: transparent !important;
    text-align: center !important;
    padding: 20px 20px 26px !important;
    display: block !important;
  }

  .dest-list-section .banner-three__sub-title,
  .dest-list-section .banner-three__single--blue .banner-three__sub-title {
    color: #ff9838 !important;
    font-size: 13px !important;
    font-weight: 800 !important;
    letter-spacing: 0.4px !important;
    line-height: 1.2 !important;
    margin: 0 0 5px !important;
    text-align: center !important;
  }

  .dest-list-section .banner-three__title,
  .dest-list-section h3.banner-three__title,
  .dest-list-section .banner-three__title a {
    color: #14213d !important;
    font-size: 22px !important;
    line-height: 1.16 !important;
    font-weight: 800 !important;
    margin: 0 !important;
    text-align: center !important;
  }

  .dest-list-section .banner-three__single--blue .banner-three__title,
  .dest-list-section .banner-three__single--blue h3.banner-three__title,
  .dest-list-section .banner-three__single--blue .banner-three__title a {
    color: #ffffff !important;
  }

  .dest-list-section .dest-card-wave-svg,
  .dest-list-section .dest-card-flag-badge,
  .dest-list-section .dest-card-heart-btn,
  .dest-list-section .dest-card-meta,
  .dest-list-section .dest-card-divider,
  .dest-list-section .dest-card-footer,
  .dest-list-section .dest-next-arrow-btn,
  .dest-list-section .dest-carousel-dots,
  .dest-features-bar {
    display: none !important;
  }

  @media (max-width: 1200px) {
    .dest-list-section {
      --dest-card-width: 250px;
      --dest-card-gap: 22px;
    }
  }

  @media (max-width: 1024px) {
    .dest-list-section {
      --dest-card-width: min(70vw, 284px);
      flex-direction: column !important;
      align-items: stretch !important;
      padding: 58px 22px 70px !important;
    }
  }

  @media (max-width: 480px) {
    .dest-list-section {
      --dest-card-width: min(78vw, 244px);
      --dest-card-gap: 16px;
    }

    .dest-list-section .banner-three__single,
    .dest-list-section div.banner-three__single,
    .dest-list-section .banner-three__wrap {
      min-height: calc(var(--dest-card-width) + 140px) !important;
    }
  }
  .elementor-16 .elementor-element.elementor-element-6de3ad4.dest-list-section,
  .elementor-16 .elementor-element.elementor-element-6de3ad4.dest-list-section.dest-list-section {
    --dest-card-width: 284px !important;
    --dest-card-gap: 30px !important;
    --dest-arch-radius: 142px !important;
  }

  @media (max-width: 1200px) {
    .elementor-16 .elementor-element.elementor-element-6de3ad4.dest-list-section,
    .elementor-16 .elementor-element.elementor-element-6de3ad4.dest-list-section.dest-list-section {
      --dest-card-width: 250px !important;
      --dest-card-gap: 22px !important;
    }
  }

  @media (max-width: 1024px) {
    .elementor-16 .elementor-element.elementor-element-6de3ad4.dest-list-section,
    .elementor-16 .elementor-element.elementor-element-6de3ad4.dest-list-section.dest-list-section {
      --dest-card-width: min(70vw, 284px) !important;
    }
  }

  @media (max-width: 480px) {
    .elementor-16 .elementor-element.elementor-element-6de3ad4.dest-list-section,
    .elementor-16 .elementor-element.elementor-element-6de3ad4.dest-list-section.dest-list-section {
      --dest-card-width: min(78vw, 244px) !important;
      --dest-card-gap: 16px !important;
    }
  }
  .dest-list-section .gsc-listings-banner-group,
  .dest-list-section .swiper-slider-wrapper,
  .dest-list-section .gsc-listings-banner-group .swiper-content-inner,
  .dest-list-section .init-carousel-swiper.swiper {
    clip-path: inset(-24px -100vw -40px 0) !important;
  }
  /* Reference navbar redesign */
  header.wp-site-header,
  header .header_default_screen,
  header .header-builder-inner,
  header .header-main-wrapper {
    position: relative !important;
    z-index: 50 !important;
    background: transparent !important;
    overflow: visible !important;
  }

  header .header-builder-inner {
    min-height: 142px !important;
  }

  header .elementor-element-dc82d92 {
    position: relative !important;
    min-height: 120px !important;
    height: 120px !important;
    padding: 0 clamp(44px, 14vw, 272px) !important;
    background: #ffffff !important;
    box-shadow: none !important;
    border: 0 !important;
    gap: 24px !important;
    overflow: hidden !important;
  }

  header .elementor-element-dc82d92::before {
    content: "" !important;
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
    width: 40.6% !important;
    height: 120px !important;
    background: #0868cc !important;
    z-index: 0 !important;
    pointer-events: none !important;
  }

  header .elementor-element-dc82d92::after {
    content: "" !important;
    position: absolute !important;
    top: -71px !important;
    right: 35.1% !important;
    width: 188px !important;
    height: 188px !important;
    border-radius: 0 0 96px 0 !important;
    background: #f4f7fb !important;
    z-index: 1 !important;
    pointer-events: none !important;
  }

  header .elementor-element-10df061,
  header .elementor-element-d5999dd {
    position: relative !important;
    z-index: 3 !important;
  }

  header .elementor-element-10df061 {
    width: 162px !important;
    min-width: 162px !important;
    max-width: 162px !important;
    flex: 0 0 162px !important;
  }

  header .gsc-logo img {
    height: 58px !important;
    max-height: 58px !important;
    max-width: 158px !important;
    object-fit: contain !important;
  }

  @media (min-width: 1200px) {
    header .elementor-element-d5999dd {
      height: 120px !important;
      min-height: 120px !important;
      flex: 1 1 auto !important;
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      border: 0 !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      overflow: visible !important;
    }

    header .elementor-element-d5999dd:hover {
      box-shadow: none !important;
      border-color: transparent !important;
    }

    header .elementor-element-01d317e {
      flex: 1 1 auto !important;
      justify-content: flex-start !important;
      min-width: 0 !important;
      padding-right: 28px !important;
    }

    header .gva-nav-menu {
      gap: 22px !important;
      justify-content: flex-start !important;
    }

    header .gva-nav-menu > li > a {
      color: #5c5b69 !important;
      font-size: 16px !important;
      font-weight: 500 !important;
      padding: 12px 0 !important;
      line-height: 1 !important;
    }

    header .gva-nav-menu > li > a:hover,
    header .gva-nav-menu > li.current-menu-item > a,
    header .gva-nav-menu > li.current-menu-parent > a,
    header .gva-nav-menu > li.current-menu-ancestor > a {
      color: #ff9637 !important;
    }

    header .gva-nav-menu .caret {
      width: 9px !important;
      height: 9px !important;
      margin-left: 5px !important;
    }

    header .gva-nav-menu .caret::after {
      content: "" !important;
      width: 6px !important;
      height: 6px !important;
      border-right: 1.5px solid currentColor !important;
      border-bottom: 1.5px solid currentColor !important;
      transform: rotate(45deg) translateY(-2px) !important;
      color: inherit !important;
      background: none !important;
    }

    header .elementor-element-6132e4e {
      height: 120px !important;
      min-width: 395px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: flex-end !important;
      gap: 16px !important;
      margin-left: 0 !important;
      color: #ffffff !important;
    }

    .custom-nav-divider {
      display: none !important;
    }

    .custom-language-selector {
      width: 42px !important;
      height: 42px !important;
      border-radius: 50% !important;
      border: 1px solid rgba(255, 255, 255, 0.82) !important;
      padding: 0 !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      color: #ffffff !important;
      background: transparent !important;
      flex: 0 0 42px !important;
    }

    .custom-language-selector .lang-text,
    .custom-language-selector .chevron-icon {
      display: none !important;
    }

    .custom-language-selector .globe-icon {
      font-size: 0 !important;
    }

    .custom-language-selector .globe-icon::before {
      content: "\f007" !important;
      font-family: "Font Awesome 5 Free" !important;
      font-weight: 900 !important;
      font-size: 15px !important;
    }

    header .elementor-element-406535f .elementor-button,
    header .elementor-element-406535f a.elementor-button {
      min-height: 42px !important;
      padding: 0 25px !important;
      border-radius: 999px !important;
      background: #ffffff !important;
      color: #16213a !important;
      font-size: 15px !important;
      font-weight: 700 !important;
      box-shadow: none !important;
    }

    header .elementor-element-406535f .elementor-button:hover,
    header .elementor-element-406535f a.elementor-button:hover {
      background: #ffffff !important;
      color: #ff9637 !important;
      transform: none !important;
      box-shadow: none !important;
    }

    #mm-navbar-phone {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
      color: #ffffff !important;
      flex: 0 0 auto !important;
    }

    #mm-navbar-phone .mm-phone-icon {
      width: 42px !important;
      height: 42px !important;
      border-radius: 50% !important;
      background: #ff9637 !important;
      color: #ffffff !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      font-size: 14px !important;
    }

    #mm-navbar-phone .mm-phone-text {
      display: flex !important;
      flex-direction: column !important;
      gap: 1px !important;
      line-height: 1.05 !important;
    }

    #mm-navbar-phone small {
      color: #ffffff !important;
      font-size: 12px !important;
      font-weight: 500 !important;
    }

    #mm-navbar-phone strong {
      color: #ffffff !important;
      font-size: 16px !important;
      font-weight: 600 !important;
      white-space: nowrap !important;
    }
  }

  #mm-navbar-info-bar {
    position: absolute !important;
    left: 50% !important;
    bottom: 0 !important;
    transform: translate(-50%, 50%) !important;
    width: min(1360px, calc(100vw - 544px)) !important;
    min-width: 920px !important;
    height: 42px !important;
    border-radius: 999px !important;
    background: #ff9938 !important;
    color: #ffffff !important;
    z-index: 8 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 0 36px 0 94px !important;
    box-shadow: none !important;
    font-family: "Plus Jakarta Sans", "Inter", sans-serif !important;
    pointer-events: auto !important;
  }

  #mm-navbar-info-bar .mm-navbar-info-left,
  #mm-navbar-info-bar .mm-navbar-info-right {
    display: flex !important;
    align-items: center !important;
  }

  #mm-navbar-info-bar .mm-navbar-info-left {
    gap: 22px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
  }

  #mm-navbar-info-bar .mm-navbar-info-left span,
  #mm-navbar-info-bar .mm-navbar-info-right a {
    display: inline-flex !important;
    align-items: center !important;
    color: #ffffff !important;
    text-decoration: none !important;
  }

  #mm-navbar-info-bar i {
    color: #ffffff !important;
    margin-right: 10px !important;
    font-size: 13px !important;
  }

  #mm-navbar-info-bar .mm-navbar-info-right {
    gap: 18px !important;
  }

  #mm-navbar-info-bar .mm-navbar-info-right a {
    width: 16px !important;
    height: 16px !important;
    justify-content: center !important;
  }

  #mm-navbar-info-bar .mm-navbar-info-right i {
    margin: 0 !important;
    font-size: 13px !important;
  }

  @media (max-width: 1399px) {
    header .elementor-element-dc82d92 {
      padding-left: 36px !important;
      padding-right: 36px !important;
    }

    #mm-navbar-info-bar {
      width: calc(100vw - 72px) !important;
      min-width: 0 !important;
    }
  }

  @media (max-width: 1199px) {
    header .elementor-element-dc82d92 {
      height: auto !important;
      min-height: 86px !important;
      padding: 8px 4% !important;
      overflow: visible !important;
    }

    header .elementor-element-dc82d92::before,
    header .elementor-element-dc82d92::after,
    #mm-navbar-info-bar,
    #mm-navbar-phone {
      display: none !important;
    }
  }
  /* Navbar side correction: white left, blue right */
  header .header-main-wrapper {
    position: relative !important;
    background: #ffffff !important;
    min-height: 142px !important;
  }

  header .header-main-wrapper::before {
    content: "" !important;
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
    left: auto !important;
    width: 40.6vw !important;
    min-width: 650px !important;
    height: 120px !important;
    background: #0868cc !important;
    z-index: 0 !important;
    pointer-events: none !important;
  }

  header .elementor-element-dc82d92::before {
    display: none !important;
    content: none !important;
  }

  header .elementor-element-dc82d92 {
    background: #ffffff !important;
    isolation: isolate !important;
  }

  header .elementor-element-10df061 {
    background: #ffffff !important;
  }

  header .elementor-element-10df061,
  header .elementor-element-01d317e {
    z-index: 4 !important;
  }

  header .elementor-element-6132e4e {
    z-index: 5 !important;
  }

  header .elementor-element-dc82d92::after {
    z-index: 2 !important;
  }

  @media (max-width: 1199px) {
    header .header-main-wrapper::before {
      display: none !important;
    }
  }
  /* Final navbar layer fix */
  header .elementor-element-dc82d92 {
    background: transparent !important;
  }

  header .elementor-element-10df061,
  header .elementor-element-01d317e {
    background: transparent !important;
  }

  header .elementor-element-dc82d92::before {
    display: none !important;
    background: transparent !important;
  }
  /* Final reference navbar spacing fix */
  header.wp-site-header,
  header .header_default_screen,
  header .header-builder-inner,
  header .header-main-wrapper {
    height: 120px !important;
    min-height: 120px !important;
    max-height: 120px !important;
    overflow: visible !important;
  }

  header .elementor-element-dc82d92 {
    height: 120px !important;
    min-height: 120px !important;
    max-height: 120px !important;
    overflow: visible !important;
  }

  header .elementor-element-dc82d92::after {
    top: -83px !important;
    right: 35.1% !important;
    width: 202px !important;
    height: 202px !important;
    border-radius: 0 0 102px 0 !important;
  }

  header .header-main-wrapper::before {
    height: 120px !important;
  }

  header .gsc-logo img {
    height: 46px !important;
    max-height: 46px !important;
    max-width: 132px !important;
  }

  header .elementor-element-10df061 {
    width: 146px !important;
    min-width: 146px !important;
    max-width: 146px !important;
    flex-basis: 146px !important;
  }

  #mm-navbar-info-bar {
    top: 98px !important;
    bottom: auto !important;
    transform: translateX(-50%) !important;
    height: 42px !important;
    z-index: 999 !important;
    overflow: visible !important;
  }

  .wrapper-page > #page-content,
  #page-content,
  #wp-main-content.main-page {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  @media (max-width: 1199px) {
    header.wp-site-header,
    header .header_default_screen,
    header .header-builder-inner,
    header .header-main-wrapper,
    header .elementor-element-dc82d92 {
      height: auto !important;
      min-height: 86px !important;
      max-height: none !important;
    }
  }
  /* Header dropdown menu reference style */
  @media (min-width: 1200px) {
    header .gva-navigation-menu,
    header .menu-main-menu-container,
    header .gva-nav-menu,
    header .gva-nav-menu > li {
      overflow: visible !important;
    }

    header .gva-nav-menu li.menu-item-has-children {
      position: relative !important;
    }

    header .gva-nav-menu li .submenu-inner {
      position: absolute !important;
      top: calc(100% + 18px) !important;
      left: 0 !important;
      width: 250px !important;
      min-width: 250px !important;
      margin: 0 !important;
      padding: 0 20px !important;
      list-style: none !important;
      background: #ffffff !important;
      border: 0 !important;
      border-radius: 6px !important;
      box-shadow: 0 18px 42px rgba(15, 23, 42, 0.12) !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      transform: translateY(10px) !important;
      transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease !important;
      z-index: 2000 !important;
    }

    header .gva-nav-menu > li:hover > .submenu-inner,
    header .gva-nav-menu > li:focus-within > .submenu-inner,
    header .gva-nav-menu li.menu-open > .submenu-inner {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      transform: translateY(0) !important;
    }

    header .gva-nav-menu li .submenu-inner li {
      position: relative !important;
      margin: 0 !important;
      padding: 0 !important;
      list-style: none !important;
      background: transparent !important;
      border: 0 !important;
    }

    header .gva-nav-menu li .submenu-inner li:not(:last-child) {
      border-bottom: 1px solid #e5e7eb !important;
    }

    header .gva-nav-menu li .submenu-inner li > a {
      min-height: 50px !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      gap: 16px !important;
      color: #5d5b69 !important;
      font-family: "Plus Jakarta Sans", "Inter", sans-serif !important;
      font-size: 15px !important;
      font-weight: 500 !important;
      line-height: 1.2 !important;
      text-decoration: none !important;
      white-space: nowrap !important;
      background: transparent !important;
      box-shadow: none !important;
      transition: color 0.18s ease !important;
    }

    header .gva-nav-menu li .submenu-inner li > a:hover,
    header .gva-nav-menu li .submenu-inner li:hover > a {
      color: #ff9637 !important;
      background: transparent !important;
    }

    header .gva-nav-menu li .submenu-inner li > a .menu-title {
      color: inherit !important;
    }

    header .gva-nav-menu li .submenu-inner .caret {
      margin-left: auto !important;
      width: 8px !important;
      height: 8px !important;
      display: inline-flex !important;
    }

    header .gva-nav-menu li .submenu-inner .caret::after {
      content: "" !important;
      width: 7px !important;
      height: 7px !important;
      border-right: 1.5px solid currentColor !important;
      border-bottom: 1.5px solid currentColor !important;
      transform: rotate(-45deg) !important;
      background: none !important;
    }

    header .gva-nav-menu li .submenu-inner .submenu-inner {
      top: 0 !important;
      left: calc(100% + 18px) !important;
      transform: translateX(10px) !important;
    }

    header .gva-nav-menu li .submenu-inner li:hover > .submenu-inner,
    header .gva-nav-menu li .submenu-inner li:focus-within > .submenu-inner {
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
      transform: translateX(0) !important;
    }

    #mm-navbar-info-bar {
      z-index: 900 !important;
    }
  }`;

export default function StaticPageContent({
  html,
  bodyClass,
  bodyStyle = "--scroll-bar: 15px",
  stylesheets = []
}: StaticPageContentProps) {
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

    // 2. Inject caret override after source stylesheets
    //    so it always wins the CSS cascade.
    const caretStyleId = "site-caret-override";
    let caretStyleEl = document.getElementById(caretStyleId) as HTMLStyleElement | null;
    if (!caretStyleEl) {
      caretStyleEl = document.createElement("style");
      caretStyleEl.id = caretStyleId;
      caretStyleEl.textContent = CARET_OVERRIDE_CSS;
      document.head.appendChild(caretStyleEl);
    }

    // 3. Set source snapshot body attributes
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

    const headerInner = document.querySelector("header .header-builder-inner");
    let topInfoBar = document.getElementById("mm-navbar-info-bar") as HTMLDivElement | null;
    if (headerInner && !topInfoBar) {
      topInfoBar = document.createElement("div");
      topInfoBar.id = "mm-navbar-info-bar";
      topInfoBar.innerHTML = `
        <div class="mm-navbar-info-left">
          <span><i class="fas fa-map-marker-alt"></i>30 Road Fratton, Australia</span>
          <span><i class="fas fa-envelope"></i>contact@example.com</span>
        </div>
        <div class="mm-navbar-info-right">
          <a href="#" aria-label="Search"><i class="fas fa-search"></i></a>
          <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
        </div>
      `;
      headerInner.appendChild(topInfoBar);
    }

    const headerLogo = document.querySelector("header .gsc-logo img") as HTMLImageElement | null;
    if (headerLogo) {
      headerLogo.src = "/logo.svg";
      headerLogo.alt = "Travivu";
    }

    const actionArea = document.querySelector("header .elementor-element-6132e4e");
    let phoneBlock = document.getElementById("mm-navbar-phone") as HTMLDivElement | null;
    if (actionArea && !phoneBlock) {
      phoneBlock = document.createElement("div");
      phoneBlock.id = "mm-navbar-phone";
      phoneBlock.innerHTML = `
        <span class="mm-phone-icon"><i class="fas fa-phone-volume"></i></span>
        <span class="mm-phone-text"><small>Call Anytime</small><strong>(69)-868 168</strong></span>
      `;
      actionArea.appendChild(phoneBlock);
    }

    return () => {
      // Cleanup: remove dynamic stylesheet links
      addedLinks.forEach((link) => {
        link.parentNode?.removeChild(link);
      });

      document.getElementById("mm-navbar-info-bar")?.remove();
      document.getElementById("mm-navbar-phone")?.remove();

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
