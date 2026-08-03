'use client';

import { useEffect } from "react";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
const LOCATIONS_API = `${BACKEND_BASE}/api/locations/`;
const SECTION_SELECTOR = ".dest-list-section";
const CAROUSEL_SELECTOR = `${SECTION_SELECTOR} .gsc-listings-banner-group .swiper`;

type Location = {
  id: number;
  name: string;
  slug: string;
  subtitle: string;
  listings_count: number;
  image_url: string;
  card_style: string;
};

export default function DestinationCarouselHandler() {
  useEffect(() => {
    const SLIDE_INTERVAL = 3500;
    let slideIndex = 0;
    let uniqueCount = 0;
    let autoSlideTimer: ReturnType<typeof setInterval> | null = null;
    let isTransitioning = false;
    let resizeObserver: ResizeObserver | null = null;
    let onWindowResize: (() => void) | null = null;
    let dotsEl: HTMLElement | null = null;

    function getSlideMetrics() {
      const section = document.querySelector(SECTION_SELECTOR) as HTMLElement | null;
      const slide = document.querySelector(
        `${SECTION_SELECTOR} .gsc-listings-banner-group .swiper-slide, ${SECTION_SELECTOR} .dest-slide`
      ) as HTMLElement | null;

      if (section) {
        const styles = getComputedStyle(section);
        const cardWidth = parseFloat(styles.getPropertyValue("--dest-card-width")) || 220;
        const gap = parseFloat(styles.getPropertyValue("--dest-card-gap")) || 24;
        if (slide?.offsetWidth) {
          return { cardWidth: slide.offsetWidth, gap, slideWidth: slide.offsetWidth + gap };
        }
        return { cardWidth, gap, slideWidth: cardWidth + gap };
      }

      if (slide) {
        const width = slide.offsetWidth;
        const gap = parseFloat(getComputedStyle(slide).marginRight) || 24;
        return { cardWidth: width, gap, slideWidth: width + gap };
      }

      return { cardWidth: 220, gap: 24, slideWidth: 244 };
    }

    function clearInlineSlideWidths(root: ParentNode) {
      root.querySelectorAll<HTMLElement>(".swiper-slide, .dest-slide").forEach((slide) => {
        slide.style.removeProperty("width");
        slide.style.removeProperty("margin-right");
      });
    }

    function buildDots(container: HTMLElement, count: number, onSelect: (idx: number) => void) {
      dotsEl?.remove();
      if (count <= 1) return;

      dotsEl = document.createElement("div");
      dotsEl.className = "dest-carousel-dots";
      dotsEl.setAttribute("role", "tablist");
      dotsEl.setAttribute("aria-label", "Destination carousel pagination");

      for (let i = 0; i < count; i++) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("aria-label", `Go to destination ${i + 1}`);
        btn.addEventListener("click", () => onSelect(i));
        dotsEl.appendChild(btn);
      }

      container.appendChild(dotsEl);
    }

    function updateDots(activeIdx: number) {
      if (!dotsEl || uniqueCount <= 1) return;
      const normalized = ((activeIdx % uniqueCount) + uniqueCount) % uniqueCount;
      dotsEl.querySelectorAll("button").forEach((btn, i) => {
        btn.classList.toggle("is-active", i === normalized);
        btn.setAttribute("aria-selected", i === normalized ? "true" : "false");
      });
    }

    async function fetchAndRenderDestinations() {
      try {
        const res = await fetch(LOCATIONS_API);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.status === "success" && Array.isArray(data.locations) && data.locations.length > 0) {
          renderCards(data.locations);
        } else {
          prepareStaticSlides();
          startAutoSlide();
        }
      } catch (err) {
        console.warn("[DestinationCarousel] Could not fetch locations:", err);
        prepareStaticSlides();
        startAutoSlide();
      }
    }

    function renderCards(locations: Location[]) {
      const swiperWrapper = document.querySelector(
        `${SECTION_SELECTOR} .gsc-listings-banner-group .swiper-wrapper`
      ) as HTMLElement | null;

      if (!swiperWrapper) {
        prepareStaticSlides();
        startAutoSlide();
        return;
      }

      uniqueCount = locations.length;
      const tripled = [...locations, ...locations, ...locations];

      const flagMap: Record<string, string> = {
        maldives: "🇲🇻",
        italy: "🇮🇹",
        rome: "🇮🇹",
        france: "🇫🇷",
        sydney: "🇦🇺",
        australia: "🇦🇺",
        thailand: "🇹🇭",
        japan: "🇯🇵",
        dubai: "🇦🇪",
        uk: "🇬🇧",
        usa: "🇺🇸",
      };

      const ratingMap: Record<string, { score: string; reviews: number }> = {
        maldives: { score: "4.8", reviews: 236 },
        rome: { score: "4.7", reviews: 189 },
        italy: { score: "4.7", reviews: 189 },
        france: { score: "4.9", reviews: 312 },
        sydney: { score: "4.9", reviews: 312 },
      };

      const countryMap: Record<string, string> = {
        maldives: "Indian Ocean",
        rome: "Italy",
        italy: "Europe",
        france: "Europe",
        sydney: "Australia",
      };

      const html = tripled.map((loc, idx) => {
        const fallbackImg = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80";
        const imgSrc = loc.image_url || fallbackImg;
        const subtitle = (loc.subtitle || "TRAVEL TO").toUpperCase().replace(/_/g, " ");
        const realIdx = idx % locations.length;
        const slug = loc.slug.toLowerCase();

        const isBlue = loc.card_style === "blue" || slug === "maldives" || realIdx === 0;
        const cardClass = isBlue
          ? "banner-three__single banner-three__single--blue"
          : "banner-three__single";

        const flag = flagMap[slug] || "✈️";
        const rating = ratingMap[slug] || { score: "4.8", reviews: 150 + (realIdx * 37) % 120 };
        const country = countryMap[slug] || loc.name;

        return `
          <div class="swiper-slide dest-slide" data-swiper-slide-index="${realIdx}"
               role="group" aria-label="${realIdx + 1} / ${locations.length}">
            <div class="item">
              <div class="${cardClass}">
                <div class="banner-three__wrap">
                  <div class="banner-three__image">
                    <img decoding="async" src="${imgSrc}" alt="${loc.name}" loading="lazy" />
                    <div class="dest-card-flag-badge">${flag}</div>
                    <button type="button" class="dest-card-heart-btn" aria-label="Add ${loc.name} to Wishlist">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </button>
                    <svg class="dest-card-wave-svg" viewBox="0 0 500 80" preserveAspectRatio="none">
                      <path d="M0,30 C150,80 350,0 500,40 L500,80 L0,80 Z"></path>
                    </svg>
                  </div>
                  <div class="banner-three__content">
                    <div class="banner-three__content-wrap">
                      <div class="banner-three__sub-title">${subtitle}</div>
                      <h3 class="banner-three__title">
                        <a href="/destinations/${loc.slug}">${loc.name}</a>
                      </h3>
                      <div class="dest-card-meta">
                        <span class="dest-card-location">📍 ${country}</span>
                        <span class="dest-card-rating">⭐ ${rating.score} (${rating.reviews})</span>
                      </div>
                      <div class="dest-card-divider"></div>
                      <div class="dest-card-footer">
                        <span class="dest-card-listings-text">${loc.listings_count} Listings</span>
                        <a href="/destinations/${loc.slug}" class="dest-card-arrow-btn" aria-label="View ${loc.name}">➔</a>
                      </div>
                    </div>
                  </div>
                  <a class="banner-three__overlay" href="/destinations/${loc.slug}" aria-label="View ${loc.name}"></a>
                </div>
              </div>
            </div>
          </div>`;
      }).join("");

      swiperWrapper.innerHTML = html;
      swiperWrapper.style.cssText = "display:flex; transform:translate3d(0px,0px,0px); transition:none; padding:10px 0 4px 0;";
      clearInlineSlideWidths(swiperWrapper);

      startAutoSlide();
    }

    function prepareStaticSlides() {
      const swiperWrapper = document.querySelector(
        `${SECTION_SELECTOR} .gsc-listings-banner-group .swiper-wrapper`
      ) as HTMLElement | null;
      if (!swiperWrapper) return;

      const slides = Array.from(
        swiperWrapper.querySelectorAll<HTMLElement>(".swiper-slide:not(.swiper-slide-duplicate)")
      );

      slides.forEach((slide) => {
        const img = slide.querySelector("img[alt='France']");
        const card = slide.querySelector(".banner-three__single");
        if (img && card && !card.classList.contains("banner-three__single--blue")) {
          card.classList.add("banner-three__single--blue");
        }
      });

      const uniqueSlides = slides.filter((slide, index, arr) => {
        const idx = slide.getAttribute("data-swiper-slide-index");
        return idx === null || arr.findIndex((s) => s.getAttribute("data-swiper-slide-index") === idx) === index;
      });

      uniqueCount = uniqueSlides.length || slides.length;

      if (uniqueSlides.length > 0) {
        const tripled = [...uniqueSlides, ...uniqueSlides, ...uniqueSlides].map((slide) =>
          slide.cloneNode(true) as HTMLElement
        );
        swiperWrapper.innerHTML = "";
        tripled.forEach((slide, idx) => {
          slide.classList.remove(
            "swiper-slide-duplicate",
            "swiper-slide-duplicate-active",
            "swiper-slide-duplicate-next",
            "swiper-slide-duplicate-prev",
            "swiper-slide-active",
            "swiper-slide-next",
            "swiper-slide-prev",
            "item-active",
            "first",
            "center",
            "last"
          );
          slide.style.removeProperty("width");
          slide.style.removeProperty("margin-right");
          const realIdx = idx % uniqueCount;
          slide.setAttribute("data-swiper-slide-index", String(realIdx));
          swiperWrapper.appendChild(slide);
        });
      }

      clearInlineSlideWidths(swiperWrapper);
    }

    function startAutoSlide() {
      const swiperEl = document.querySelector(CAROUSEL_SELECTOR) as HTMLElement | null;
      const swiperWrapper = swiperEl?.querySelector(".swiper-wrapper") as HTMLElement | null;
      const bannerGroup = document.querySelector(
        `${SECTION_SELECTOR} .gsc-listings-banner-group`
      ) as HTMLElement | null;

      if (!swiperEl || !swiperWrapper) return;

      const slides = Array.from(
        swiperWrapper.querySelectorAll<HTMLElement>(".swiper-slide, .dest-slide")
      );
      const total = slides.length;
      if (total === 0) return;

      if (!uniqueCount) {
        prepareStaticSlides();
      }

      clearInlineSlideWidths(swiperWrapper);

      function setActiveClasses(idx: number) {
        slides.forEach((s) => {
          s.classList.remove(
            "item-active", "first", "center", "last",
            "swiper-slide-active", "swiper-slide-next", "swiper-slide-prev",
            "swiper-slide-duplicate-active", "swiper-slide-duplicate-next"
          );
        });

        const prev = (idx - 1 + total) % total;
        const next = (idx + 1) % total;

        slides[idx]?.classList.add("swiper-slide-active", "item-active", "center");
        slides[prev]?.classList.add("swiper-slide-prev", "item-active", "first");
        slides[next]?.classList.add("swiper-slide-next");
        updateDots(idx);
      }

      function goToSlide(index: number, animate = true) {
        if (isTransitioning || !swiperWrapper) return;
        isTransitioning = true;
        slideIndex = ((index % total) + total) % total;

        const { slideWidth } = getSlideMetrics();

        swiperWrapper.style.transition = animate
          ? "transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          : "none";
        swiperWrapper.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

        setActiveClasses(slideIndex);
        setTimeout(() => { isTransitioning = false; }, animate ? 700 : 0);
      }

      function resetPosition() {
        goToSlide(slideIndex, false);
      }

      function goToUniqueIndex(uniqueIdx: number) {
        const normalized = ((uniqueIdx % uniqueCount) + uniqueCount) % uniqueCount;
        const match = slides.findIndex(
          (slide) => slide.getAttribute("data-swiper-slide-index") === String(normalized)
        );
        goToSlide(match >= 0 ? match : normalized);
      }

      if (bannerGroup) {
        buildDots(bannerGroup, uniqueCount, goToUniqueIndex);

        if (!bannerGroup.querySelector(".dest-next-arrow-btn")) {
          const nextBtn = document.createElement("button");
          nextBtn.type = "button";
          nextBtn.className = "dest-next-arrow-btn";
          nextBtn.setAttribute("aria-label", "Next Destination");
          nextBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          `;
          nextBtn.addEventListener("click", () => {
            goToSlide(slideIndex + 1);
          });
          bannerGroup.appendChild(nextBtn);
        }
      }

      slideIndex = uniqueCount;
      goToSlide(uniqueCount, false);

      if (autoSlideTimer) clearInterval(autoSlideTimer);
      autoSlideTimer = setInterval(() => {
        goToSlide(slideIndex + 1);
      }, SLIDE_INTERVAL);

      swiperEl.addEventListener("mouseenter", () => {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
      });
      swiperEl.addEventListener("mouseleave", () => {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(() => { goToSlide(slideIndex + 1); }, SLIDE_INTERVAL);
      });

      let touchStartX = 0;
      swiperEl.addEventListener("touchstart", (e: TouchEvent) => {
        touchStartX = e.touches[0].clientX;
        if (autoSlideTimer) clearInterval(autoSlideTimer);
      }, { passive: true });

      swiperEl.addEventListener("touchend", (e: TouchEvent) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
          goToSlide(dx < 0 ? slideIndex + 1 : slideIndex - 1);
        }
        if (autoSlideTimer) clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(() => { goToSlide(slideIndex + 1); }, SLIDE_INTERVAL);
      });

      const section = document.querySelector(SECTION_SELECTOR) as HTMLElement | null;
      if (section && typeof ResizeObserver !== "undefined") {
        resizeObserver?.disconnect();
        resizeObserver = new ResizeObserver(() => resetPosition());
        resizeObserver.observe(section);
      } else {
        onWindowResize = resetPosition;
        window.addEventListener("resize", onWindowResize);
      }
    }

    const timer = setTimeout(() => { fetchAndRenderDestinations(); }, 500);

    return () => {
      clearTimeout(timer);
      if (autoSlideTimer) clearInterval(autoSlideTimer);
      resizeObserver?.disconnect();
      if (onWindowResize) window.removeEventListener("resize", onWindowResize);
      dotsEl?.remove();
    };
  }, []);

  return null;
}
