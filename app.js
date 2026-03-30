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
];

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

const stripBackgroundAssets = {
  kiss: loadSticker("./assets/latar/kiss.jpg"),
  kotakMerah: loadSticker("./assets/latar/latar kotak merah.jpg"),
  pelangi: loadSticker("./assets/latar/latar pelangi.png"),
  macanTutul: loadSticker("./assets/latar/macan tutul.jpg"),
  pelangiBintang: loadSticker("./assets/latar/pelangi bintang.jpg"),
  zebra: loadSticker("./assets/latar/zebra.jpg"),
};

const filterPresets = [
  { id: "none", name: "Original", css: "none" },
  { id: "soft", name: "Soft Glow", css: "brightness(1.04) saturate(1.05) contrast(0.94)" },
  { id: "warm", name: "Warm Pop", css: "sepia(0.18) saturate(1.18) hue-rotate(-8deg) brightness(1.02)" },
  { id: "cool", name: "Cool Blue", css: "saturate(0.95) contrast(1.08) hue-rotate(10deg)" },
  { id: "mono", name: "Mono Film", css: "grayscale(1) contrast(1.12) brightness(1.04)" },
  { id: "dreamy", name: "Dreamy", css: "brightness(1.08) saturate(0.9) contrast(0.92) blur(0.4px)" },
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
const stripPresets = [
  { id: "korean", name: "Korean 4", desc: "slim clean booth strip", shots: 4, stripW: 500, topPad: 64, bottomPad: 132, gap: 18, radius: 22, photoAspect: 0.76 },
  { id: "classic", name: "Classic 4", desc: "4 frame tall strip", shots: 4, stripW: 540, topPad: 78, bottomPad: 132, gap: 22, radius: 28, photoAspect: 0.76 },
  { id: "airy", name: "Airy 3", desc: "3 frame lebih lega", shots: 3, stripW: 590, topPad: 88, bottomPad: 138, gap: 28, radius: 30, photoAspect: 0.76 },
  { id: "mini", name: "Mini 2", desc: "2 frame besar", shots: 2, stripW: 450, topPad: 92, bottomPad: 122, gap: 30, radius: 30, photoAspect: 1.38 },
];

const camera = document.getElementById("camera");
const startCameraBtn = document.getElementById("startCameraBtn");
const captureBtn = document.getElementById("captureBtn");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");
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
const timerLabel = document.getElementById("timerLabel");
const activeStripName = document.getElementById("activeStripName");
const selectedStripTitle = document.getElementById("selectedStripTitle");
const selectedStripPreview = document.getElementById("selectedStripPreview");
const cameraStripTitle = document.getElementById("cameraStripTitle");
const cameraStripPreview = document.getElementById("cameraStripPreview");
const countdownOverlay = document.getElementById("countdownOverlay");
const previewEmptyState = document.getElementById("previewEmptyState");
const landingScreen = document.getElementById("landingScreen");
const layoutScreen = document.getElementById("layoutScreen");
const cameraScreen = document.getElementById("cameraScreen");
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
  drawPoster();
}

function loadSticker(src) {
  const image = new Image();
  image.src = src;
  image.onload = () => {
    if (state.currentScreen === "camera") {
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
  partnerUpload.addEventListener("change", handlePartnerUpload);
  startEditingBtn?.addEventListener("click", () => {
    state.currentScreen = "layout";
    updateScreen();
  });
  continueToCameraBtn?.addEventListener("click", () => {
    state.currentScreen = "camera";
    updateScreen();
    statusText.textContent = `Strip ${getActiveStripPreset().name} siap. Nyalakan kamera untuk mulai.`;
  });
  backToLandingBtn?.addEventListener("click", () => {
    state.currentScreen = "landing";
    updateScreen();
  });
  backToLayoutBtn?.addEventListener("click", () => {
    state.currentScreen = "layout";
    updateScreen();
  });
}

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    statusText.textContent = "Browser ini tidak mendukung akses kamera.";
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
    camera.style.transform = "scaleX(-1)";
    statusText.textContent = "Kamera aktif. Ambil pose pertama kapan saja.";
  } catch (error) {
    statusText.textContent = "Izin kamera ditolak atau kamera tidak tersedia.";
  }
}

