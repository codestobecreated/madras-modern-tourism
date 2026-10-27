'use client';

import { useEffect } from "react";

const SECTION_SELECTOR = ".dest-list-section";
const CAROUSEL_SELECTOR = `${SECTION_SELECTOR} .gsc-listings-banner-group .swiper`;

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

    const timer = setTimeout(() => {
      prepareStaticSlides();
      startAutoSlide();
    }, 500);

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
