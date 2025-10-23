// #region PLP JavaScript Functions

// #region Sidebar Dropdown Functionality
function toggleDropdown(sectionId) {
  const content = document.getElementById(
    sectionId === "price-section"
      ? "price-content"
      : sectionId === "brands-section"
      ? "brands-content"
      : "needs-content"
  );
  const arrow = document.getElementById(
    sectionId === "price-section"
      ? "price-arrow"
      : sectionId === "brands-section"
      ? "brands-arrow"
      : "needs-arrow"
  );

  // Toggle content visibility
  if (content.style.maxHeight && content.style.maxHeight !== "0px") {
    // Close
    content.style.maxHeight = "0px";
    content.style.paddingTop = "0px";
    content.style.paddingBottom = "0px";
    arrow.style.transform = "rotate(180deg)";
  } else {
    // Open
    content.style.maxHeight = content.scrollHeight + "px";
    content.style.paddingTop = "";
    content.style.paddingBottom = "";
    arrow.style.transform = "rotate(0deg)";
  }

  // Update sidebar height smoothly during animation
  updateSidebarHeight();
}

// Function to calculate and set sidebar height based on visible content
function updateSidebarHeight() {
  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      // Calculate total height of all visible content
      let totalHeight = 0;

      // Add padding (24px top + 24px bottom)
      totalHeight += 48;

      // Add gaps between sections (32px each, 2 gaps)
      totalHeight += 64;

      // Calculate height of each section
      const sections = ["price-section", "brands-section", "needs-section"];
      sections.forEach((sectionId) => {
        const contentId =
          sectionId === "price-section"
            ? "price-content"
            : sectionId === "brands-section"
            ? "brands-content"
            : "needs-content";
        const content = document.getElementById(contentId);
        const header = content?.parentElement?.querySelector(
          ".flex.justify-between"
        );

        if (header) {
          totalHeight += header.offsetHeight;
        }

        if (content && content.style.maxHeight !== "0px") {
          // Use scrollHeight for accurate measurement
          totalHeight += content.scrollHeight;
        }

        // Add border bottom for price section
        if (sectionId === "price-section") {
          totalHeight += 24; // pb-[24px]
        }
      });

      // Set sidebar height with smooth transition (max 740px)
      const finalHeight = Math.min(totalHeight, 740);
      sidebar.style.height = finalHeight + "px";
    });
  }
}
// #endregion Sidebar Dropdown Functionality

// #region Price Range Slider Functionality
function initializePriceRangeSlider() {
  const minRange = document.getElementById("minRange");
  const maxRange = document.getElementById("maxRange");
  const minDisplay = document.getElementById("minDisplay");
  const maxDisplay = document.getElementById("maxDisplay");

  if (!minRange || !maxRange || !minDisplay || !maxDisplay) {
    return; // Exit if elements don't exist
  }

  // Format price with commas
  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // Initialize displays
  minDisplay.textContent = formatPrice(minRange.value);
  maxDisplay.textContent = formatPrice(maxRange.value);

  // Min range event handler
  minRange.addEventListener("input", function () {
    let minVal = parseInt(this.value);
    let maxVal = parseInt(maxRange.value);

    // Ensure min doesn't exceed max
    if (minVal >= maxVal) {
      minVal = maxVal - 1000000;
      this.value = minVal;
    }

    minDisplay.textContent = formatPrice(minVal);
  });

  // Max range event handler
  maxRange.addEventListener("input", function () {
    let maxVal = parseInt(this.value);
    let minVal = parseInt(minRange.value);

    // Ensure max doesn't go below min
    if (maxVal <= minVal) {
      maxVal = minVal + 1000000;
      this.value = maxVal;
    }

    maxDisplay.textContent = formatPrice(maxVal);
  });
}
// #endregion Price Range Slider Functionality

// #region DOM Initialization
document.addEventListener("DOMContentLoaded", function () {
  // Initialize sidebar dropdowns
  const sections = ["price-content", "brands-content", "needs-content"];
  sections.forEach((sectionId) => {
    const content = document.getElementById(sectionId);
    if (content) {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });

  // Set initial sidebar height
  setTimeout(() => {
    updateSidebarHeight();
  }, 100);

  // Initialize price range slider
  initializePriceRangeSlider();
});
// #endregion DOM Initialization

// #endregion PLP JavaScript Functions
