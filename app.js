const framePresets = [
  {
    id: "kawaii-pop",
    name: "Kawaii Pop",
    theme: "kawaii",
    desc: "pink, sticker, super cute",
    palette: ["#fff1f5", "#ff7ea8", "#ffc3d5", "#fff9c9"],
    accent: "#ff4f85",
    stamp: ["heart", "star", "spark"],
  },
  {
    id: "blue-idol",
    name: "Blue Idol",
    theme: "anime",
    desc: "cool stage, dreamy, glossy",
    palette: ["#edf6ff", "#4b8bff", "#a9d0ff", "#d9f0ff"],
    accent: "#2d5db3",
    stamp: ["spark", "ticket", "star"],
  },
  {
    id: "manga-burst",
    name: "Manga Burst",
    theme: "anime",
    desc: "comic vibe, loud and fun",
    palette: ["#fff9e8", "#ffae00", "#ffd86a", "#fff2bf"],
    accent: "#d87900",
    stamp: ["burst", "star", "dot"],
  },
  {
    id: "midnight-neon",
    name: "Midnight Neon",
    theme: "retro",
    desc: "dark pop, neon club energy",
    palette: ["#151824", "#7d7cff", "#2ee7d6", "#0e1220"],
    accent: "#2ee7d6",
    stamp: ["spark", "star", "ticket"],
  },
  {
    id: "cloudy-love",
    name: "Cloudy Love",
    theme: "kawaii",
    desc: "soft clouds, ribbon, pastel",
    palette: ["#f8f4ff", "#a890ff", "#ffd8ea", "#eef3ff"],
    accent: "#8b6df2",
    stamp: ["cloud", "heart", "spark"],
  },
  {
    id: "retro-arcade",
    name: "Retro Arcade",
    theme: "retro",
    desc: "pixel-ish, fun and bright",
    palette: ["#fff6f1", "#ff6b6b", "#4bffb4", "#ffe773"],
    accent: "#2b2b2b",
    stamp: ["ticket", "star", "dot"],
  },
  {
    id: "sakura-night",
    name: "Sakura Night",
    theme: "anime",
    desc: "anime romance, cool petals",
    palette: ["#fff5fa", "#ff89b7", "#29345b", "#ffe1ef"],
    accent: "#29345b",
    stamp: ["petal", "spark", "heart"],
  },
  {
    id: "chrome-wave",
    name: "Chrome Wave",
    theme: "retro",
    desc: "silver cool, futuristic idol",
    palette: ["#f5f7fb", "#8b98b8", "#dfe7f7", "#a3d5ff"],
    accent: "#54627e",
    stamp: ["spark", "burst", "ticket"],
  },
];

const state = {
  selectedFrame: framePresets[0],
  shots: [],
  partnerImage: null,
  layout: "duo",
  filter: "none",
  stripStyle: "classic",
  stream: null,
};

const filterPresets = [
  { id: "none", name: "Original", css: "none" },
  { id: "soft", name: "Soft Glow", css: "brightness(1.04) saturate(1.05) contrast(0.94)" },
  { id: "warm", name: "Warm Pop", css: "sepia(0.18) saturate(1.18) hue-rotate(-8deg) brightness(1.02)" },
  { id: "cool", name: "Cool Blue", css: "saturate(0.95) contrast(1.08) hue-rotate(10deg)" },
  { id: "mono", name: "Mono Film", css: "grayscale(1) contrast(1.12) brightness(1.04)" },
  { id: "dreamy", name: "Dreamy", css: "brightness(1.08) saturate(0.9) contrast(0.92) blur(0.4px)" },
];
const stripPresets = [
  { id: "korean", name: "Korean 4", desc: "slim clean booth strip", shots: 4, stripW: 320, topPad: 58, bottomPad: 112, gap: 14, radius: 18 },
  { id: "classic", name: "Classic 4", desc: "4 frame tall strip", shots: 4, stripW: 360, topPad: 74, bottomPad: 106, gap: 18, radius: 26 },
  { id: "airy", name: "Airy 3", desc: "3 frame lebih lega", shots: 3, stripW: 410, topPad: 82, bottomPad: 116, gap: 26, radius: 28 },
  { id: "mini", name: "Mini 2", desc: "2 frame besar", shots: 2, stripW: 450, topPad: 92, bottomPad: 122, gap: 30, radius: 30 },
];

const camera = document.getElementById("camera");
const startCameraBtn = document.getElementById("startCameraBtn");
const captureBtn = document.getElementById("captureBtn");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");
const partnerUpload = document.getElementById("partnerUpload");
const frameGrid = document.getElementById("frameGrid");
const filterGrid = document.getElementById("filterGrid");
const stripGrid = document.getElementById("stripGrid");
const shotTray = document.getElementById("shotTray");
const shotCounter = document.getElementById("shotCounter");
const statusText = document.getElementById("statusText");
const startEditingBtn = document.getElementById("startEditingBtn");
const workspaceShell = document.getElementById("workspaceShell");
const posterCanvas = document.getElementById("posterCanvas");
const ctx = posterCanvas.getContext("2d");

function init() {
  renderFrameOptions();
  renderFilterOptions();
  renderStripOptions();
  bindEvents();
  syncShotState();
  renderShotTray();
  drawPoster();
}

function bindEvents() {
  startCameraBtn.addEventListener("click", startCamera);
  captureBtn.addEventListener("click", captureShot);
  resetBtn.addEventListener("click", resetShots);
  downloadBtn.addEventListener("click", downloadPoster);
  partnerUpload.addEventListener("change", handlePartnerUpload);
  startEditingBtn?.addEventListener("click", () => {
    workspaceShell?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelectorAll(".layout-btn").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".layout-btn").forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      state.layout = button.dataset.layout;
      syncShotState();
      renderStripOptions();
      renderShotTray();
      statusText.textContent = `Layout diganti ke ${button.textContent}.`;
      drawPoster();
    });
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