async function captureShot() {
  if (state.isCountingDown) {
    return;
  }

  if (!camera.videoWidth || !camera.videoHeight) {
    statusText.textContent = "Nyalakan kamera dulu sebelum ambil foto.";
    return;
  }

  const shotLimit = getShotLimit();
  if (state.shots.length >= shotLimit) {
    statusText.textContent = `Maksimal ${shotLimit} shot. Reset kalau mau ambil ulang.`;
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
  const captureHeight = activeStrip.shots === 3 || activeStrip.shots === 4
    ? Math.round(captureWidth * (9 / 16))
    : Math.round(captureWidth * (slotH / innerW));
  captureCanvas.width = captureWidth;
  captureCanvas.height = captureHeight;
  const captureCtx = captureCanvas.getContext("2d");
  captureCtx.drawImage(camera, 0, 0, captureCanvas.width, captureCanvas.height);

  const src = captureCanvas.toDataURL("image/png");
  const image = new Image();
  image.src = src;
  state.shots.push({ src, image });
  renderShotTray();
  drawPoster();
  statusText.textContent = `Shot ${state.shots.length} tersimpan.`;
}

function resetShots() {
  state.shots = [];
  renderShotTray();
  drawPoster();
  statusText.textContent = "Semua shot di-reset.";
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
      statusText.textContent = `Partner image "${file.name}" sudah dipasang.`;
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
      statusText.textContent = `Frame aktif: ${frame.name}.`;
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
      drawPoster();
      statusText.textContent = `Filter aktif: ${filter.name}.`;
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
      statusText.textContent = `Warna strip aktif: ${color.name}.`;
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
      statusText.textContent = seconds === 0 ? "Timer dimatikan." : `Timer aktif ${seconds} detik.`;
    });
    timerGrid.appendChild(button);
  });
}

function renderStripOptions() {
  stripGrid.innerHTML = "";

  stripPresets.forEach((strip) => {
    const button = document.createElement("button");
    button.className = `layout-card${strip.id === state.stripStyle ? " active" : ""}`;
    button.innerHTML = `
      <div class="layout-card-preview">
        ${renderStripPreviewMarkup(strip)}
      </div>
      <h3>${strip.name}</h3>
      <p>${strip.shots} pose . ${strip.desc}</p>
    `;
    button.addEventListener("click", () => {
      state.stripStyle = strip.id;
      syncShotState();
      renderStripOptions();
      renderShotTray();
      updateActiveStrip();
      updateCameraAspect();
      drawPoster();
      statusText.textContent = `Strip aktif: ${strip.name}.`;
    });
    stripGrid.appendChild(button);
  });
}

function renderStripPreviewMarkup(strip) {
  const toneClass = strip.id === "korean" ? "soft" : strip.id === "mini" ? "dark" : strip.id === "airy" ? "hero" : "";
  return Array.from({ length: strip.shots }, (_, index) => {
    const extraClass = index === 0 && strip.id !== "classic" ? ` ${toneClass}` : "";
    return `<span class="layout-mini-slot${extraClass}"></span>`;
  }).join("");
}

function getActiveStripPreset() {
  return stripPresets.find((strip) => strip.id === state.stripStyle) || stripPresets[0];
}

function getActiveStripColor() {
  return stripColorPresets.find((color) => color.id === state.stripColor) || stripColorPresets[0];
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
  updateActiveStrip();
  updatePreviewVisibility();
}

function updateActiveStrip() {
  const activeStrip = getActiveStripPreset();
  const previewMarkup = renderStripPreviewMarkup(activeStrip);

  activeStripName.textContent = activeStrip.name;
  selectedStripTitle.textContent = activeStrip.name;
  cameraStripTitle.textContent = activeStrip.name;
  selectedStripPreview.innerHTML = previewMarkup;
  cameraStripPreview.innerHTML = previewMarkup;
  updateCameraAspect();
}

