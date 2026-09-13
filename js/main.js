// ============================================================
// PURBACHAL ROYAL CITY | Main Scripts
// ============================================================

// ===== PRELOADER =====
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 1200);
  }
});

// ===== FAQ ACCORDION =====
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-up, .fade-in").forEach((el) => {
  observer.observe(el);
});

// ===== STICKY NAVBAR =====
const navbar = document.getElementById("navbar");
if (navbar) {
  const navHeight = navbar.offsetHeight;
  window.addEventListener("scroll", () => {
    if (window.scrollY > navHeight) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const mobileClose = document.getElementById("mobile-close");

function openMobileMenu() {
  hamburger.classList.add("active");
  mobileMenu.classList.add("open");
  document.body.style.overflow = "hidden";
  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  hamburger.classList.remove("active");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
  document.body.classList.remove("menu-open");
}

if (hamburger) {
  hamburger.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
}

if (mobileClose) {
  mobileClose.addEventListener("click", closeMobileMenu);
}

if (mobileMenu) {
  mobileMenu
    .querySelector(".mobile-menu-overlay")
    .addEventListener("click", closeMobileMenu);
}

document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

// ===== BENEFIT CARDS HOVER =====
document.querySelectorAll(".benefit-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    document.querySelectorAll(".benefit-card").forEach((c) => {
      c.classList.remove("bg-gold");
      c.classList.remove("text-white");
      c.classList.add("bg-white");
      c.classList.remove("border-gold");
      c.classList.add("border-[#E5E5E5]");
    });
    card.classList.add("bg-gold");
    card.classList.remove("bg-white");
    card.classList.add("border-gold");
    card.classList.remove("border-[#E5E5E5]");
  });
});

// ===== MASTER PLAN EXPLORER (Tabs) =====
// (function () {
//   const root = document.getElementById("master-plan-explorer");
//   if (!root) return;

//   const tabsWrap = root.querySelector("#mp-tabs");
//   const tabs = Array.from(root.querySelectorAll("[data-mp-tab]"));
//   const panels = Array.from(root.querySelectorAll("[data-mp-panel]"));

//   if (!tabs.length || !panels.length) return;

//   const activeTabClasses = [
//     "bg-[#FFF7E7]",
//     "text-[#111827]",
//     "border-[#F1E7C5]",
//     "shadow-sm",
//   ];
//   const inactiveTabClasses = ["bg-white", "text-gray-500", "border-[#EEE]"];

//   const activeIconClasses = [
//     "bg-black",
//     "text-[#C9A84C]",
//     "border-transparent",
//   ];
//   const inactiveIconClasses = ["bg-white", "text-[#111827]", "border-[#EEE]"];

//   function setActive(id, { scrollIntoView = false } = {}) {
//     tabs.forEach((btn) => {
//       const isActive = btn.dataset.mpTab === id;

//       // tab base classes
//       btn.classList.remove(...activeTabClasses, ...inactiveTabClasses);
//       btn.classList.add(...(isActive ? activeTabClasses : inactiveTabClasses));
//       btn.setAttribute("aria-selected", isActive ? "true" : "false");

//       // icon box
//       const icon = btn.querySelector("[data-mp-icon]");
//       if (icon) {
//         icon.classList.remove(...activeIconClasses, ...inactiveIconClasses);
//         icon.classList.add(
//           ...(isActive ? activeIconClasses : inactiveIconClasses),
//         );
//         if (!isActive) icon.classList.add("border"); // keep border for inactive
//       }

//       // slight hover style only for inactive
//       if (!isActive) btn.classList.add("hover:bg-gray-50", "transition");
//       else btn.classList.remove("hover:bg-gray-50");

//       if (isActive && scrollIntoView && tabsWrap) {
//         btn.scrollIntoView({
//           behavior: "smooth",
//           inline: "center",
//           block: "nearest",
//         });
//       }
//     });

//     panels.forEach((panel) => {
//       panel.classList.toggle("hidden", panel.dataset.mpPanel !== id);
//     });
//   }

//   // Click (event delegation)
//   root.addEventListener("click", (e) => {
//     const btn = e.target.closest("[data-mp-tab]");
//     if (!btn || !root.contains(btn)) return;
//     setActive(btn.dataset.mpTab, { scrollIntoView: true });
//   });

//   // Initial active tab (first one or aria-selected=true)
//   const initial =
//     tabs.find((t) => t.getAttribute("aria-selected") === "true")?.dataset
//       .mpTab || tabs[0].dataset.mpTab;

//   setActive(initial);
// })();