function captureShot() {
  if (!camera.videoWidth || !camera.videoHeight) {
    statusText.textContent = "Nyalakan kamera dulu sebelum ambil foto.";
    return;
  }

  const shotLimit = getShotLimit();
  if (state.shots.length >= shotLimit) {
    statusText.textContent = `Maksimal ${shotLimit} shot. Reset kalau mau ambil ulang.`;
    return;
  }

  const captureCanvas = document.createElement("canvas");
  captureCanvas.width = 800;
  captureCanvas.height = 1000;
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

function renderStripOptions() {
  stripGrid.parentElement.style.display = state.layout === "strip" ? "block" : "none";
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

function getShotLimit() {
  return state.layout === "strip" ? getActiveStripPreset().shots : 4;
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

function drawPoster() {
  const frame = state.selectedFrame;
  const [bg, main, soft, detail] = frame.palette;

  ctx.clearRect(0, 0, posterCanvas.width, posterCanvas.height);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, posterCanvas.width, posterCanvas.height);

  const gradient = ctx.createLinearGradient(0, 0, posterCanvas.width, posterCanvas.height);
  gradient.addColorStop(0, `${main}22`);
  gradient.addColorStop(1, `${detail}66`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, posterCanvas.width, posterCanvas.height);

  drawBackdrop(frame);
  drawHeader(frame);

  if (state.layout === "duo") {
    drawDuoLayout(frame);
  } else {
    drawStripLayout(frame);
  }

  drawFooter(frame);
  drawStamps(frame);
  drawStickerPack(frame);
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
  const stripY = 220;
  const stripW = stripPreset.stripW;
  const stripH = 1420;
  const stripX = (posterCanvas.width - stripW) / 2;
  const innerX = stripX + 30;
  const innerY = stripY + stripPreset.topPad;
  const innerW = stripW - 60;
  const footerH = stripPreset.bottomPad;
  const shotCount = stripPreset.shots;
  const slotGap = stripPreset.gap;
  const slotH = (stripH - stripPreset.topPad - footerH - slotGap * (shotCount - 1)) / shotCount;
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

  ctx.save();
  ctx.fillStyle = "#5f5754";
  ctx.font = stripPreset.id === "korean" ? "700 20px Arial" : "700 24px Trebuchet MS";
  ctx.textAlign = "center";
  ctx.fillText(stripPreset.id === "korean" ? "StarSnap Seoul" : "StarSnap Studio", stripX + stripW / 2, stripY + stripH - 52);
  ctx.font = stripPreset.id === "korean" ? "15px Arial" : "18px Trebuchet MS";
  ctx.fillText(timestamp, stripX + stripW / 2, stripY + stripH - 26);
  if (stripPreset.id === "korean") {
    ctx.font = "14px Arial";
    ctx.fillStyle = "#8a8080";
    ctx.fillText("photo memory booth", stripX + stripW / 2, stripY + 34);
  }
  ctx.textAlign = "left";
  ctx.restore();
}

function drawStripShell(x, y, w, h, frame, stripPreset) {
  const theme = frame.theme || "kawaii";
  const accent = frame.palette[1];
  const isKorean = stripPreset.id === "korean";

  ctx.save();
  ctx.fillStyle = isKorean ? "#fffefe" : "#fffdfb";
  roundRect(ctx, x, y, w, h, isKorean ? 24 : 36, true, false);
  ctx.lineWidth = isKorean ? 2 : 4;
  ctx.strokeStyle = isKorean ? "rgba(40, 32, 32, 0.10)" : `${frame.accent}30`;
  roundRect(ctx, x, y, w, h, isKorean ? 24 : 36, false, true);

  if (isKorean) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.025)";
    roundRect(ctx, x + 16, y + 16, w - 32, h - 32, 18, true, false);
    ctx.restore();
    return;
  }

  if (theme === "kawaii") {
    ctx.fillStyle = `${accent}10`;
    roundRect(ctx, x + 18, y + 18, w - 36, h - 36, 30, true, false);
  } else if (theme === "anime") {
    ctx.lineWidth = 5;
    ctx.strokeStyle = `${accent}75`;
    ctx.beginPath();
    ctx.moveTo(x + 24, y + 22);
    ctx.lineTo(x + 136, y + 22);
    ctx.moveTo(x + 24, y + 22);
    ctx.lineTo(x + 24, y + 132);
    ctx.moveTo(x + w - 24, y + h - 22);
    ctx.lineTo(x + w - 136, y + h - 22);
    ctx.moveTo(x + w - 24, y + h - 22);
    ctx.lineTo(x + w - 24, y + h - 132);
    ctx.stroke();
  } else if (theme === "retro") {
    ctx.setLineDash([12, 12]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = `${accent}88`;
    roundRect(ctx, x + 18, y + 18, w - 36, h - 36, 30, false, true);
    ctx.setLineDash([]);
  }

  ctx.fillStyle = `${accent}14`;
  roundRect(ctx, x + 24, y + 24, w - 48, stripPreset.topPad - 24, 24, true, false);
  ctx.restore();
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
  const link = document.createElement("a");
  link.href = posterCanvas.toDataURL("image/png");
  link.download = `starsnap-${state.selectedFrame.id}.png`;
  link.click();
  statusText.textContent = "Poster PNG berhasil di-download.";
}

init();