function updateCameraAspect() {
  const stripPreset = getActiveStripPreset();
  if (stripPreset.shots === 3 || stripPreset.shots === 4) {
    camera.style.aspectRatio = "16 / 9";
    return;
  }
  const { innerW, slotH } = getStripMetrics(stripPreset);
  camera.style.aspectRatio = `${Math.max(1, Math.round(innerW))} / ${Math.max(1, Math.round(slotH))}`;
}

function updatePreviewVisibility() {
  const shouldShowCanvas = state.currentScreen === "camera" && (state.shots.length > 0 || Boolean(state.partnerImage));
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

  if (state.currentScreen !== "camera" || (!state.shots.length && !state.partnerImage)) {
    return;
  }

  ctx.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
  drawStripLayout(state.selectedFrame);
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
  const { stripX, stripY, stripW, stripH, innerX, innerY, innerW, slotH, shotCount, slotGap } = metrics;
  const timestamp = new Date().toLocaleString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  drawStripShell(stripX, stripY, stripW, stripH, frame, stripPreset);

  for (let i = 0; i < shotCount; i += 1) {
    drawMediaFrame(innerX, innerY + i * (slotH + slotGap), innerW, slotH, state.shots[i], frame, `POSE 0${i + 1}`, stripPreset.radius);
  }

  drawStripThemeDecor(stripX, stripY, stripW, stripH, frame, metrics);

  ctx.save();
  ctx.textAlign = "center";
  if (frame.id !== "about-you") {
    ctx.fillStyle = frame.accent;
    ctx.font = "700 20px Arial";
    ctx.fillText(frame.name, stripX + stripW / 2, stripY + stripH - 54);
    ctx.fillStyle = "#7d6a67";
    ctx.font = "15px Arial";
    ctx.fillText(timestamp, stripX + stripW / 2, stripY + stripH - 26);
    ctx.font = "13px Arial";
    ctx.fillText("StarSnap booth", stripX + stripW / 2, stripY + 34);
  }
  ctx.textAlign = "left";
  ctx.restore();
}

function getStripMetrics(stripPreset) {
  const stripW = stripPreset.stripW;
  const innerW = stripW - 60;
  const shotCount = stripPreset.shots;
  const slotGap = stripPreset.gap;
  const slotH = innerW * (stripPreset.photoAspect || 1.3);
  const photoAreaHeight = shotCount * slotH + slotGap * (shotCount - 1);
  const extraBottomPad = state.selectedFrame.id === "about-you" ? 74 : 0;
  const bottomPad = stripPreset.bottomPad + extraBottomPad;
  const stripH = stripPreset.topPad + bottomPad + photoAreaHeight;
  const stripX = (posterCanvas.width - stripW) / 2;
  const stripY = Math.max(48, (posterCanvas.height - stripH) / 2);
  const innerX = stripX + 30;
  const innerY = stripY + stripPreset.topPad;

  return { stripX, stripY, stripW, stripH, innerX, innerY, innerW, slotH, shotCount, slotGap, bottomPad };
}

