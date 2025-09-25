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