// ===== MASTER PLAN EXPLORER (Tabs + Panels) | Raw JS =====
(function () {
  const section = document.getElementById("master-plan-explorer");
  if (!section) return;

  const tabsWrap = section.querySelector("#mp-tabs");
  const tabs = Array.from(section.querySelectorAll("[data-mp-tab]"));
  const panels = Array.from(section.querySelectorAll("[data-mp-panel]"));

  if (!tabs.length || !panels.length) return;

  // Tailwind classes (keep them as strings so Tailwind can detect via JS scan)
  const ACTIVE_TEXT = "text-black";
  const INACTIVE_TEXT = "text-[#A9A9A9]";

  const ACTIVE_ICON_BG = "bg-black";
  const INACTIVE_ICON_BG = "bg-[#eae7de]";
  const INACTIVE_ICON_HOVER_BG = "hover:bg-[#fff9e7]";

  const ACTIVE_SVG_COLOR = "#FFC20E";

  const SHAPES_SELECTOR =
    "path, rect, circle, ellipse, polygon, polyline, line";

  function setSvgActiveColor(svg, color) {
    if (!svg) return;

    svg.querySelectorAll(SHAPES_SELECTOR).forEach((el) => {
      // Fill
      if (el.hasAttribute("fill")) {
        const fill = el.getAttribute("fill");
        if (!el.hasAttribute("data-mp-orig-fill")) {
          el.setAttribute("data-mp-orig-fill", fill ?? "");
        }
        if (fill && fill.toLowerCase() !== "none") {
          el.setAttribute("fill", color);
        }
      }

      // Stroke
      if (el.hasAttribute("stroke")) {
        const stroke = el.getAttribute("stroke");
        if (!el.hasAttribute("data-mp-orig-stroke")) {
          el.setAttribute("data-mp-orig-stroke", stroke ?? "");
        }
        if (stroke && stroke.toLowerCase() !== "none") {
          el.setAttribute("stroke", color);
        }
      }
    });
  }

  function restoreSvgColor(svg) {
    if (!svg) return;

    svg.querySelectorAll(SHAPES_SELECTOR).forEach((el) => {
      if (el.hasAttribute("data-mp-orig-fill")) {
        const origFill = el.getAttribute("data-mp-orig-fill");
        // restore exactly (even empty string)
        if (origFill === "") el.removeAttribute("fill");
        else el.setAttribute("fill", origFill);
        el.removeAttribute("data-mp-orig-fill");
      }

      if (el.hasAttribute("data-mp-orig-stroke")) {
        const origStroke = el.getAttribute("data-mp-orig-stroke");
        if (origStroke === "") el.removeAttribute("stroke");
        else el.setAttribute("stroke", origStroke);
        el.removeAttribute("data-mp-orig-stroke");
      }
    });
  }

  function setActive(tabId, { scrollIntoView = true } = {}) {
    // Update tabs UI
    tabs.forEach((btn) => {
      const isActive = btn.dataset.mpTab === tabId;
      btn.setAttribute("aria-selected", isActive ? "true" : "false");

      // Text color toggle
      btn.classList.toggle(ACTIVE_TEXT, isActive);
      btn.classList.toggle(INACTIVE_TEXT, !isActive);

      // Icon wrapper bg toggle (span[data-mp-icon])
      const iconWrap = btn.querySelector("[data-mp-icon]");
      if (iconWrap) {
        if (isActive) {
          iconWrap.classList.add(ACTIVE_ICON_BG);
          iconWrap.classList.remove(INACTIVE_ICON_BG, INACTIVE_ICON_HOVER_BG);
        } else {
          iconWrap.classList.remove(ACTIVE_ICON_BG);
          iconWrap.classList.add(INACTIVE_ICON_BG, INACTIVE_ICON_HOVER_BG);
        }
      }

      // SVG color toggle (fill/stroke)
      const svg = btn.querySelector("svg");
      if (svg) {
        if (isActive) setSvgActiveColor(svg, ACTIVE_SVG_COLOR);
        else restoreSvgColor(svg);
      }

      // Mobile horizontal scroll: active tab center
      if (
        isActive &&
        scrollIntoView &&
        tabsWrap &&
        tabsWrap.scrollWidth > tabsWrap.clientWidth
      ) {
        btn.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    });

    // Show correct panel
    panels.forEach((panel) => {
      panel.classList.toggle("hidden", panel.dataset.mpPanel !== tabId);
    });
  }

  // Click handler (event delegation)
  section.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-mp-tab]");
    if (!btn || !section.contains(btn)) return;
    setActive(btn.dataset.mpTab, { scrollIntoView: true });
  });

  // Init: aria-selected="true" (Residential) else first tab
  const initial =
    tabs.find((t) => t.getAttribute("aria-selected") === "true")?.dataset
      .mpTab || tabs[0].dataset.mpTab;

  setActive(initial, { scrollIntoView: false });
})();
