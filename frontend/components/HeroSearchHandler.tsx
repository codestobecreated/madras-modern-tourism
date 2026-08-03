'use client';

import { useEffect } from "react";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
const API_URL = `${BACKEND_BASE}/api/hero-filters/`;

export default function HeroSearchHandler() {
  useEffect(() => {
    // Force parent containers overflow: visible so popups don't get clipped
    function fixParentOverflow() {
      const searchWidget = document.querySelector(".wpte-trip-sfilter-wrapper");
      if (!searchWidget) return;

      let parent: HTMLElement | null = searchWidget as HTMLElement;
      while (parent && parent !== document.body) {
        parent.style.setProperty("overflow", "visible", "important");
        parent.style.setProperty("clip-path", "none", "important");
        parent = parent.parentElement;
      }
    }

    // 1. Fetch Locations & Trip Types from Backend API
    async function fetchHeroFilters() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) return;
        const data = await res.json();

        if (data.status === "success") {
          if (data.locations && data.locations.length > 0) {
            updateLocationsDropdown(data.locations);
          }
          if (data.trip_types && data.trip_types.length > 0) {
            updateTripTypesDropdown(data.trip_types);
          }
        }
      } catch (err) {
        console.log("Django backend API fetch notice:", err);
      }
    }

    function updateLocationsDropdown(locations: any[]) {
      const field = document.querySelector(".wpte-trip__adv-field input[name='destination']")?.closest(".wpte-trip__adv-field");
      if (!field) return;

      let optDiv = field.querySelector(".wpte__select-options") as HTMLElement | null;
      if (!optDiv) {
        optDiv = document.createElement("div");
        optDiv.className = "wpte__select-options";
        field.appendChild(optDiv);
      }

      let container = optDiv.querySelector("ul");
      if (!container) {
        container = document.createElement("ul");
        optDiv.appendChild(container);
      }

      let html = "";
      locations.forEach((loc: any) => {
        const hasChildren = loc.children && loc.children.length > 0;
        html += `<li data-value="${loc.slug}" data-label="${loc.name}"><span>${loc.name}</span>`;
        if (hasChildren) {
          html += `<ul>`;
          loc.children.forEach((child: any) => {
            html += `<li data-value="${child.slug}" data-label="${child.name}"><span>${child.name}</span></li>`;
          });
          html += `</ul>`;
        }
        html += `</li>`;
      });
      container.innerHTML = html;
    }

    function updateTripTypesDropdown(tripTypes: any[]) {
      const field = document.querySelector(".wpte-trip__adv-field input[name='trip_types']")?.closest(".wpte-trip__adv-field");
      if (!field) return;

      let optDiv = field.querySelector(".wpte__select-options") as HTMLElement | null;
      if (!optDiv) {
        optDiv = document.createElement("div");
        optDiv.className = "wpte__select-options";
        field.appendChild(optDiv);
      }

      let container = optDiv.querySelector("ul");
      if (!container) {
        container = document.createElement("ul");
        optDiv.appendChild(container);
      }

      let html = "";
      tripTypes.forEach((tt: any) => {
        html += `<li data-value="${tt.slug}" data-label="${tt.name}"><span>${tt.name}</span></li>`;
      });
      container.innerHTML = html;
    }

    function showPopup(field: HTMLElement) {
      field.classList.add("active");
      const optDiv = field.querySelector(".wpte__select-options") as HTMLElement | null;
      if (optDiv) {
        optDiv.style.setProperty("display", "block", "important");
        optDiv.style.setProperty("opacity", "1", "important");
        optDiv.style.setProperty("visibility", "visible", "important");
        optDiv.style.setProperty("pointer-events", "auto", "important");
      }
    }

    function hidePopup(field: HTMLElement) {
      field.classList.remove("active");
      const optDiv = field.querySelector(".wpte__select-options") as HTMLElement | null;
      if (optDiv) {
        optDiv.style.setProperty("display", "none", "important");
        optDiv.style.setProperty("opacity", "0", "important");
        optDiv.style.setProperty("visibility", "hidden", "important");
        optDiv.style.setProperty("pointer-events", "none", "important");
      }
    }

    function hideAllPopups() {
      const allFields = document.querySelectorAll(".wpte-trip__adv-field");
      allFields.forEach((f) => hidePopup(f as HTMLElement));
    }

    // Global Document Event Delegation for CLICK ONLY (No Hover Trigger)
    function handleGlobalClick(e: MouseEvent) {
      const target = e.target as HTMLElement;

      // Option item clicked (<li> or <span>)
      const liItem = target.closest(".wpte__select-options li");
      if (liItem) {
        e.preventDefault();
        e.stopPropagation();

        const field = liItem.closest(".wpte-trip__adv-field") as HTMLElement | null;
        const label = liItem.getAttribute("data-label") || (liItem.querySelector("span")?.textContent?.trim() ?? "");
        const val = liItem.getAttribute("data-value") || "";

        if (field) {
          const input = field.querySelector(".wpte__input") as HTMLInputElement | null;
          const hiddenInput = field.querySelector(".wpte__input-value") as HTMLInputElement | null;

          if (input && label) {
            input.placeholder = label;
            input.value = label;
          }
          if (hiddenInput) {
            hiddenInput.value = val;
          }

          hidePopup(field);
        }
        return;
      }

      // Field clicked -> Click to toggle open/close
      const clickedField = target.closest(".wpte-trip__adv-field") as HTMLElement | null;
      if (clickedField) {
        if (target.closest(".ui-slider") || target.closest(".wpte-slider-values")) {
          return;
        }

        const wasActive = clickedField.classList.contains("active");
        hideAllPopups();
        if (!wasActive) {
          showPopup(clickedField);
        }
      } else {
        // Clicked outside search bar -> close all popups
        hideAllPopups();
      }
    }

    document.addEventListener("click", handleGlobalClick);

    // Run setup & fetch
    fixParentOverflow();
    fetchHeroFilters();

    // Re-check periodically for dynamic HTML
    const intervalId = setInterval(() => {
      fixParentOverflow();
    }, 1000);

    return () => {
      document.removeEventListener("click", handleGlobalClick);
      clearInterval(intervalId);
    };
  }, []);

  return null;
}
