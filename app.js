const framePresets = [
  {
    id: "shinchan",
    name: "Shinchan Mood",
    theme: "kawaii",
    desc: "playful doodle, comic fun",
    palette: ["#fff7df", "#ff9d6c", "#ffe9b3", "#fff3d8"],
    accent: "#f57f45",
    stamp: ["burst", "star", "dot"],
  },
  {
    id: "cat-club",
    name: "Kucing",
    theme: "kawaii",
    desc: "cat paw, milk tone, cute",
    palette: ["#fff8f3", "#c58f6a", "#f6ddcb", "#fff1e8"],
    accent: "#9a5d3b",
    stamp: ["heart", "dot", "spark"],
  },
  {
    id: "flower-note",
    name: "Bunga",
    theme: "kawaii",
    desc: "soft bloom, pastel petals",
    palette: ["#fff7fb", "#f48fb1", "#ffd8ea", "#ffeef6"],
    accent: "#d85f8c",
    stamp: ["petal", "spark", "heart"],
  },
  {
    id: "butterfly-air",
    name: "Kupu-kupu",
    theme: "anime",
    desc: "airy flutter, dreamy light",
    palette: ["#f8f7ff", "#9f8cff", "#ddd7ff", "#eef0ff"],
    accent: "#7967e8",
    stamp: ["spark", "petal", "star"],
  },
  {
    id: "about-you",
    name: "About You",
    theme: "retro",
    desc: "moody song lyric vibe",
    palette: ["#fff8f5", "#ad7f73", "#ead6d1", "#f7ece8"],
    accent: "#825d55",
    stamp: ["star", "spark", "ticket"],
  },
  {
    id: "kitty-pop",
    name: "Hello Kitty",
    theme: "kawaii",
    desc: "pink ribbon, sweet pop",
    palette: ["#fff6fa", "#ff7cab", "#ffd6e6", "#fff1f6"],
    accent: "#ff4f8d",
    stamp: ["heart", "spark", "cloud"],
  },
  {
    id: "barbie",
    name: "Barbie",
    theme: "kawaii",
    desc: "hot pink doll sticker vibe",
    palette: ["#fff4fb", "#ff5fa8", "#ffd2ea", "#fff0f8"],
    accent: "#ff3f93",
    stamp: ["heart", "spark", "star"],
  },
];

// update photobooth camera-----
const state = {
  selectedFrame: framePresets[0],
  shots: [],
  partnerImage: null,
  layout: "strip",
  filter: "none",
  stripColor: "classic-white",
  stripStyle: "korean",
  currentScreen: "landing",
  captureDelay: 0,
  isCountingDown: false,
  stream: null,
};

const aboutYouStickerAssets = {
  bunny: loadSticker("./assets/stickers/about you 1.png"),
  car: loadSticker("./assets/stickers/about you 2.png"),
  clapper: loadSticker("./assets/stickers/about you 3.png"),
  footer: loadSticker("./assets/stickers/about you 4.png"),
};

const barbieStickerAssets = {
  one: loadSticker("./assets/stickers/barbie 1.png"),
  two: loadSticker("./assets/stickers/barbie 2.png"),
  three: loadSticker("./assets/stickers/barbie 3.png"),
  four: loadSticker("./assets/stickers/barbie 4.png"),
  five: loadSticker("./assets/stickers/barbie 5.png"),
};

const stripBackgroundAssets = {
  kiss: loadSticker("./assets/latar/kiss.jpg"),
  kotakMerah: loadSticker("./assets/latar/latar kotak merah.jpg"),
  pelangi: loadSticker("./assets/latar/latar pelangi.png"),
  macanTutul: loadSticker("./assets/latar/macan tutul.jpg"),
  pelangiBintang: loadSticker("./assets/latar/pelangi bintang.jpg"),
  zebra: loadSticker("./assets/latar/zebra.jpg"),
};

const ABOUT_YOU_EXTRA_BOTTOM_PAD = 126;

const filterPresets = [
  { id: "none", name: "Original", css: "none" },
  { id: "soft", name: "Soft Glow", css: "brightness(1.22) saturate(0.92) contrast(0.9) blur(0.5px)" },
  { id: "warm", name: "Warm Pop", css: "sepia(0.35) saturate(1.4) hue-rotate(-12deg) brightness(1.08) contrast(1.02)" },
  { id: "cool", name: "B&W", css: "grayscale(1) contrast(1.12) brightness(1.04)" },
  { id: "mono", name: "Vintage", css: "sepia(0.42) saturate(0.88) contrast(0.94) brightness(1.06) hue-rotate(-8deg)" },
  { id: "dreamy", name: "Dreamy", css: "brightness(1.14) saturate(0.82) contrast(0.86) blur(0.8px)" },
];
const timerPresets = [0, 3, 5, 10];
const stripColorPresets = [
  { id: "deep-maroon", name: "Maroon", base: "#5a0019", edge: "rgba(255, 128, 166, 0.28)", inner: "rgba(255, 255, 255, 0.08)" },
  { id: "ink-black", name: "Ink", base: "#0b0405", edge: "rgba(255, 123, 160, 0.22)", inner: "rgba(255, 255, 255, 0.05)" },
  { id: "classic-white", name: "White", base: "#fffefe", edge: "rgba(40, 32, 32, 0.10)", inner: "rgba(0, 0, 0, 0.018)" },
  { id: "hot-pink", name: "Hot Pink", base: "#ff4d91", edge: "rgba(167, 11, 72, 0.28)", inner: "rgba(255, 255, 255, 0.18)" },
  { id: "bg-kiss", name: "Kiss", base: "#ffd7e6", edge: "rgba(152, 56, 92, 0.24)", inner: "rgba(255, 255, 255, 0.12)", image: stripBackgroundAssets.kiss, swatchImage: "./assets/latar/kiss.jpg" },
  { id: "bg-kotak-merah", name: "Kotak Merah", base: "#7b1632", edge: "rgba(255, 225, 232, 0.28)", inner: "rgba(255, 255, 255, 0.08)", image: stripBackgroundAssets.kotakMerah, swatchImage: "./assets/latar/latar kotak merah.jpg" },
  { id: "bg-pelangi", name: "Pelangi", base: "#ffd7ea", edge: "rgba(162, 76, 116, 0.24)", inner: "rgba(255, 255, 255, 0.14)", image: stripBackgroundAssets.pelangi, swatchImage: "./assets/latar/latar pelangi.png" },
  { id: "bg-pelangi-bintang", name: "Pelangi Star", base: "#ffe9f5", edge: "rgba(134, 95, 157, 0.24)", inner: "rgba(255, 255, 255, 0.12)", image: stripBackgroundAssets.pelangiBintang, swatchImage: "./assets/latar/pelangi bintang.jpg", pattern: true, decorate: "rainbow-stars" },
  { id: "bg-macan-tutul", name: "Macan", base: "#d8b07f", edge: "rgba(92, 52, 22, 0.24)", inner: "rgba(255, 255, 255, 0.1)", image: stripBackgroundAssets.macanTutul, swatchImage: "./assets/latar/macan tutul.jpg" },
  { id: "bg-zebra", name: "Zebra", base: "#efefef", edge: "rgba(40, 40, 40, 0.18)", inner: "rgba(255, 255, 255, 0.1)", image: stripBackgroundAssets.zebra, swatchImage: "./assets/latar/zebra.jpg" },
  { id: "blush-pink", name: "Blush", base: "#ffe6ef", edge: "rgba(214, 108, 151, 0.28)", inner: "rgba(255, 255, 255, 0.22)" },
  { id: "butter-yellow", name: "Butter", base: "#fff5c8", edge: "rgba(210, 170, 83, 0.26)", inner: "rgba(255, 255, 255, 0.18)" },
  { id: "mint-candy", name: "Mint", base: "#dcfff1", edge: "rgba(87, 183, 146, 0.28)", inner: "rgba(255, 255, 255, 0.18)" },
  { id: "sky-blue", name: "Sky", base: "#e1efff", edge: "rgba(104, 152, 223, 0.26)", inner: "rgba(255, 255, 255, 0.18)" },
  { id: "lavender", name: "Lavender", base: "#eee5ff", edge: "rgba(139, 116, 215, 0.26)", inner: "rgba(255, 255, 255, 0.18)" },
  { id: "peach-soda", name: "Peach", base: "#ffe9df", edge: "rgba(224, 139, 98, 0.26)", inner: "rgba(255, 255, 255, 0.18)" },
  { id: "strawberry", name: "Berry", base: "#ffd7df", edge: "rgba(217, 89, 132, 0.28)", inner: "rgba(255, 255, 255, 0.18)" },
];
//update photobooth ui
const stripPresets = [
  { id: "posebox", name: "Pose Box", desc: "1 pose . 4x6 portrait", shots: 1, stripW: 404, topPad: 18, bottomPad: 122, gap: 18, radius: 0, photoAspect: 1.18, targetStripAspect: 1.5, accent: "#3e5ed9", surface: "linear-gradient(180deg, #efe2c8 0%, #dcc29d 100%)", previewTone: "post" },
  { id: "korean", name: "Korean 4", desc: "4 pose . slim clean booth strip", shots: 4, stripW: 340, topPad: 64, bottomPad: 72, gap: 18, radius: 0, photoAspect: 9 / 16, targetStripAspect: 2.86, accent: "#ff6b9a", surface: "linear-gradient(180deg, #ffe0eb 0%, #ffc7d9 100%)", previewTone: "soft" },
  { id: "airy", name: "Airy 3", desc: "3 pose . frame lebih lega", shots: 3, stripW: 410, topPad: 88, bottomPad: 84, gap: 28, radius: 0, photoAspect: 9 / 16, targetStripAspect: 2.86, accent: "#ff9855", surface: "linear-gradient(180deg, #ffe7d6 0%, #ffd0b0 100%)", previewTone: "hero" },
  { id: "photostudio", name: "Photo Studio", desc: "4 pose . 2x2 grid 3:4", shots: 4, stripW: 404, topPad: 18, bottomPad: 92, gap: 12, columnGap: 12, radius: 0, photoAspect: 4 / 3, targetStripAspect: 1.24, accent: "#f08cab", surface: "linear-gradient(180deg, #ffd5e2 0%, #f3aac0 100%)", previewTone: "soft", variant: "split-columns", squareSlots: true },
  { id: "studio6", name: "Studio 6", desc: "6 pose . 4x6 grid", shots: 6, stripW: 404, topPad: 18, bottomPad: 122, gap: 10, columnGap: 10, radius: 0, photoAspect: 0.82, targetStripAspect: 1.5, accent: "#5b7fff", surface: "linear-gradient(180deg, #dde6ff 0%, #c4d4ff 100%)", previewTone: "sky", variant: "split-columns" },
  { id: "mini", name: "Mini 2", desc: "2 pose . frame besar", shots: 2, stripW: 330, topPad: 92, bottomPad: 122, gap: 30, radius: 0, photoAspect: 1.38, accent: "#6b5f72", surface: "linear-gradient(180deg, #e6dfe9 0%, #cfc3d4 100%)", previewTone: "dark" },
];