function drawStripShell(x, y, w, h, frame, stripPreset) {
  const stripColor = getActiveStripColor();

  ctx.save();
  ctx.fillStyle = stripColor.base;
  roundRect(ctx, x, y, w, h, 18, true, false);
  if (stripColor.decorate === "rainbow-stars") {
    ctx.save();
    roundRect(ctx, x, y, w, h, 18, false, false);
    ctx.clip();
    drawRainbowStarBackdrop(x, y, w, h);
    ctx.restore();
  }
  if (stripColor.image?.complete && stripColor.image.naturalWidth) {
    ctx.save();
    roundRect(ctx, x, y, w, h, 18, false, false);
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
  roundRect(ctx, x, y, w, h, 18, false, true);
  ctx.fillStyle = stripColor.inner;
  roundRect(ctx, x + 12, y + 12, w - 24, h - 24, 14, true, false);
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
  const themeDecor = {
    shinchan: () => {
      drawStickerLabel("mood on", x + w / 2, y + 86, -0.04, frame.palette[2], frame.accent, "soft");
      drawShape("burst", x + 38, y + 94, 18, frame.accent);
      drawShape("star", x + w - 34, y + h - 114, 16, frame.accent);
    },
    "cat-club": () => {
      drawStickerLabel("meow", x + w / 2, y + 84, -0.04, frame.palette[2], frame.accent, "soft");
      drawShape("heart", x + 40, y + 100, 14, frame.accent);
      drawShape("dot", x + w - 38, y + h - 118, 10, frame.accent);
    },
    "flower-note": () => {
      drawStickerLabel("bloom", x + w / 2, y + 84, -0.04, frame.palette[2], frame.accent, "soft");
      drawShape("petal", x + 40, y + 100, 16, frame.accent);
      drawShape("petal", x + w - 36, y + h - 118, 14, frame.accent);
    },
    "butterfly-air": () => {
      drawStickerLabel("flutter", x + w / 2, y + 84, -0.04, frame.palette[2], frame.accent, "sharp");
      drawShape("spark", x + 38, y + 98, 14, frame.accent);
      drawShape("star", x + w - 36, y + h - 118, 12, frame.accent);
    },
    "about-you": () => {
      drawAboutYouStickerPack(metrics);
    },
    "kitty-pop": () => {
      drawStickerLabel("sweet pop", x + w / 2, y + 84, -0.04, frame.palette[2], frame.accent, "soft");
      drawShape("heart", x + 40, y + 100, 14, frame.accent);
      drawShape("cloud", x + w - 38, y + h - 120, 12, frame.accent);
    },
  };

  themeDecor[frame.id]?.();
}

function drawAboutYouStickerPack(metrics) {
  const { stripX, stripY, stripW, stripH, innerX, innerY, innerW, slotH, shotCount, slotGap, bottomPad } = metrics;
  const slotTopAt = (index) => innerY + Math.min(index, shotCount - 1) * (slotH + slotGap);
  const firstSlotTop = slotTopAt(0);
  const secondSlotTop = slotTopAt(1);
  const thirdSlotTop = slotTopAt(2);
  const footerCenterY = stripY + stripH - bottomPad * 0.48;
  const leftX = innerX + innerW * 0.16;
  const rightX = innerX + innerW * 0.82;
  const centerRightX = innerX + innerW * 0.73;
  const titleX = stripX + stripW * 0.58;
  const clapperBox = Math.min(innerW * 0.6, slotH * 0.34);
  const carMaxWidth = innerW * 0.92;
  const carMaxHeight = slotH * 0.34;
  const footerMaxWidth = innerW * 0.76;
  const footerMaxHeight = slotH * 0.3;
  const titleBox = Math.min(stripW * 1.5, bottomPad * 2.7);
  const footerStickerMaxWidth = innerW * 0.9;
  const footerStickerMaxHeight = slotH * 0.38;

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
    carMaxWidth,
    carMaxHeight,
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
    bottomPad * 1.02,
    -0.02
  );
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
  ctx.save();
  ctx.fillStyle = "white";
  roundRect(ctx, x, y, w, h, radius, true, false);
  ctx.fillStyle = isKoreanStrip ? "rgba(0, 0, 0, 0.03)" : `${frame.palette[2]}55`;
  roundRect(ctx, x + 14, y + 14, w - 28, h - 28, Math.max(radius - 8, 14), true, false);

  if (source) {
    drawImageCover(source, x + 24, y + 24, w - 48, h - 48);
  } else {
    drawPlaceholder(x + 24, y + 24, w - 48, h - 48, label, frame);
  }

  ctx.fillStyle = isKoreanStrip ? "#6c6363" : frame.accent;
  ctx.font = isKoreanStrip ? "700 18px Arial" : theme === "retro" ? "700 22px Courier New" : "700 24px Trebuchet MS";
  ctx.fillText(label, x + 28, y + h - 24);
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
  ctx.filter = getActiveFilter();
  ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
  ctx.filter = "none";
  ctx.restore();
}

function getActiveFilter() {
  return filterPresets.find((filter) => filter.id === state.filter)?.css || "none";
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
  statusText.textContent = "Strip PNG berhasil di-download.";
}

init();
