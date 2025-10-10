// #region Marquee Animation
// JS-driven ticker: move left→right; when first item exits on the left, append to end
(function () {
  var marquee = document.querySelector(".marquee");
  if (!marquee) return;
  var track = marquee.querySelector(".marquee__track");
  if (!track || track.dataset.marqueeInit === "true") return;

  // Ensure enough content for wide screens by duplicating the set
  var originals = Array.from(track.children).map(function (n) {
    return n.cloneNode(true);
  });
  while (track.scrollWidth < marquee.clientWidth * 2) {
    originals.forEach(function (n) {
      track.appendChild(n.cloneNode(true));
    });
  }

  var offset = 0;
  var last = performance.now();
  var speed = 60; // pixels per second (positive → move to the right)
  var paused = false;

  function getGapPx() {
    var cs = getComputedStyle(track);
    var g = parseFloat(cs.gap || cs.columnGap || "0");
    return isNaN(g) ? 0 : g;
  }

  function loop(now) {
    var dt = (now - last) / 1000;
    if (!paused) {
      offset += speed * dt;

      // recycle first child to the end when it fully exits on the left
      var first = track.firstElementChild;
      if (first) {
        var shift = first.offsetWidth + getGapPx();
        while (offset >= shift && first) {
          offset -= shift;
          track.appendChild(first);
          first = track.firstElementChild;
          shift = first ? first.offsetWidth + getGapPx() : 0;
        }
      }
      track.style.transform = "translateX(" + offset + "px)";
    }
    last = now;
    requestAnimationFrame(loop);
  }

  marquee.addEventListener("mouseenter", function () {
    paused = true;
  });
  marquee.addEventListener("mouseleave", function () {
    paused = false;
  });

  track.dataset.marqueeInit = "true";
  requestAnimationFrame(loop);
})();
// #endregion Marquee Animation
// #region Mobile Menu Functionality
// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    // Add smooth transition classes to menu
    mobileMenu.style.transition = "all 0.3s ease-in-out";
    mobileMenu.style.transformOrigin = "top";

    let isMenuOpen = false;

    mobileMenuBtn.addEventListener("click", function (e) {
      e.stopPropagation();

      // Add smooth rotation to hamburger button
      mobileMenuBtn.style.transition = "transform 0.3s ease-in-out";

      if (isMenuOpen) {
        // Close menu with smooth animation
        mobileMenu.style.transform = "scaleY(0)";
        mobileMenu.style.opacity = "0";
        mobileMenuBtn.style.transform = "rotate(0deg)";
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
        isMenuOpen = false;
      } else {
        // Open menu with smooth animation
        mobileMenu.classList.remove("hidden");
        mobileMenu.style.transform = "scaleY(0)";
        mobileMenu.style.opacity = "0";
        mobileMenuBtn.style.transform = "rotate(90deg)";

        // Force reflow
        mobileMenu.offsetHeight;

        mobileMenu.style.transform = "scaleY(1)";
        mobileMenu.style.opacity = "1";
        isMenuOpen = true;
      }
    });

    // Close menu when clicking outside with smooth animation
    document.addEventListener("click", function (event) {
      if (
        isMenuOpen &&
        !mobileMenuBtn.contains(event.target) &&
        !mobileMenu.contains(event.target)
      ) {
        mobileMenu.style.transform = "scaleY(0)";
        mobileMenu.style.opacity = "0";
        mobileMenuBtn.style.transform = "rotate(0deg)";
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
        isMenuOpen = false;
      }
    });

    // Close menu when clicking on menu items
    const menuLinks = mobileMenu.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.style.transform = "scaleY(0)";
        mobileMenu.style.opacity = "0";
        mobileMenuBtn.style.transform = "rotate(0deg)";
        setTimeout(() => {
          mobileMenu.classList.add("hidden");
        }, 300);
        isMenuOpen = false;
      });
    });
  }
});
// #endregion Mobile Menu Functionality