const camera = document.getElementById("camera");
const startCameraBtn = document.getElementById("startCameraBtn");
const captureBtn = document.getElementById("captureBtn");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");
const continueToFrameBtn = document.getElementById("continueToFrameBtn");
const partnerUpload = document.getElementById("partnerUpload");
const frameGrid = document.getElementById("frameGrid");
const filterGrid = document.getElementById("filterGrid");
const stripColorGrid = document.getElementById("stripColorGrid");
const stripGrid = document.getElementById("stripGrid");
const timerGrid = document.getElementById("timerGrid");
const shotTray = document.getElementById("shotTray");
const shotCounter = document.getElementById("shotCounter");
const statusText = document.getElementById("statusText");
const startEditingBtn = document.getElementById("startEditingBtn");
const continueToCameraBtn = document.getElementById("continueToCameraBtn");
const backToLandingBtn = document.getElementById("backToLandingBtn");
const backToLayoutBtn = document.getElementById("backToLayoutBtn");
const backToCameraBtn = document.getElementById("backToCameraBtn");
const timerLabel = document.getElementById("timerLabel");
const activeStripName = document.getElementById("activeStripName");
const frameActiveStripName = document.getElementById("frameActiveStripName");
const selectedStripTitle = document.getElementById("selectedStripTitle");
const selectedStripPreview = document.getElementById("selectedStripPreview");
const cameraStripTitle = document.getElementById("cameraStripTitle");
const cameraStripPreview = document.getElementById("cameraStripPreview");
const frameStripTitle = document.getElementById("frameStripTitle");
const frameStripPreview = document.getElementById("frameStripPreview");
const countdownOverlay = document.getElementById("countdownOverlay");
const previewEmptyState = document.getElementById("previewEmptyState");
const cameraPreviewMirror = document.getElementById("cameraPreviewMirror");
const statusTexts = Array.from(document.querySelectorAll(".status-text"));
const landingScreen = document.getElementById("landingScreen");
const layoutScreen = document.getElementById("layoutScreen");
const cameraScreen = document.getElementById("cameraScreen");
const frameScreen = document.getElementById("frameScreen");
const posterCanvas = document.getElementById("posterCanvas");
const ctx = posterCanvas.getContext("2d");

function init() {
  renderFrameOptions();
  renderFilterOptions();
  renderStripColorOptions();
  renderTimerOptions();
  renderStripOptions();
  bindEvents();
  syncShotState();
  renderShotTray();
  updateScreen();
  updateCameraAspect();
  applyCameraFilter();
  drawPoster();
}

function loadSticker(src) {
  const image = new Image();
  image.src = src;
  image.onload = () => {
    if (state.currentScreen === "camera" || state.currentScreen === "frame") {
      drawPoster();
    }
  };
  return image;
}

function bindEvents() {
  startCameraBtn.addEventListener("click", startCamera);
  captureBtn.addEventListener("click", captureShot);
  resetBtn.addEventListener("click", resetShots);
  downloadBtn.addEventListener("click", downloadPoster);
  partnerUpload?.addEventListener("change", handlePartnerUpload);
  startEditingBtn?.addEventListener("click", () => {
    state.currentScreen = "layout";
    updateScreen();
  });
  continueToCameraBtn?.addEventListener("click", () => {
    state.currentScreen = "camera";
    updateScreen();
    setStatusText(`Strip ${getActiveStripPreset().name} siap. Nyalakan kamera untuk mulai.`);
  });
  backToLandingBtn?.addEventListener("click", () => {
    state.currentScreen = "landing";
    updateScreen();
  });
  backToLayoutBtn?.addEventListener("click", () => {
    state.currentScreen = "layout";
    updateScreen();
  });
  continueToFrameBtn?.addEventListener("click", () => {
    state.currentScreen = "frame";
    updateScreen();
    setStatusText("Atur frame, warna, dan stiker sebelum download.");
  });
  backToCameraBtn?.addEventListener("click", () => {
    state.currentScreen = "camera";
    updateScreen();
    setStatusText("Lanjut ambil foto atau reset kalau mau ulang dari awal.");
  });
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    setStatusText("Browser ini tidak mendukung akses kamera.");
    return;
  }

  try {
    if (state.stream) {
      state.stream.getTracks().forEach((track) => track.stop());
    }

    state.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1080 }, height: { ideal: 1350 } },
      audio: false,
    });
    camera.srcObject = state.stream;
    if (cameraPreviewMirror) {
      cameraPreviewMirror.srcObject = state.stream;
    }
    camera.style.transform = "scaleX(-1)";
    applyCameraFilter();
    setStatusText("Kamera aktif. Ambil pose pertama kapan saja.");
  } catch (error) {
    setStatusText("Izin kamera ditolak atau kamera tidak tersedia.");
  }
}

async function captureShot() {
  if (state.isCountingDown) {
    return;
  }

  if (!camera.videoWidth || !camera.videoHeight) {
    setStatusText("Nyalakan kamera dulu sebelum ambil foto.");
    return;
  }

  const shotLimit = getShotLimit();
  if (state.shots.length >= shotLimit) {
    setStatusText(`Maksimal ${shotLimit} shot. Reset kalau mau ambil ulang.`);
    return;
  }

  if (state.captureDelay > 0) {
    state.isCountingDown = true;
    captureBtn.disabled = true;
    await runCountdown(state.captureDelay);
    state.isCountingDown = false;
    captureBtn.disabled = false;
  }

  const captureCanvas = document.createElement("canvas");
  const activeStrip = getActiveStripPreset();
  const { innerW, slotH } = getStripMetrics(activeStrip);
  const captureWidth = 900;
  const captureHeight = isWideStripPreset(activeStrip)
    ? Math.round(captureWidth * (9 / 16))
    : Math.round(captureWidth * (slotH / innerW));
  captureCanvas.width = captureWidth;
  captureCanvas.height = captureHeight;
  const captureCtx = captureCanvas.getContext("2d");
  captureCtx.filter = getActiveFilter();
  if (isWideStripPreset(activeStrip)) {
    drawVideoFrameCover(
      captureCtx,
      camera,
      0,
      0,
      captureCanvas.width,
      captureCanvas.height,
      { flipX: true }
    );
  } else {
    captureCtx.save();
    captureCtx.translate(captureCanvas.width, 0);
    captureCtx.scale(-1, 1);
    captureCtx.drawImage(camera, 0, 0, captureCanvas.width, captureCanvas.height);
    captureCtx.restore();
  }
  captureCtx.filter = "none";

  const src = captureCanvas.toDataURL("image/png");
  const image = new Image();
  image.src = src;
  state.shots.push({ src, image });
  renderShotTray();
  drawPoster();
  if (state.shots.length >= shotLimit) {
    state.currentScreen = "frame";
    updateScreen();
    setStatusText("Semua shot sudah terisi. Sekarang pilih frame, warna, dan stiker.");
    return;
  }
  setStatusText(`Shot ${state.shots.length} tersimpan.`);
}

function resetShots() {
  state.shots = [];
  renderShotTray();
  drawPoster();
  setStatusText("Semua shot di-reset.");
}

