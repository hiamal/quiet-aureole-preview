(function () {
  "use strict";

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in", "is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in", "is-visible"));
  }

  const slot = document.getElementById("film-slot");
  const placeholder = document.getElementById("film-placeholder");
  if (!slot || !placeholder) return;

  const poster = slot.getAttribute("data-poster") || "assets/screens/01-dashboard.png";
  const candidates = ["assets/brag.mp4", "brag.mp4"];

  function mount(src) {
    if (slot.querySelector("video")) return true;
    const video = document.createElement("video");
    video.src = src;
    video.poster = poster;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", "AI Business Suite launch film");
    video.style.width = "100%";
    video.style.height = "100%";
    video.style.objectFit = "cover";
    placeholder.replaceWith(video);
    return true;
  }

  function probe(url) {
    return fetch(url, { method: "HEAD", cache: "no-store" }).then((r) => {
      if (!r.ok) throw new Error("missing");
      return url;
    });
  }

  function tryEmbed() {
    if (slot.querySelector("video")) return Promise.resolve(true);
    let chain = Promise.reject();
    candidates.forEach((c) => {
      chain = chain.catch(() => probe(c));
    });
    return chain.then(mount).catch(() => false);
  }

  tryEmbed();
  let n = 0;
  const id = setInterval(() => {
    n += 1;
    if (n > 60 || slot.querySelector("video")) {
      clearInterval(id);
      return;
    }
    tryEmbed();
  }, 5000);
})();