function handlePartnerUpload(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.onload = () => {
      state.partnerImage = image;
      drawPoster();
      setStatusText(`Partner image "${file.name}" sudah dipasang.`);
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function renderFrameOptions() {
  frameGrid.innerHTML = "";

  framePresets.forEach((frame) => {
    const button = document.createElement("button");
    button.className = `frame-option${frame.id === state.selectedFrame.id ? " active" : ""}`;
    button.innerHTML = `<strong>${frame.name}</strong><span>${frame.desc}</span>`;
    button.addEventListener("click", () => {
      state.selectedFrame = frame;
      renderFrameOptions();
      drawPoster();
      setStatusText(`Frame aktif: ${frame.name}.`);
    });
    frameGrid.appendChild(button);
  });
}

function renderFilterOptions() {
  filterGrid.innerHTML = "";

  filterPresets.forEach((filter) => {
    const button = document.createElement("button");
    button.className = `filter-btn${filter.id === state.filter ? " active" : ""}`;
    button.textContent = filter.name;
    button.addEventListener("click", () => {
      state.filter = filter.id;
      renderFilterOptions();
      applyCameraFilter();
      drawPoster();
      setStatusText(`Filter aktif: ${filter.name}.`);
    });
    filterGrid.appendChild(button);
  });
}

function renderStripColorOptions() {
  stripColorGrid.innerHTML = "";

  stripColorPresets.forEach((color) => {
    const button = document.createElement("button");
    button.className = `color-btn${color.id === state.stripColor ? " active" : ""}`;
    button.title = color.name;
    button.style.setProperty("--swatch", color.base);
    if (color.swatchImage) {
      button.style.backgroundImage = `url("${color.swatchImage}")`;
      button.style.backgroundSize = "cover";
      button.style.backgroundPosition = "center";
    } else {
      button.style.backgroundImage = "none";
    }
    button.addEventListener("click", () => {
      state.stripColor = color.id;
      renderStripColorOptions();
      drawPoster();
      setStatusText(`Warna strip aktif: ${color.name}.`);
    });
    stripColorGrid.appendChild(button);
  });
}

function renderTimerOptions() {
  timerGrid.innerHTML = "";
  timerLabel.textContent = `${state.captureDelay}s`;

  timerPresets.forEach((seconds) => {
    const button = document.createElement("button");
    button.className = `timer-btn${seconds === state.captureDelay ? " active" : ""}`;
    button.textContent = `${seconds}s`;
    button.addEventListener("click", () => {
      state.captureDelay = seconds;
      renderTimerOptions();
      setStatusText(seconds === 0 ? "Timer dimatikan." : `Timer aktif ${seconds} detik.`);
    });
    timerGrid.appendChild(button);
  });
}

function renderStripOptions() {
  stripGrid.innerHTML = "";

  stripPresets.forEach((strip) => {
    const button = document.createElement("button");
    button.className = `layout-card${strip.id === state.stripStyle ? " active" : ""}`;
    button.style.setProperty("--layout-card-accent", strip.accent || "#ff7ca7");
    button.style.setProperty("--layout-card-surface", strip.surface || "linear-gradient(180deg, #fffefe 0%, #fff4f7 100%)");
    button.innerHTML = `
      <div class="layout-card-preview">
        ${renderStripPreviewMarkup(strip)}
      </div>
      <h3>${strip.name}</h3>
      <p>${strip.desc}</p>
    `;
    button.addEventListener("click", () => {
      state.stripStyle = strip.id;
      syncShotState();
      renderStripOptions();
      renderShotTray();
      updateActiveStrip();
      updateCameraAspect();
      drawPoster();
      setStatusText(`Strip aktif: ${strip.name}.`);
    });
    stripGrid.appendChild(button);
  });
}

function renderStripPreviewMarkup(strip) {
  if (strip.variant === "double-copy") {
    const toneClass = strip.previewTone || "";
    const columnMarkup = Array.from({ length: strip.shots }, (_, index) => {
      const extraClass = index === 0 ? ` ${toneClass}` : "";
      return `<span class="layout-mini-slot${extraClass}"></span>`;
    }).join("");
    return `
      <div class="layout-mini-double">
        <div class="layout-mini-column">${columnMarkup}<span class="layout-mini-footer">pose box</span></div>
        <div class="layout-mini-column">${columnMarkup}<span class="layout-mini-footer">pose box</span></div>
      </div>
    `;
  }
  const toneClass = strip.previewTone || "";
  const slotClass = strip.squareSlots ? " square" : "";
  if (strip.variant === "split-columns") {
    const rows = Math.ceil(strip.shots / 2);
    const buildColumn = (startIndex) =>
      Array.from({ length: rows }, (_, offset) => {
        const index = startIndex + offset;
        const extraClass = index === 0 ? ` ${toneClass}` : "";
        return index < strip.shots ? `<span class="layout-mini-slot${extraClass}${slotClass}"></span>` : "";
      }).join("");
    return `
      <div class="layout-mini-double split-columns">
        <div class="layout-mini-column split-columns">${buildColumn(0)}</div>
        <div class="layout-mini-column split-columns">${buildColumn(rows)}</div>
      </div>
    `;
  }
  return Array.from({ length: strip.shots }, (_, index) => {
    const extraClass = index === 0 ? ` ${toneClass}` : "";
    return `<span class="layout-mini-slot${extraClass}${slotClass}"></span>`;
  }).join("");
}

function getActiveStripPreset() {
  return stripPresets.find((strip) => strip.id === state.stripStyle) || stripPresets[0];
}

function getActiveStripColor() {
  return stripColorPresets.find((color) => color.id === state.stripColor) || stripColorPresets[0];
}

function isWideStripPreset(stripPreset) {
  return stripPreset.shots >= 3;
}

function isSplitColumnStripPreset(stripPreset) {
  return stripPreset.variant === "split-columns";
}

function getShotLimit() {
  return getActiveStripPreset().shots;
}

function syncShotState() {
  const shotLimit = getShotLimit();
  if (state.shots.length > shotLimit) {
    state.shots = state.shots.slice(0, shotLimit);
  }
}

function renderShotTray() {
  shotTray.innerHTML = "";
  shotTray.classList.toggle("split-columns", isSplitColumnStripPreset(getActiveStripPreset()));
  const shotLimit = getShotLimit();
  shotCounter.textContent = `${state.shots.length} / ${shotLimit}`;

  for (let i = 0; i < shotLimit; i += 1) {
    const slot = document.createElement("div");
    slot.className = "shot-thumb";

    if (state.shots[i]) {
      const image = document.createElement("img");
      image.src = state.shots[i].src;
      image.alt = `Shot ${i + 1}`;
      slot.appendChild(image);
    }

    shotTray.appendChild(slot);
  }
}

function updateScreen() {
  landingScreen.classList.toggle("active-screen", state.currentScreen === "landing");
  layoutScreen.classList.toggle("active-screen", state.currentScreen === "layout");
  cameraScreen.classList.toggle("active-screen", state.currentScreen === "camera");
  frameScreen.classList.toggle("active-screen", state.currentScreen === "frame");
  updateActiveStrip();
  updatePreviewVisibility();
}

function updateActiveStrip() {
  const activeStrip = getActiveStripPreset();
  const previewMarkup = renderStripPreviewMarkup(activeStrip);

  if (activeStripName) {
    activeStripName.textContent = activeStrip.name;
  }
  frameActiveStripName.textContent = activeStrip.name;
  if (selectedStripTitle) {
    selectedStripTitle.textContent = activeStrip.name;
  }
  if (cameraStripTitle) {
    cameraStripTitle.textContent = activeStrip.name;
  }
  if (frameStripTitle) {
    frameStripTitle.textContent = activeStrip.name;
  }
  if (selectedStripPreview) {
    selectedStripPreview.innerHTML = previewMarkup;
  }
  if (cameraStripPreview) {
    cameraStripPreview.innerHTML = previewMarkup;
  }
  if (frameStripPreview) {
    frameStripPreview.innerHTML = previewMarkup;
  }
  if (isSplitColumnStripPreset(activeStrip)) {
    if (selectedStripPreview) {
      selectedStripPreview.style.width = "120px";
      selectedStripPreview.style.minWidth = "120px";
      selectedStripPreview.style.aspectRatio = "1 / 1.08";
    }
    if (cameraStripPreview) {
      cameraStripPreview.style.width = "110px";
      cameraStripPreview.style.minWidth = "110px";
      cameraStripPreview.style.aspectRatio = "1 / 1.08";
    }
    if (frameStripPreview) {
      frameStripPreview.style.width = "110px";
      frameStripPreview.style.minWidth = "110px";
      frameStripPreview.style.aspectRatio = "1 / 1.08";
    }
    posterCanvas.style.width = "auto";
    posterCanvas.style.height = "min(62vh, 560px)";
  } else if (activeStrip.shots === 3 || activeStrip.shots === 4) {
    if (selectedStripPreview) {
      selectedStripPreview.style.width = "104px";
      selectedStripPreview.style.minWidth = "104px";
      selectedStripPreview.style.aspectRatio = "";
    }
    if (cameraStripPreview) {
      cameraStripPreview.style.width = "92px";
      cameraStripPreview.style.minWidth = "92px";
      cameraStripPreview.style.aspectRatio = "";
    }
    if (frameStripPreview) {
      frameStripPreview.style.width = "92px";
      frameStripPreview.style.minWidth = "92px";
      frameStripPreview.style.aspectRatio = "";
    }
    posterCanvas.style.width = "auto";
    posterCanvas.style.height = "min(68vh, 680px)";
  } else {
    if (selectedStripPreview) {
      selectedStripPreview.style.width = "";
      selectedStripPreview.style.minWidth = "";
      selectedStripPreview.style.aspectRatio = "";
    }
    if (cameraStripPreview) {
      cameraStripPreview.style.width = "";
      cameraStripPreview.style.minWidth = "";
      cameraStripPreview.style.aspectRatio = "";
    }
    if (frameStripPreview) {
      frameStripPreview.style.width = "";
      frameStripPreview.style.minWidth = "";
      frameStripPreview.style.aspectRatio = "";
    }
    posterCanvas.style.width = "auto";
    posterCanvas.style.height = "min(68vh, 680px)";
  }
  updateCameraAspect();
}

function updateCameraAspect() {
  const stripPreset = getActiveStripPreset();
  if (isWideStripPreset(stripPreset)) {
    camera.style.aspectRatio = "16 / 9";
    return;
  }
  const { innerW, slotH } = getStripMetrics(stripPreset);
  camera.style.aspectRatio = `${Math.max(1, Math.round(innerW))} / ${Math.max(1, Math.round(slotH))}`;
}

function updatePreviewVisibility() {
  const shouldShowCanvas = state.currentScreen === "frame" && (state.shots.length > 0 || Boolean(state.partnerImage));
  posterCanvas.classList.toggle("hidden-canvas", !shouldShowCanvas);
  previewEmptyState.classList.toggle("visible", !shouldShowCanvas);
}

async function runCountdown(seconds) {
  for (let current = seconds; current >= 1; current -= 1) {
    countdownOverlay.textContent = current;
    countdownOverlay.classList.add("visible");
    await wait(1000);
  }

  countdownOverlay.textContent = "";
  countdownOverlay.classList.remove("visible");
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function drawPoster() {
  updatePreviewVisibility();

  if ((!state.shots.length && !state.partnerImage)) {
    return;
  }

  syncPosterCanvasToStrip();
  ctx.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
  drawStripLayout(state.selectedFrame);
}

function syncPosterCanvasToStrip() {
  const stripPreset = getActiveStripPreset();
  const size = getPosterCanvasSize(stripPreset);
  if (posterCanvas.width !== size.width) {
    posterCanvas.width = size.width;
  }
  if (posterCanvas.height !== size.height) {
    posterCanvas.height = size.height;
  }
}

function getPosterCanvasSize(stripPreset) {
  const shotCount = stripPreset.shots;
  const slotGap = stripPreset.gap;
  const extraBottomPad = state.selectedFrame.id === "about-you" ? ABOUT_YOU_EXTRA_BOTTOM_PAD : 0;
  const baseBottomPad = stripPreset.bottomPad + extraBottomPad;

  if (isSplitColumnStripPreset(stripPreset)) {
    const innerW = stripPreset.stripW - 60;
    const rows = Math.ceil(shotCount / 2);
    const columnGap = stripPreset.columnGap || slotGap;
    const slotW = (innerW - columnGap) / 2;
    const slotH = slotW * (stripPreset.photoAspect || 1.3);
    const photoAreaHeight = rows * slotH + slotGap * (rows - 1);
    const baseStripH = stripPreset.topPad + baseBottomPad + photoAreaHeight;
    const targetStripH = stripPreset.targetStripAspect ? stripPreset.stripW * stripPreset.targetStripAspect : 0;
    return {
      width: Math.round(stripPreset.stripW),
      height: Math.round(targetStripH > baseStripH ? targetStripH : baseStripH),
    };
  }

  const innerW = stripPreset.stripW - 60;
  const targetStripH = stripPreset.targetStripAspect ? stripPreset.stripW * stripPreset.targetStripAspect : 0;
  let slotH = innerW * (stripPreset.photoAspect || 1.3);
  const photoAreaHeight = shotCount * slotH + slotGap * (shotCount - 1);
  let stripH = stripPreset.topPad + baseBottomPad + photoAreaHeight;

  if (targetStripH > stripH) {
    stripH = targetStripH;
    const availablePhotoArea = stripH - stripPreset.topPad - baseBottomPad;
    slotH = (availablePhotoArea - slotGap * (shotCount - 1)) / shotCount;
    const grownPhotoArea = shotCount * slotH + slotGap * (shotCount - 1);
    stripH = stripPreset.topPad + Math.max(18, stripH - stripPreset.topPad - grownPhotoArea) + grownPhotoArea;
  }

  return {
    width: Math.round(stripPreset.stripW),
    height: Math.round(stripH),
  };
}

function drawBackdrop(frame) {
  const [bg, main, soft, detail] = frame.palette;
  const theme = frame.theme || "kawaii";
  ctx.save();
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = soft;
  ctx.beginPath();
  ctx.arc(220, 180, 140, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = detail;
  ctx.beginPath();
  ctx.arc(980, 260, 170, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = `${main}55`;
  ctx.lineWidth = 4;
  for (let i = 0; i < 6; i += 1) {
    ctx.beginPath();
    ctx.arc(150 + i * 150, 1620, 30 + i * 8, 0, Math.PI);
    ctx.stroke();
  }

  if (theme === "kawaii") {
    ctx.fillStyle = `${main}18`;
    for (let i = 0; i < 10; i += 1) {
      roundRect(ctx, 90 + i * 102, 286 + (i % 2) * 20, 42, 18, 9, true, false);
      roundRect(ctx, 128 + i * 94, 1420 + (i % 3) * 18, 52, 20, 10, true, false);
    }
  } else if (theme === "anime") {
    ctx.strokeStyle = `${main}30`;
    ctx.lineWidth = 3;
    for (let i = 0; i < 12; i += 1) {
      ctx.beginPath();
      ctx.moveTo(80 + i * 96, 300);
      ctx.lineTo(150 + i * 88, 180);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(1020 - i * 74, 1550);
      ctx.lineTo(1120 - i * 70, 1670);
      ctx.stroke();
    }
  } else if (theme === "retro") {
    ctx.fillStyle = `${main}18`;
    for (let y = 310; y < 1580; y += 90) {
      for (let x = 90; x < 1120; x += 90) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.restore();
}

function drawHeader(frame) {
  const theme = frame.theme || "kawaii";
  const themeFonts = {
    kawaii: {
      eyebrow: "700 40px Trebuchet MS",
      title: "700 94px Georgia",
      sub: "32px Trebuchet MS",
    },
    anime: {
      eyebrow: "700 38px Georgia",
      title: "700 96px Trebuchet MS",
      sub: "700 30px Georgia",
    },
    retro: {
      eyebrow: "700 34px Courier New",
      title: "700 90px Courier New",
      sub: "28px Courier New",
    },
  };
  const fonts = themeFonts[theme] || themeFonts.kawaii;

  ctx.save();
  ctx.fillStyle = frame.accent;
  ctx.font = fonts.eyebrow;
  ctx.fillText("STAR SNAP", 90, 110);
  ctx.font = fonts.title;
  ctx.fillText("Photobooth", 84, 200);
  ctx.fillStyle = "#5b4c49";
  ctx.font = fonts.sub;
  ctx.fillText("photo date . bestie moment . cute memory", 92, 248);
  ctx.restore();
}

function drawDuoLayout(frame) {
  const panelY = 320;
  drawPanel(80, panelY, 500, 1140, frame);
  drawPanel(620, panelY, 500, 1140, frame);

  drawPartnerCard(110, 360, 440, 770, frame);
  drawShotColumn(650, 360, 440, 770, frame);
  drawMiniCaption(110, 1160, 440, 250, "Partner", state.partnerImage ? "Uploaded image ready" : "Upload partner image");
  drawMiniCaption(650, 1160, 440, 250, "Your poses", state.shots.length ? `${state.shots.length} shot captured` : "Take up to 4 shots");
}

function drawStripLayout(frame) {
  const stripPreset = getActiveStripPreset();
  if (stripPreset.variant === "double-copy") {
    drawDoubleCopyStrip(frame, stripPreset);
    return;
  }
  drawPhotoStrip(frame);
}

function drawPanel(x, y, w, h, frame) {
  const theme = frame.theme || "kawaii";
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.78)";
  roundRect(ctx, x, y, w, h, 36, true, false);
  ctx.lineWidth = theme === "retro" ? 7 : 5;
  ctx.strokeStyle = `${frame.accent}33`;
  roundRect(ctx, x, y, w, h, 36, false, true);

  if (theme === "kawaii") {
    ctx.lineWidth = 2;
    ctx.strokeStyle = `${frame.palette[1]}66`;
    roundRect(ctx, x + 14, y + 14, w - 28, h - 28, 28, false, true);
  } else if (theme === "anime") {
    ctx.lineWidth = 5;
    ctx.strokeStyle = `${frame.palette[1]}88`;
    ctx.beginPath();
    ctx.moveTo(x + 28, y + 28);
    ctx.lineTo(x + 150, y + 28);
    ctx.moveTo(x + 28, y + 28);
    ctx.lineTo(x + 28, y + 150);
    ctx.moveTo(x + w - 28, y + h - 28);
    ctx.lineTo(x + w - 150, y + h - 28);
    ctx.moveTo(x + w - 28, y + h - 28);
    ctx.lineTo(x + w - 28, y + h - 150);
    ctx.stroke();
  } else if (theme === "retro") {
    ctx.setLineDash([14, 10]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = `${frame.palette[1]}aa`;
    roundRect(ctx, x + 18, y + 18, w - 36, h - 36, 26, false, true);
    ctx.setLineDash([]);
  }
  ctx.restore();
}

function drawPartnerCard(x, y, w, h, frame) {
  drawMediaFrame(x, y, w, h, state.partnerImage, frame, "PARTNER");
}

function drawShotColumn(x, y, w, h, frame) {
  const gap = 24;
  const itemHeight = (h - gap * 3) / 4;
  for (let i = 0; i < 4; i += 1) {
    drawMediaFrame(x, y + i * (itemHeight + gap), w, itemHeight, state.shots[i], frame, `SHOT 0${i + 1}`);
  }
}

function drawPhotoStrip(frame) {
  const stripPreset = getActiveStripPreset();
  const metrics = getStripMetrics(stripPreset);
  const { stripX, stripY, stripW, stripH, shotCount } = metrics;
  const timestamp = new Date().toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  drawStripShell(stripX, stripY, stripW, stripH, frame, stripPreset);

  for (let i = 0; i < shotCount; i += 1) {
    const slotRect = getStripSlotRect(metrics, i);
    drawMediaFrame(slotRect.x, slotRect.y, slotRect.w, slotRect.h, state.shots[i], frame, `POSE 0${i + 1}`, stripPreset.radius);
  }

  drawStripThemeDecor(stripX, stripY, stripW, stripH, frame, metrics);

  ctx.save();
  ctx.textAlign = "center";
  if (frame.id !== "about-you" && frame.id !== "barbie") {
    ctx.fillStyle = frame.accent;
    ctx.font = "700 20px Arial";
    ctx.fillText(frame.name, stripX + stripW / 2, stripY + stripH - 54);
    ctx.fillStyle = "#7d6a67";
    ctx.font = "15px Arial";
    ctx.fillText(timestamp, stripX + stripW / 2, stripY + stripH - 26);
    ctx.font = "13px Arial";
    ctx.fillText("StarSnap booth", stripX + stripW / 2, stripY + 34);
  } else if (frame.id === "about-you") {
    drawFooterWatermark(stripX + stripW / 2, stripY + stripH - 18, "StarSnap booth", "#8d7a75");
  }
  ctx.textAlign = "left";
  ctx.restore();
}

function drawFooterWatermark(x, y, text, color = "#8d7a67") {
  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = color;
  ctx.font = "500 11px Arial";
  ctx.globalAlpha = 0.86;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawDoubleCopyStrip(frame, stripPreset) {
  const metrics = getDoubleCopyStripMetrics(stripPreset);
  const { sheetX, sheetY, sheetW, sheetH, columnW, columnH, columnGap, columnX1, columnX2, columnY, innerInset, slotGap, slotH, shotCount, footerH } = metrics;

  ctx.save();
  const paperGradient = ctx.createLinearGradient(sheetX, sheetY, sheetX, sheetY + sheetH);
  paperGradient.addColorStop(0, "#efe2c8");
  paperGradient.addColorStop(1, "#dcc29d");
  ctx.fillStyle = paperGradient;
  roundRect(ctx, sheetX, sheetY, sheetW, sheetH, 18, true, false);
  ctx.strokeStyle = "rgba(117, 84, 48, 0.18)";
  ctx.lineWidth = 2;
  roundRect(ctx, sheetX, sheetY, sheetW, sheetH, 18, false, true);
  ctx.restore();

  [columnX1, columnX2].forEach((columnX, columnIndex) => {
    drawDoubleCopyColumn(frame, stripPreset, columnX, columnY, columnW, columnH, innerInset, slotGap, slotH, shotCount, footerH, columnIndex);
  });
}

function drawDoubleCopyColumn(frame, stripPreset, x, y, w, h, inset, slotGap, slotH, shotCount, footerH, columnIndex) {
  ctx.save();
  ctx.fillStyle = "rgba(255, 246, 235, 0.92)";
  roundRect(ctx, x, y, w, h, 14, true, false);
  ctx.strokeStyle = "#cc3838";
  ctx.lineWidth = 8;
  roundRect(ctx, x + 4, y + 4, w - 8, h - 8, 12, false, true);
  ctx.strokeStyle = "#3657ca";
  ctx.lineWidth = 4;
  roundRect(ctx, x + 10, y + 10, w - 20, h - 20, 10, false, true);
  ctx.restore();

  const innerX = x + inset;
  const innerW = w - inset * 2;
  const slotStartY = y + inset;
  for (let i = 0; i < shotCount; i += 1) {
    drawMediaFrame(
      innerX,
      slotStartY + i * (slotH + slotGap),
      innerW,
      slotH,
      state.shots[i],
      frame,
      `POSE 0${i + 1}`,
      stripPreset.radius
    );
  }

  ctx.save();
  ctx.textAlign = "center";
  ctx.fillStyle = "#1f1412";
  ctx.font = "900 26px Arial";
  ctx.fillText("POSE", x + w / 2, y + h - footerH * 0.46);
  ctx.fillText("BOX", x + w / 2, y + h - footerH * 0.18);
  ctx.restore();
}

function getDoubleCopyStripMetrics(stripPreset) {
  const sheetW = stripPreset.stripW;
  const columnGap = 28;
  const columnW = (sheetW - columnGap - 48) / 2;
  const innerInset = 18;
  const innerW = columnW - innerInset * 2;
  const shotCount = stripPreset.shots;
  const slotGap = stripPreset.gap;
  const slotH = innerW * (stripPreset.photoAspect || 1.3);
  const footerH = stripPreset.bottomPad;
  const photoAreaHeight = shotCount * slotH + slotGap * (shotCount - 1);
  const columnH = stripPreset.topPad + photoAreaHeight + footerH;
  const sheetH = columnH + 34;
  const sheetX = (posterCanvas.width - sheetW) / 2;
  const sheetY = Math.max(48, (posterCanvas.height - sheetH) / 2);
  const columnX1 = sheetX + 10;
  const columnX2 = columnX1 + columnW + columnGap;
  const columnY = sheetY + 17;

  return { sheetX, sheetY, sheetW, sheetH, columnW, columnH, columnGap, columnX1, columnX2, columnY, innerInset, innerW, slotGap, slotH, shotCount, footerH };
}

function getStripMetrics(stripPreset) {
  const stripW = stripPreset.stripW;
  const shotCount = stripPreset.shots;
  const slotGap = stripPreset.gap;
  const extraBottomPad = state.selectedFrame.id === "about-you" ? ABOUT_YOU_EXTRA_BOTTOM_PAD : 0;
  const baseBottomPad = stripPreset.bottomPad + extraBottomPad;

  if (isSplitColumnStripPreset(stripPreset)) {
    const innerW = stripW - 60;
    const rows = Math.ceil(shotCount / 2);
    const columnGap = stripPreset.columnGap || slotGap;
    const slotW = (innerW - columnGap) / 2;
    const slotH = slotW * (stripPreset.photoAspect || 1.3);
    const photoAreaHeight = rows * slotH + slotGap * (rows - 1);
    const baseStripH = stripPreset.topPad + baseBottomPad + photoAreaHeight;
    const targetStripH = stripPreset.targetStripAspect ? stripW * stripPreset.targetStripAspect : 0;
    const stripH = targetStripH > baseStripH ? targetStripH : baseStripH;
    const bottomPad = Math.max(36, stripH - stripPreset.topPad - photoAreaHeight);
    const stripX = (posterCanvas.width - stripW) / 2;
    const stripY = Math.max(48, (posterCanvas.height - stripH) / 2);

    return {
      stripX,
      stripY,
      stripW,
      stripH,
      innerX: stripX + 30,
      innerY: stripY + stripPreset.topPad,
      innerW,
      slotW,
      slotH,
      shotCount,
      slotGap,
      columnGap,
      bottomPad,
      rows,
      columns: 2,
      variant: stripPreset.variant,
    };
  }

  const innerW = stripW - 60;
  const targetStripH = stripPreset.targetStripAspect ? stripW * stripPreset.targetStripAspect : 0;

  let slotH = innerW * (stripPreset.photoAspect || 1.3);
  let photoAreaHeight = shotCount * slotH + slotGap * (shotCount - 1);
  let stripH = stripPreset.topPad + baseBottomPad + photoAreaHeight;
  let bottomPad = baseBottomPad;

  // For fixed-ratio strips, grow the photo slots first so the extra height
  // is absorbed by the photos instead of leaving a large blank footer.
  if (targetStripH > stripH) {
    stripH = targetStripH;
    const availablePhotoArea = stripH - stripPreset.topPad - baseBottomPad;
    slotH = (availablePhotoArea - slotGap * (shotCount - 1)) / shotCount;
    photoAreaHeight = shotCount * slotH + slotGap * (shotCount - 1);
    bottomPad = Math.max(18, stripH - stripPreset.topPad - photoAreaHeight);
  }

  const stripX = (posterCanvas.width - stripW) / 2;
  const stripY = Math.max(48, (posterCanvas.height - stripH) / 2);
  const resolvedInnerX = stripX + 30;
  const resolvedInnerY = stripY + stripPreset.topPad;

  return { stripX, stripY, stripW, stripH, innerX: resolvedInnerX, innerY: resolvedInnerY, innerW, slotH, shotCount, slotGap, bottomPad, variant: stripPreset.variant };
}

function getStripSlotRect(metrics, index) {
  if (metrics.variant === "split-columns") {
    const row = index % metrics.rows;
    const column = Math.floor(index / metrics.rows);
    return {
      x: metrics.innerX + column * (metrics.slotW + metrics.columnGap),
      y: metrics.innerY + row * (metrics.slotH + metrics.slotGap),
      w: metrics.slotW,
      h: metrics.slotH,
    };
  }

  return {
    x: metrics.innerX,
    y: metrics.innerY + index * (metrics.slotH + metrics.slotGap),
    w: metrics.innerW,
    h: metrics.slotH,
  };
}

function getStripSlotTop(metrics, index) {
  return getStripSlotRect(metrics, index).y;
}

function drawStripShell(x, y, w, h, frame, stripPreset) {
  const stripColor = getActiveStripColor();
  const shellRadius = 0;

  ctx.save();
  ctx.fillStyle = stripColor.base;
  roundRect(ctx, x, y, w, h, shellRadius, true, false);
  if (stripColor.decorate === "rainbow-stars") {
    ctx.save();
    roundRect(ctx, x, y, w, h, shellRadius, false, false);
    ctx.clip();
    drawRainbowStarBackdrop(x, y, w, h);
    ctx.restore();
  }
  if (stripColor.image?.complete && stripColor.image.naturalWidth) {
    ctx.save();
    roundRect(ctx, x, y, w, h, shellRadius, false, false);
    ctx.clip();
    if (stripColor.pattern) {
      drawStripPattern(stripColor.image, x, y, w, h);
    } else {
      drawImageCover(stripColor.image, x, y, w, h);
    }
    ctx.restore();
  }
  ctx.lineWidth = 2;
  ctx.strokeStyle = stripColor.edge;
  roundRect(ctx, x, y, w, h, shellRadius, false, true);
  ctx.fillStyle = stripColor.inner;
  roundRect(ctx, x + 12, y + 12, w - 24, h - 24, 0, true, false);
  ctx.restore();
}

function drawStripPattern(image, x, y, w, h) {
  const scale = Math.max(2.8, 140 / Math.max(image.naturalWidth, 1));
  const tileW = image.naturalWidth * scale;
  const tileH = image.naturalHeight * scale;

  for (let drawY = y; drawY < y + h + tileH; drawY += tileH * 0.9) {
    for (let drawX = x; drawX < x + w + tileW; drawX += tileW * 0.9) {
      ctx.drawImage(image, drawX, drawY, tileW, tileH);
    }
  }
}

function drawRainbowStarBackdrop(x, y, w, h) {
  const gradient = ctx.createLinearGradient(x, y, x + w, y + h);
  gradient.addColorStop(0, "#ff7eb6");
  gradient.addColorStop(0.28, "#ffb86b");
  gradient.addColorStop(0.52, "#fff07c");
  gradient.addColorStop(0.74, "#88e3ff");
  gradient.addColorStop(1, "#c8a5ff");
  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, w, h);

  const stars = [
    [x + w * 0.16, y + h * 0.12, 16],
    [x + w * 0.76, y + h * 0.18, 14],
    [x + w * 0.28, y + h * 0.46, 12],
    [x + w * 0.82, y + h * 0.6, 15],
    [x + w * 0.22, y + h * 0.82, 13],
    [x + w * 0.68, y + h * 0.86, 11],
  ];

  stars.forEach(([starX, starY, size]) => {
    drawShape("star", starX, starY, size, "rgba(255,255,255,0.92)");
    drawShape("spark", starX + size * 0.9, starY - size * 0.3, Math.max(7, size * 0.45), "rgba(255,255,255,0.78)");
  });
}

function drawStripThemeDecor(x, y, w, h, frame, metrics) {
  const useFooterDecor = shouldUseFooterDecor(metrics);
  const decor = getDecorAnchors(x, y, w, h, metrics, useFooterDecor);
  const themeDecor = {
    shinchan: () => {
      drawStickerLabel("mood on", decor.labelX, decor.labelY, -0.04, frame.palette[2], frame.accent, "soft");
      drawShape("burst", decor.leftX, decor.leftY, 18, frame.accent);
      drawShape("star", decor.rightX, decor.rightY, 16, frame.accent);
    },
    "cat-club": () => {
      drawStickerLabel("meow", decor.labelX, decor.labelY, -0.04, frame.palette[2], frame.accent, "soft");
      drawShape("heart", decor.leftX, decor.leftY, 14, frame.accent);
      drawShape("dot", decor.rightX, decor.rightY, 10, frame.accent);
    },
    "flower-note": () => {
      drawStickerLabel("bloom", decor.labelX, decor.labelY, -0.04, frame.palette[2], frame.accent, "soft");
      drawShape("petal", decor.leftX, decor.leftY, 16, frame.accent);
      drawShape("petal", decor.rightX, decor.rightY, 14, frame.accent);
    },
    "butterfly-air": () => {
      drawStickerLabel("flutter", decor.labelX, decor.labelY, -0.04, frame.palette[2], frame.accent, "sharp");
      drawShape("spark", decor.leftX, decor.leftY, 14, frame.accent);
      drawShape("star", decor.rightX, decor.rightY, 12, frame.accent);
    },
    "about-you": () => {
      drawAboutYouStickerPack(metrics);
    },
    barbie: () => {
      drawBarbieStickerPack(metrics);
    },
    "kitty-pop": () => {
      drawStickerLabel("sweet pop", decor.labelX, decor.labelY, -0.04, frame.palette[2], frame.accent, "soft");
      drawShape("heart", decor.leftX, decor.leftY, 14, frame.accent);
      drawShape("cloud", decor.rightX, decor.rightY, 12, frame.accent);
    },
  };

  themeDecor[frame.id]?.();
}

function shouldUseFooterDecor(metrics) {
  const topMargin = metrics.innerY - metrics.stripY;
  return metrics.variant === "split-columns" && topMargin < 32 && metrics.bottomPad >= 72;
}

function getDecorAnchors(x, y, w, h, metrics, useFooterDecor) {
  if (metrics.shotCount === 1) {
    const slotRect = getStripSlotRect(metrics, 0);
    const footerCenterY = y + h - metrics.bottomPad * 0.38;
    return {
      labelX: x + w / 2,
      labelY: footerCenterY,
      leftX: slotRect.x + slotRect.w * 0.14,
      leftY: slotRect.y + slotRect.h * 0.14,
      rightX: slotRect.x + slotRect.w * 0.86,
      rightY: slotRect.y + slotRect.h * 0.2,
    };
  }

  if (useFooterDecor) {
    const footerCenterY = y + h - metrics.bottomPad * 0.45;
    return {
      labelX: x + w / 2,
      labelY: footerCenterY,
      leftX: x + w * 0.14,
      leftY: footerCenterY,
      rightX: x + w * 0.86,
      rightY: footerCenterY,
    };
  }

  return {
    labelX: x + w / 2,
    labelY: y + 84,
    leftX: x + 40,
    leftY: y + 100,
    rightX: x + w - 38,
    rightY: y + h - 118,
  };
}

function drawAboutYouStickerPack(metrics) {
  const { stripX, stripY, stripW, stripH, innerX, innerW, slotH, shotCount, bottomPad } = metrics;
  if (shotCount === 1) {
    const slotRect = getStripSlotRect(metrics, 0);
    const footerCenterY = stripY + stripH - bottomPad * 0.42;
    const clapperBox = Math.min(innerW * 0.8, slotRect.h * 0.22);
    const carMaxWidth = innerW * 0.94;
    const carMaxHeight = slotRect.h * 0.22;
    const footerStickerMaxWidth = innerW * 0.76;
    const footerStickerMaxHeight = slotRect.h * 0.2;
    const titleBox = Math.min(stripW * 0.96, bottomPad * 1.66);

    drawStickerImageFit(
      aboutYouStickerAssets.clapper,
      slotRect.x + slotRect.w * 0.18,
      slotRect.y + slotRect.h * 0.12,
      clapperBox,
      clapperBox,
      -0.14
    );
    drawStickerImageFit(
      aboutYouStickerAssets.car,
      slotRect.x + slotRect.w * 0.76,
      slotRect.y + slotRect.h * 0.16,
      carMaxWidth,
      carMaxHeight,
      -0.08
    );
    drawStickerImageFit(
      aboutYouStickerAssets.footer,
      slotRect.x + slotRect.w * 0.2,
      slotRect.y + slotRect.h * 0.76,
      footerStickerMaxWidth,
      footerStickerMaxHeight,
      0.08
    );
    drawStickerImageFit(
      aboutYouStickerAssets.bunny,
      stripX + stripW * 0.56,
      footerCenterY,
      titleBox,
      bottomPad * 0.9,
      -0.02
    );
    return;
  }

  const slotTopAt = (index) => getStripSlotTop(metrics, Math.min(index, shotCount - 1));
  const firstSlotTop = slotTopAt(0);
  const secondSlotTop = slotTopAt(1);
  const thirdSlotTop = slotTopAt(2);
  const footerCenterY = stripY + stripH - bottomPad * 0.6;
  const leftX = innerX + innerW * 0.16;
  const rightX = innerX + innerW * 0.82;
  const titleX = stripX + stripW * 0.58;
  const clapperBox = Math.min(innerW * 1.08, slotH * 0.66);
  const carMaxWidth = innerW * 1.52;
  const carMaxHeight = slotH * 0.7;
  const titleBox = Math.min(stripW * 1.2, bottomPad * 2.2);
  const footerStickerMaxWidth = innerW * 1.24;
  const footerStickerMaxHeight = slotH * 0.58;

  drawStickerImageFit(
    aboutYouStickerAssets.clapper,
    leftX,
    firstSlotTop + slotH * 0.08,
    clapperBox,
    clapperBox,
    -0.14
  );
  drawStickerImageFit(
    aboutYouStickerAssets.footer,
    leftX,
    thirdSlotTop + slotH * 0.83,
    footerStickerMaxWidth,
    footerStickerMaxHeight,
    0.08
  );
  drawStickerImageFit(
    aboutYouStickerAssets.car,
    rightX,
    secondSlotTop + slotH * 0.06,
    carMaxWidth,
    carMaxHeight,
    -0.08
  );
  drawStickerImageFit(
    aboutYouStickerAssets.bunny,
    titleX,
    footerCenterY,
    titleBox,
    bottomPad * 0.98,
    -0.02
  );
}

function drawBarbieStickerPack(metrics) {
  const { stripX, stripY, stripW, stripH, innerX, innerW, slotH, shotCount, bottomPad } = metrics;
  const slotRectAt = (index) => getStripSlotRect(metrics, Math.min(index, shotCount - 1));
  const footerCenterY = stripY + stripH - bottomPad * 0.44;
  const layout = getBarbieLayout(shotCount);

  drawBarbieStickerAsset("one", layout.one, innerX, innerW, slotRectAt, slotH);
  drawBarbieStickerAsset("three", layout.three, innerX, innerW, slotRectAt, slotH);
  drawBarbieStickerAsset("five", layout.five, innerX, innerW, slotRectAt, slotH);
  drawBarbieStickerFooter(layout.footer, innerX, innerW, stripX, stripW, footerCenterY, bottomPad, slotH);
}

function getBarbieLayout(shotCount) {
  const base = {
    one: { slotIndex: 0, xFactor: 0.82, yOffset: -0.04, widthFactor: 1.42, heightFactor: 0.76, rotation: 0.16 },
    three: { slotIndex: 2, xFactor: 0.78, yOffset: 0.04, widthFactor: 1.02, heightFactor: 0.64, rotation: 0.08 },
    five: { slotIndex: 3, xFactor: 0.22, yOffset: 0.18, widthFactor: 0.56, heightFactor: 0.42, rotation: -0.08 },
    footer: { xFactor: 0.28, yOffset: -0.9, widthFactor: 1.08, heightFactor: 1 },
  };
  const overrides = {
    1: {
      one: { slotIndex: 0, xFactor: 0.76, yOffset: -0.08, widthFactor: 0.98, heightFactor: 0.54, rotation: 0.14 },
      three: { slotIndex: 0, xFactor: 0.24, yOffset: 0.12, widthFactor: 0.62, heightFactor: 0.34, rotation: -0.08 },
      five: { slotIndex: 0, xFactor: 0.8, yOffset: 0.24, widthFactor: 0.42, heightFactor: 0.28, rotation: 0.06 },
      footer: { xFactor: 0.32, yOffset: -0.58, widthFactor: 0.78, heightFactor: 0.72 },
    },
    2: {
      one: { xFactor: 0.78, yOffset: -0.08, widthFactor: 1.4, heightFactor: 0.8, rotation: 0.22 },
      three: { slotIndex: 1, xFactor: 0.2, yOffset: 0.08, widthFactor: 1.1, heightFactor: 0.56, rotation: -0.05 },
      five: { slotIndex: 1, xFactor: 0.26, yOffset: 0.1, widthFactor: 0.52, heightFactor: 0.36, rotation: -0.08 },
    },
    3: {
      one: { yOffset: -0.08, widthFactor: 1.34, heightFactor: 0.82, rotation: 0.2 },
      three: { slotIndex: 1, xFactor: 0.2, yOffset: 0.1, widthFactor: 0.88, heightFactor: 0.54, rotation: -0.09 },
      five: { slotIndex: 2, xFactor: 0.78, yOffset: 0.14, widthFactor: 0.66, heightFactor: 0.48, rotation: 0.1 },
    },
    6: {
      one: { yOffset: -0.06, widthFactor: 1.28, heightFactor: 0.72, rotation: 0.18 },
      three: { slotIndex: 4, xFactor: 0.78, yOffset: 0.04, widthFactor: 0.9, heightFactor: 0.56, rotation: 0.08 },
      five: { slotIndex: 5, xFactor: 0.26, yOffset: 0.04, widthFactor: 0.6, heightFactor: 0.45, rotation: -0.04 },
    },
  };
  const layout = { ...base };
  if (overrides[shotCount]) {
    Object.entries(overrides[shotCount]).forEach(([key, trait]) => {
      layout[key] = { ...layout[key], ...trait };
    });
  }
  return layout;
}

function drawBarbieStickerAsset(key, trait, innerX, innerW, slotRectAt, slotH) {
  if (!barbieStickerAssets[key] || !trait) return;
  const slotRect = slotRectAt(trait.slotIndex ?? 0);
  const x = innerX + innerW * trait.xFactor;
  const y = slotRect.y + slotH * trait.yOffset;
  const width = innerW * trait.widthFactor;
  const height = slotH * trait.heightFactor;
  drawStickerImageFit(barbieStickerAssets[key], x, y, width, height, trait.rotation);
}

function drawBarbieStickerFooter(trait, innerX, stripX, stripW, footerCenterY, bottomPad) {
  if (!trait) return;
  const x = innerX + innerW * trait.xFactor || stripX + stripW * trait.xFactor;
  const width = stripW * trait.widthFactor;
  const height = Math.max(64, bottomPad * 1.16);
  drawStickerImageFit(barbieStickerAssets.four, x, footerCenterY + trait.yOffset * height, width, height, -0.06);
}

function drawStickerImage(image, centerX, centerY, width, height, rotation = 0, cleanupWhite = false) {
  if (!image?.complete || !image.naturalWidth) {
    return;
  }

  const renderImage = cleanupWhite ? removeNearWhiteBackground(image) : image;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(rotation);
  ctx.drawImage(renderImage, -width / 2, -height / 2, width, height);
  ctx.restore();
}

function drawStickerImageFit(image, centerX, centerY, maxWidth, maxHeight, rotation = 0, cleanupWhite = false) {
  if (!image?.complete || !image.naturalWidth || !image.naturalHeight) {
    return;
  }

  const scale = Math.min(maxWidth / image.naturalWidth, maxHeight / image.naturalHeight);
  drawStickerImage(
    image,
    centerX,
    centerY,
    image.naturalWidth * scale,
    image.naturalHeight * scale,
    rotation,
    cleanupWhite
  );
}

function removeNearWhiteBackground(image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const alpha = data[i + 3];

    if (alpha === 0) {
      continue;
    }

    const isNearWhite = red > 238 && green > 238 && blue > 238;
    if (isNearWhite) {
      data[i + 3] = 0;
    }
  }

  context.putImageData(imageData, 0, 0);
  return canvas;
}

function drawMediaFrame(x, y, w, h, source, frame, label, radius = 30) {
  const theme = frame.theme || "kawaii";
  const stripPreset = getActiveStripPreset();
  const isKoreanStrip = state.layout === "strip" && stripPreset.id === "korean";
  const isStripLayout = state.layout === "strip";
  const mediaInsetX = isStripLayout ? 8 : 24;
  const mediaInsetY = isStripLayout ? 8 : 24;
  ctx.save();
  ctx.fillStyle = "white";
  roundRect(ctx, x, y, w, h, radius, true, false);
  ctx.fillStyle = isKoreanStrip ? "rgba(0, 0, 0, 0.03)" : `${frame.palette[2]}55`;
  roundRect(ctx, x + 14, y + 14, w - 28, h - 28, Math.max(radius - 8, 0), true, false);

  if (source) {
    drawImageCover(source, x + mediaInsetX, y + mediaInsetY, w - mediaInsetX * 2, h - mediaInsetY * 2);
  } else {
    drawPlaceholder(x + mediaInsetX, y + mediaInsetY, w - mediaInsetX * 2, h - mediaInsetY * 2, label, frame);
  }
  ctx.restore();
}

function drawPlaceholder(x, y, w, h, label, frame) {
  const gradient = ctx.createLinearGradient(x, y, x + w, y + h);
  gradient.addColorStop(0, `${frame.palette[1]}33`);
  gradient.addColorStop(1, `${frame.palette[3]}88`);
  ctx.fillStyle = gradient;
  roundRect(ctx, x, y, w, h, 20, true, false);
  ctx.fillStyle = frame.accent;
  ctx.font = "700 34px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(label, x + w / 2, y + h / 2 - 8);
  ctx.font = "26px Trebuchet MS";
  ctx.fillText("ready for your moment", x + w / 2, y + h / 2 + 34);
  ctx.textAlign = "left";
}

function drawMiniCaption(x, y, w, h, title, text) {
  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  roundRect(ctx, x, y, w, h, 24, true, false);
  ctx.fillStyle = "#5b4c49";
  ctx.font = "700 36px Georgia";
  ctx.fillText(title, x + 28, y + 70);
  ctx.font = "28px Trebuchet MS";
  wrapText(text, x + 28, y + 128, w - 56, 36);
  ctx.restore();
}

function drawFooter(frame) {
  ctx.save();
  ctx.fillStyle = frame.accent;
  roundRect(ctx, 90, 1670, 1020, 74, 24, true, false);
  ctx.fillStyle = "#fffaf7";
  ctx.font = "700 28px Trebuchet MS";
  ctx.fillText("Made in StarSnap . export as PNG . pose freely", 130, 1718);
  ctx.restore();
}

function drawStamps(frame) {
  frame.stamp.forEach((shape, index) => {
    const positions = [
      [180, 290],
      [1010, 300],
      [1040, 1560],
      [170, 1540],
    ];
    const [x, y] = positions[index % positions.length];
    drawShape(shape, x, y, 34 + index * 6, frame.accent);
  });
}

function drawStickerPack(frame) {
  const theme = frame.theme || "kawaii";
  const commonStickers = [
    { shape: "spark", x: 128, y: 128, size: 20, rotation: -0.2, fill: frame.palette[1], style: "free" },
    { shape: "heart", x: 1110, y: 126, size: 22, rotation: 0.16, fill: frame.palette[3], style: "free" },
    { shape: "star", x: 118, y: 1604, size: 18, rotation: 0.1, fill: frame.accent, style: "free" },
    { shape: "spark", x: 1100, y: 1620, size: 20, rotation: -0.12, fill: frame.palette[1], style: "free" },
  ];
  const stickerThemes = {
    kawaii: {
      duoStickers: [
        { shape: "heart", x: 566, y: 670, size: 36, rotation: -0.16, fill: frame.palette[1] },
        { shape: "spark", x: 598, y: 910, size: 32, rotation: 0.1, fill: frame.accent },
        { shape: "cloud", x: 602, y: 520, size: 30, rotation: -0.06, fill: frame.palette[2] },
        { shape: "heart", x: 604, y: 1270, size: 28, rotation: 0.08, fill: frame.palette[3] },
      ],
      stripStickers: [
        { shape: "heart", x: 500, y: 340, size: 34, rotation: -0.2, fill: frame.palette[1] },
        { shape: "spark", x: 1085, y: 430, size: 30, rotation: 0.18, fill: frame.accent },
        { shape: "star", x: 535, y: 785, size: 28, rotation: -0.12, fill: frame.palette[3] },
        { shape: "cloud", x: 1060, y: 880, size: 30, rotation: 0.1, fill: frame.palette[1] },
        { shape: "cloud", x: 495, y: 1180, size: 32, rotation: -0.08, fill: frame.palette[2] },
        { shape: "heart", x: 1080, y: 1455, size: 26, rotation: 0.14, fill: frame.accent },
        { shape: "star", x: 522, y: 1540, size: 22, rotation: -0.18, fill: frame.palette[1] },
        { shape: "spark", x: 1045, y: 1548, size: 24, rotation: 0.12, fill: frame.palette[3] },
      ],
      duoLabels: [
        ["idol mode", 334, 1514, -0.08, frame.palette[3], frame.accent, "soft"],
        ["cute shot", 866, 1512, 0.07, frame.palette[2], frame.accent, "soft"],
      ],
      stripLabels: [
        ["bestie mode", 210, 1510, -0.08, frame.palette[3], frame.accent, "soft"],
        ["flash!", 942, 1518, 0.07, frame.palette[2], frame.accent, "soft"],
      ],
    },
    anime: {
      duoStickers: [
        { shape: "burst", x: 562, y: 528, size: 30, rotation: -0.2, fill: frame.palette[1] },
        { shape: "star", x: 598, y: 760, size: 26, rotation: 0.14, fill: frame.accent },
        { shape: "petal", x: 606, y: 1022, size: 30, rotation: -0.06, fill: frame.palette[3] },
        { shape: "ticket", x: 606, y: 1278, size: 30, rotation: 0.09, fill: frame.palette[1] },
      ],
      stripStickers: [
        { shape: "burst", x: 500, y: 340, size: 30, rotation: -0.2, fill: frame.palette[1] },
        { shape: "spark", x: 1085, y: 430, size: 28, rotation: 0.18, fill: frame.accent },
        { shape: "star", x: 535, y: 785, size: 28, rotation: -0.12, fill: frame.palette[3] },
        { shape: "petal", x: 1060, y: 880, size: 28, rotation: 0.1, fill: frame.palette[1] },
        { shape: "ticket", x: 495, y: 1180, size: 30, rotation: -0.08, fill: frame.palette[2] },
        { shape: "spark", x: 1080, y: 1455, size: 24, rotation: 0.14, fill: frame.accent },
        { shape: "star", x: 522, y: 1540, size: 22, rotation: -0.18, fill: frame.palette[1] },
        { shape: "petal", x: 1045, y: 1548, size: 24, rotation: 0.12, fill: frame.palette[3] },
      ],
      duoLabels: [
        ["main char", 334, 1514, -0.08, frame.palette[3], frame.accent, "sharp"],
        ["scene cut", 866, 1512, 0.07, frame.palette[2], frame.accent, "sharp"],
      ],
      stripLabels: [
        ["hero frame", 210, 1510, -0.08, frame.palette[3], frame.accent, "sharp"],
        ["manga cut", 942, 1518, 0.07, frame.palette[2], frame.accent, "sharp"],
      ],
    },
    retro: {
      duoStickers: [
        { shape: "ticket", x: 566, y: 540, size: 34, rotation: -0.14, fill: frame.palette[1] },
        { shape: "dot", x: 600, y: 760, size: 24, rotation: 0.1, fill: frame.accent },
        { shape: "star", x: 604, y: 1008, size: 26, rotation: -0.08, fill: frame.palette[3] },
        { shape: "ticket", x: 604, y: 1268, size: 28, rotation: 0.07, fill: frame.palette[2] },
      ],
      stripStickers: [
        { shape: "ticket", x: 500, y: 340, size: 32, rotation: -0.2, fill: frame.palette[1] },
        { shape: "dot", x: 1085, y: 430, size: 24, rotation: 0.18, fill: frame.accent },
        { shape: "star", x: 535, y: 785, size: 28, rotation: -0.12, fill: frame.palette[3] },
        { shape: "ticket", x: 1060, y: 880, size: 28, rotation: 0.1, fill: frame.palette[1] },
        { shape: "dot", x: 495, y: 1180, size: 24, rotation: -0.08, fill: frame.palette[2] },
        { shape: "star", x: 1080, y: 1455, size: 24, rotation: 0.14, fill: frame.accent },
        { shape: "ticket", x: 522, y: 1540, size: 22, rotation: -0.18, fill: frame.palette[1] },
        { shape: "dot", x: 1045, y: 1548, size: 20, rotation: 0.12, fill: frame.palette[3] },
      ],
      duoLabels: [
        ["film roll", 334, 1514, -0.08, frame.palette[3], frame.accent, "retro"],
        ["flashback", 866, 1512, 0.07, frame.palette[2], frame.accent, "retro"],
      ],
      stripLabels: [
        ["cam roll", 210, 1510, -0.08, frame.palette[3], frame.accent, "retro"],
        ["night flash", 942, 1518, 0.07, frame.palette[2], frame.accent, "retro"],
      ],
    },
  };
  const themeSet = stickerThemes[theme] || stickerThemes.kawaii;

  commonStickers.forEach((sticker) => drawSticker(sticker, frame));

  if (state.layout === "duo") {
    themeSet.duoStickers.forEach((sticker) => drawSticker(sticker, frame));
    themeSet.duoLabels.forEach(([text, x, y, rotation, fill, textColor, style]) => {
      drawStickerLabel(text, x, y, rotation, fill, textColor, style);
    });
    return;
  }

  themeSet.stripStickers.forEach((sticker) => drawSticker(sticker, frame));
  themeSet.stripLabels.forEach(([text, x, y, rotation, fill, textColor, style]) => {
    drawStickerLabel(text, x, y, rotation, fill, textColor, style);
  });
}

function drawSticker(sticker, frame) {
  ctx.save();
  ctx.translate(sticker.x, sticker.y);
  ctx.rotate(sticker.rotation || 0);
  if (sticker.style === "free") {
    drawShape(sticker.shape, 0, 0, sticker.size, sticker.fill || frame.accent);
  } else {
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.strokeStyle = `${frame.accent}33`;
    ctx.lineWidth = 4;
    roundRect(ctx, -sticker.size, -sticker.size, sticker.size * 2, sticker.size * 2, 16, true, true);
    drawShape(sticker.shape, 0, 0, sticker.size * 0.52, sticker.fill || frame.accent);
  }
  ctx.restore();
}

function drawStickerLabel(text, x, y, rotation, fill, textColor, style = "soft") {
  const fontByStyle = {
    soft: "700 26px Trebuchet MS",
    sharp: "700 24px Georgia",
    retro: "700 24px Courier New",
  };

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  ctx.strokeStyle = `${textColor}30`;
  ctx.lineWidth = 3;
  roundRect(ctx, -110, -32, 220, 64, 22, true, true);
  ctx.fillStyle = fill;
  roundRect(ctx, -102, -24, 204, 48, style === "sharp" ? 10 : 18, true, false);
  ctx.fillStyle = textColor;
  ctx.font = fontByStyle[style] || fontByStyle.soft;
  ctx.textAlign = "center";
  ctx.fillText(text, 0, 10);
  ctx.textAlign = "left";
  ctx.restore();
}

function drawShape(shape, x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;

  if (shape === "heart") {
    ctx.beginPath();
    ctx.moveTo(0, size / 4);
    ctx.bezierCurveTo(size, -size / 2, size * 1.3, size / 2, 0, size);
    ctx.bezierCurveTo(-size * 1.3, size / 2, -size, -size / 2, 0, size / 4);
    ctx.fill();
  } else if (shape === "star") {
    drawStar(0, 0, 5, size / 2, size / 4);
    ctx.fill();
  } else if (shape === "spark") {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size / 4, -size / 4);
    ctx.lineTo(size, 0);
    ctx.lineTo(size / 4, size / 4);
    ctx.lineTo(0, size);
    ctx.lineTo(-size / 4, size / 4);
    ctx.lineTo(-size, 0);
    ctx.lineTo(-size / 4, -size / 4);
    ctx.closePath();
    ctx.fill();
  } else if (shape === "ticket") {
    roundRect(ctx, -size, -size * 0.6, size * 2, size * 1.2, 10, true, false);
  } else if (shape === "burst") {
    for (let i = 0; i < 12; i += 1) {
      ctx.rotate(Math.PI / 6);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -size);
      ctx.stroke();
    }
  } else if (shape === "dot") {
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.55, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === "cloud") {
    ctx.beginPath();
    ctx.arc(-size * 0.3, 0, size * 0.35, Math.PI * 0.5, Math.PI * 1.5);
    ctx.arc(size * 0.1, -size * 0.18, size * 0.42, Math.PI, Math.PI * 1.9);
    ctx.arc(size * 0.52, 0, size * 0.32, Math.PI * 1.5, Math.PI * 0.4, true);
    ctx.closePath();
    ctx.fill();
  } else if (shape === "petal") {
    for (let i = 0; i < 4; i += 1) {
      ctx.rotate(Math.PI / 2);
      ctx.beginPath();
      ctx.ellipse(0, size * 0.2, size * 0.28, size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
  let rotation = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i += 1) {
    x = cx + Math.cos(rotation) * outerRadius;
    y = cy + Math.sin(rotation) * outerRadius;
    ctx.lineTo(x, y);
    rotation += step;

    x = cx + Math.cos(rotation) * innerRadius;
    y = cy + Math.sin(rotation) * innerRadius;
    ctx.lineTo(x, y);
    rotation += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
}

function drawImageCover(source, x, y, w, h) {
  const image = source instanceof HTMLImageElement ? source : source.image;
  if (!image.complete) {
    image.onload = () => drawPoster();
    return;
  }

  const scale = Math.max(w / image.width, h / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const dx = x + (w - drawWidth) / 2;
  const dy = y + (h - drawHeight) / 2;

  ctx.save();
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.fillRect(x, y, w, h);
  roundRect(ctx, x, y, w, h, 18, false, false);
  ctx.clip();
  ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
  ctx.restore();
}

function drawVideoFrameCover(context, video, x, y, w, h, options = {}) {
  const { flipX = false } = options;
  const sourceWidth = video.videoWidth || video.clientWidth || w;
  const sourceHeight = video.videoHeight || video.clientHeight || h;
  const sourceRatio = sourceWidth / sourceHeight;
  const targetRatio = w / h;
  let sx = 0;
  let sy = 0;
  let sw = sourceWidth;
  let sh = sourceHeight;

  if (sourceRatio > targetRatio) {
    sw = sourceHeight * targetRatio;
    sx = (sourceWidth - sw) / 2;
  } else {
    sh = sourceWidth / targetRatio;
    sy = (sourceHeight - sh) / 2;
  }

  context.save();
  if (flipX) {
    context.translate(x + w, y);
    context.scale(-1, 1);
    context.drawImage(video, sx, sy, sw, sh, 0, 0, w, h);
  } else {
    context.drawImage(video, sx, sy, sw, sh, x, y, w, h);
  }
  context.restore();
}

function getActiveFilter() {
  return filterPresets.find((filter) => filter.id === state.filter)?.css || "none";
}

function applyCameraFilter() {
  const activeFilter = getActiveFilter();
  camera.style.filter = activeFilter;
  if (cameraPreviewMirror) {
    cameraPreviewMirror.style.filter = activeFilter;
  }
}

function wrapText(text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let i = 0; i < words.length; i += 1) {
    const testLine = `${line}${words[i]} `;
    const { width } = ctx.measureText(testLine);
    if (width > maxWidth && i > 0) {
      ctx.fillText(line.trim(), x, y);
      line = `${words[i]} `;
      y += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line.trim(), x, y);
}

function roundRect(context, x, y, width, height, radius, fill, stroke) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();

  if (fill) context.fill();
  if (stroke) context.stroke();
}

function downloadPoster() {
  drawPoster();
  const stripPreset = getActiveStripPreset();
  const { stripX, stripY, stripW, stripH } = getStripMetrics(stripPreset);
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = Math.round(stripW);
  exportCanvas.height = Math.round(stripH);
  const exportCtx = exportCanvas.getContext("2d");
  exportCtx.drawImage(
    posterCanvas,
    stripX,
    stripY,
    stripW,
    stripH,
    0,
    0,
    exportCanvas.width,
    exportCanvas.height
  );
  const link = document.createElement("a");
  link.href = exportCanvas.toDataURL("image/png");
  link.download = `starsnap-${state.selectedFrame.id}-${state.stripStyle}.png`;
  link.click();
  setStatusText("Strip PNG berhasil di-download.");
}

function setStatusText(message) {
  statusTexts.forEach((node) => {
    node.textContent = message;
  });
}

init();
// update camera filter
//photobooth
