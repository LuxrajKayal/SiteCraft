/* ==========================================================================
   SiteCraft Studio — Core Visual Builder, Pop-up Menus & Code Inspector
   (js/app.js)
   ========================================================================== */

let selectedBlock = null;
let selectedElement = null;
let customCssString = "/* Custom Page CSS — Edit here and click Apply */\n";
let customJsString = "// Custom Page JavaScript — Runs on export & preview\nconsole.log('SiteCraft page ready!');\n";
let activeDrawerTab = "html";
let activeModalTab = "el-html";
let draggedBlockType = null;
let draggedCanvasBlock = null;

document.addEventListener("DOMContentLoaded", () => {
  renderSidebarBlocks();
  loadStarterTemplate("landing");
  setupCanvasEvents();
  setupDraggableModal();
});

/* --------------------------------------------------------------------------
   Render Left Sidebar Palette
   -------------------------------------------------------------------------- */
function renderSidebarBlocks() {
  const popupGrid = document.getElementById("popupBlocksGrid");
  const coreGrid = document.getElementById("coreBlocksGrid");
  popupGrid.innerHTML = "";
  coreGrid.innerHTML = "";

  Object.entries(window.BLOCK_LIBRARY).forEach(([key, item]) => {
    const card = document.createElement("div");
    card.className = "block-card" + (item.category === "popup" ? " highlight-popup" : "");
    card.draggable = true;
    card.innerHTML = `
      <div class="block-icon">${item.icon}</div>
      <div class="block-title">${item.title}</div>
      <div class="block-sub">Drag or Click</div>
    `;
    card.addEventListener("dragstart", (e) => {
      draggedBlockType = key;
      e.dataTransfer.setData("text/plain", key);
    });
    card.addEventListener("click", () => {
      addBlockToCanvas(key);
      showToast(`Added ${item.title}`);
    });

    if (item.category === "popup") {
      popupGrid.appendChild(card);
    } else {
      coreGrid.appendChild(card);
    }
  });
}

/* --------------------------------------------------------------------------
   Add / Load / Manage Blocks on the Canvas
   -------------------------------------------------------------------------- */
function addBlockToCanvas(blockKey, insertBeforeNode = null) {
  const def = window.BLOCK_LIBRARY[blockKey];
  if (!def) return;

  const canvas = document.getElementById("canvasFrame");
  const emptyHint = canvas.querySelector(".empty-canvas-hint");
  if (emptyHint) emptyHint.remove();

  const wrapper = document.createElement("div");
  wrapper.className = "canvas-block";
  wrapper.dataset.blockType = blockKey;
  wrapper.dataset.blockTitle = def.title;
  wrapper.draggable = true;
  wrapper.innerHTML = def.html.trim();

  if (insertBeforeNode) {
    canvas.insertBefore(wrapper, insertBeforeNode);
  } else {
    canvas.appendChild(wrapper);
  }

  selectElement(wrapper.firstElementChild || wrapper, wrapper);
  refreshLayersList();
  syncCodeViews();
}

function loadStarterTemplate(templateName) {
  const canvas = document.getElementById("canvasFrame");
  canvas.innerHTML = "";
  const list = window.STARTER_TEMPLATES[templateName] || [];
  if (list.length === 0) {
    canvas.innerHTML = `<div class="empty-canvas-hint"><h3>Blank Canvas</h3><p style="margin-top:8px;">Click or drag any block from the Left Sidebar (or right-click here) to start building your website.</p></div>`;
    selectedBlock = null;
    selectedElement = null;
    hideFloatingMenu();
    refreshLayersList();
    syncCodeViews();
    return;
  }
  list.forEach((key) => addBlockToCanvas(key));
  showToast(`Loaded ${templateName.toUpperCase()} template`);
}

function clearCanvasAll() {
  if (!confirm("Clear all blocks from the canvas?")) return;
  loadStarterTemplate("blank");
}

/* --------------------------------------------------------------------------
   Canvas Click, Double-Click Inline Editing, Drag-and-Drop & Right-Click
   -------------------------------------------------------------------------- */
function setupCanvasEvents() {
  const canvas = document.getElementById("canvasFrame");
  const scrollArea = document.getElementById("canvasScrollArea");

  canvas.addEventListener("click", (e) => {
    if (document.body.classList.contains("preview-mode")) return;

    const block = e.target.closest(".canvas-block");
    if (!block) return;

    // Prevent navigation when clicking links in editor mode
    if (e.target.tagName === "A") {
      e.preventDefault();
    }

    const targetEl = e.target === block ? (block.firstElementChild || block) : e.target;
    selectElement(targetEl, block);
  });

  // Double-click any text element to edit inline
  canvas.addEventListener("dblclick", (e) => {
    if (document.body.classList.contains("preview-mode")) return;
    const target = e.target;
    if (target && target !== canvas && !target.classList.contains("canvas-block")) {
      target.contentEditable = "true";
      target.focus();
      showToast("Inline editing active — click outside when done");
      const finishEdit = () => {
        target.removeAttribute("contenteditable");
        target.removeEventListener("blur", finishEdit);
        syncInspectorInputs();
        syncCodeViews();
      };
      target.addEventListener("blur", finishEdit);
    }
  });

  // Right-click Context Pop-up Menu on Canvas
  canvas.addEventListener("contextmenu", (e) => {
    if (document.body.classList.contains("preview-mode")) return;
    e.preventDefault();
    const block = e.target.closest(".canvas-block");
    if (block) {
      const targetEl = e.target === block ? (block.firstElementChild || block) : e.target;
      selectElement(targetEl, block);
    }
    openContextMenu(e.clientX, e.clientY);
  });

  // Hide Context Menu when clicking elsewhere
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#contextPopupMenu")) {
      closeContextMenu();
    }
  });

  // Reposition floating menu on scroll/resize
  scrollArea.addEventListener("scroll", () => updateFloatingMenuPosition());
  window.addEventListener("resize", () => updateFloatingMenuPosition());

  // Drag and Drop reordering & palette drop
  canvas.addEventListener("dragstart", (e) => {
    const block = e.target.closest(".canvas-block");
    if (block) {
      draggedCanvasBlock = block;
      draggedBlockType = null;
    }
  });

  canvas.addEventListener("dragover", (e) => {
    e.preventDefault();
    const overBlock = e.target.closest(".canvas-block");
    canvas.querySelectorAll(".canvas-block").forEach((b) => b.classList.remove("drag-over"));
    if (overBlock && overBlock !== draggedCanvasBlock) {
      overBlock.classList.add("drag-over");
    }
  });

  canvas.addEventListener("dragleave", (e) => {
    const overBlock = e.target.closest(".canvas-block");
    if (overBlock) overBlock.classList.remove("drag-over");
  });

  canvas.addEventListener("drop", (e) => {
    e.preventDefault();
    canvas.querySelectorAll(".canvas-block").forEach((b) => b.classList.remove("drag-over"));
    const overBlock = e.target.closest(".canvas-block");

    if (draggedBlockType) {
      addBlockToCanvas(draggedBlockType, overBlock || null);
      draggedBlockType = null;
    } else if (draggedCanvasBlock) {
      if (overBlock && overBlock !== draggedCanvasBlock) {
        canvas.insertBefore(draggedCanvasBlock, overBlock);
      } else if (!overBlock) {
        canvas.appendChild(draggedCanvasBlock);
      }
      draggedCanvasBlock = null;
      refreshLayersList();
      syncCodeViews();
      updateFloatingMenuPosition();
    }
  });
}

/* --------------------------------------------------------------------------
   Select Element & Position Floating Pop-up Menu
   -------------------------------------------------------------------------- */
function selectElement(el, block) {
  document.querySelectorAll(".selected-element").forEach((node) => node.classList.remove("selected-element"));
  document.querySelectorAll(".selected-block").forEach((node) => node.classList.remove("selected-block"));

  selectedElement = el;
  selectedBlock = block || (el ? el.closest(".canvas-block") : null);

  if (selectedBlock) selectedBlock.classList.add("selected-block");
  if (selectedElement) selectedElement.classList.add("selected-element");

  updateFloatingMenuPosition();
  syncInspectorInputs();
  refreshLayersList();
  syncCodeViews();
}

function updateFloatingMenuPosition() {
  const menu = document.getElementById("floatingPopupMenu");
  if (!selectedElement || document.body.classList.contains("preview-mode")) {
    menu.classList.remove("visible");
    return;
  }

  const rect = selectedElement.getBoundingClientRect();
  menu.classList.add("visible");
  document.getElementById("fpTagLabel").textContent = `<${selectedElement.tagName.toLowerCase()}>`;

  const computed = window.getComputedStyle(selectedElement);
  document.getElementById("fpTextColor").value = rgbToHex(computed.color);
  document.getElementById("fpBgColor").value = rgbToHex(computed.backgroundColor);

  let top = rect.top - menu.offsetHeight - 10;
  if (top < 64) {
    top = rect.bottom + 10;
  }
  let left = Math.max(16, Math.min(rect.left, window.innerWidth - menu.offsetWidth - 16));

  menu.style.top = `${top}px`;
  menu.style.left = `${left}px`;
}

function hideFloatingMenu() {
  document.getElementById("floatingPopupMenu").classList.remove("visible");
}

/* --------------------------------------------------------------------------
   Quick Actions from Floating Pop-up Menu & Right-Click Menu
   -------------------------------------------------------------------------- */
function fpQuickStyle(prop, val) {
  if (!selectedElement) return;
  selectedElement.style[prop] = val;
  syncInspectorInputs();
  syncCodeViews();
}

function fpChangeFontSize(delta) {
  if (!selectedElement) return;
  const current = parseFloat(window.getComputedStyle(selectedElement).fontSize) || 16;
  selectedElement.style.fontSize = `${Math.max(10, current + delta)}px`;
  syncInspectorInputs();
  syncCodeViews();
}

function fpToggleBold() {
  if (!selectedElement) return;
  const w = window.getComputedStyle(selectedElement).fontWeight;
  selectedElement.style.fontWeight = (w === "700" || w === "800" || w === "bold") ? "400" : "700";
  syncInspectorInputs();
  syncCodeViews();
}

function fpCycleRadius() {
  if (!selectedElement) return;
  const radii = ["0px", "8px", "16px", "999px"];
  const cur = selectedElement.style.borderRadius || "0px";
  const next = radii[(radii.indexOf(cur) + 1) % radii.length];
  selectedElement.style.borderRadius = next;
  syncInspectorInputs();
  syncCodeViews();
}

function moveSelectedBlock(dir) {
  if (!selectedBlock) return;
  const parent = selectedBlock.parentNode;
  if (dir === -1 && selectedBlock.previousElementSibling) {
    parent.insertBefore(selectedBlock, selectedBlock.previousElementSibling);
  } else if (dir === 1 && selectedBlock.nextElementSibling) {
    parent.insertBefore(selectedBlock.nextElementSibling, selectedBlock);
  }
  updateFloatingMenuPosition();
  refreshLayersList();
  syncCodeViews();
}

function duplicateSelectedBlock() {
  if (!selectedBlock) return;
  const clone = selectedBlock.cloneNode(true);
  clone.classList.remove("selected-block");
  clone.querySelectorAll(".selected-element").forEach((n) => n.classList.remove("selected-element"));
  selectedBlock.parentNode.insertBefore(clone, selectedBlock.nextSibling);
  selectElement(clone.firstElementChild || clone, clone);
  showToast("Block duplicated");
}

function deleteSelectedBlock() {
  if (!selectedBlock) return;
  selectedBlock.remove();
  selectedBlock = null;
  selectedElement = null;
  hideFloatingMenu();
  refreshLayersList();
  syncCodeViews();
  showToast("Block deleted");
}

/* --------------------------------------------------------------------------
   Right-Click Context Pop-up Menu
   -------------------------------------------------------------------------- */
function openContextMenu(x, y) {
  const menu = document.getElementById("contextPopupMenu");
  menu.classList.add("visible");
  const maxX = window.innerWidth - menu.offsetWidth - 12;
  const maxY = window.innerHeight - menu.offsetHeight - 12;
  menu.style.left = `${Math.min(x, maxX)}px`;
  menu.style.top = `${Math.min(y, maxY)}px`;
}

function closeContextMenu() {
  document.getElementById("contextPopupMenu").classList.remove("visible");
}

/* --------------------------------------------------------------------------
   Right Sidebar Inspector Synchronization
   -------------------------------------------------------------------------- */
function syncInspectorInputs() {
  if (!selectedElement) return;
  const cs = window.getComputedStyle(selectedElement);

  document.getElementById("inspTagBadge").textContent = `<${selectedElement.tagName.toLowerCase()}>`;
  document.getElementById("inspTextContent").value = selectedElement.children.length === 0 ? selectedElement.textContent.trim() : "";
  document.getElementById("inspHref").value = selectedElement.getAttribute("href") || "";
  document.getElementById("inspSrc").value = selectedElement.getAttribute("src") || "";

  document.getElementById("inspTextColor").value = rgbToHex(cs.color);
  document.getElementById("inspBgColor").value = rgbToHex(cs.backgroundColor);
  document.getElementById("inspFontSize").value = parseInt(cs.fontSize, 10) || 16;
  document.getElementById("inspFontWeight").value = cs.fontWeight || "400";
  document.getElementById("inspTextAlign").value = cs.textAlign || "left";
  document.getElementById("inspPadding").value = parseInt(cs.paddingTop, 10) || 0;
  document.getElementById("inspRadius").value = parseInt(cs.borderRadius, 10) || 0;
  document.getElementById("inspOnclick").value = selectedElement.getAttribute("onclick") || "";
}

function applyInspectorChange() {
  if (!selectedElement) return;

  const txt = document.getElementById("inspTextContent").value;
  if (selectedElement.children.length === 0 && txt !== "") {
    selectedElement.textContent = txt;
  }

  const href = document.getElementById("inspHref").value.trim();
  if (href && selectedElement.tagName === "A") {
    selectedElement.setAttribute("href", href);
  }

  const src = document.getElementById("inspSrc").value.trim();
  if (src && selectedElement.tagName === "IMG") {
    selectedElement.setAttribute("src", src);
  }

  selectedElement.style.color = document.getElementById("inspTextColor").value;
  selectedElement.style.backgroundColor = document.getElementById("inspBgColor").value;
  selectedElement.style.fontSize = `${document.getElementById("inspFontSize").value}px`;
  selectedElement.style.fontWeight = document.getElementById("inspFontWeight").value;
  selectedElement.style.textAlign = document.getElementById("inspTextAlign").value;
  selectedElement.style.padding = `${document.getElementById("inspPadding").value}px`;
  selectedElement.style.borderRadius = `${document.getElementById("inspRadius").value}px`;

  updateFloatingMenuPosition();
  syncCodeViews();
}

function applyJsPreset(preset) {
  if (!selectedElement) {
    showToast("Select an element on the canvas first!");
    return;
  }
  const snippets = {
    alert: "alert('Hello from your custom interactive element! 🎉');",
    modal: "const m=document.querySelector('.sc-modal-backdrop'); if(m){m.style.display='flex';}else{alert('Pop-up triggered! Add a Pop-up Modal block from the left sidebar.');}",
    pulse: "this.style.transition='transform 0.25s'; this.style.transform=(this.style.transform==='scale(1.08)'?'scale(1)':'scale(1.08)');",
    scrollTop: "window.scrollTo({top:0,behavior:'smooth'});"
  };
  const code = snippets[preset] || "";
  selectedElement.setAttribute("onclick", code);
  document.getElementById("inspOnclick").value = code;
  syncCodeViews();
  showToast("Attached JavaScript click interaction!");
}

function saveCustomOnclick() {
  if (!selectedElement) return;
  const code = document.getElementById("inspOnclick").value.trim();
  if (code) {
    selectedElement.setAttribute("onclick", code);
  } else {
    selectedElement.removeAttribute("onclick");
  }
  syncCodeViews();
  showToast("Updated element onclick JS");
}

function testSelectedElementJs() {
  if (!selectedElement) return;
  const code = selectedElement.getAttribute("onclick");
  if (!code) {
    showToast("No onclick JS set on this element yet");
    return;
  }
  try {
    new Function(code).call(selectedElement);
  } catch (err) {
    alert("JS Error: " + err.message);
  }
}

/* --------------------------------------------------------------------------
   Layers Tree Panel
   -------------------------------------------------------------------------- */
function refreshLayersList() {
  const container = document.getElementById("layersListContainer");
  if (!container) return;
  container.innerHTML = "";
  const blocks = document.querySelectorAll("#canvasFrame .canvas-block");
  blocks.forEach((blk, idx) => {
    const item = document.createElement("div");
    item.className = "layer-item" + (blk === selectedBlock ? " active" : "");
    item.innerHTML = `
      <span>#${idx + 1} ${blk.dataset.blockTitle || blk.dataset.blockType || "Section"}</span>
      <div class="layer-actions">
        <button type="button" title="Move Up">↑</button>
        <button type="button" title="Move Down">↓</button>
      </div>
    `;
    item.addEventListener("click", () => selectElement(blk.firstElementChild || blk, blk));
    const [upBtn, downBtn] = item.querySelectorAll("button");
    upBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      selectElement(blk.firstElementChild || blk, blk);
      moveSelectedBlock(-1);
    });
    downBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      selectElement(blk.firstElementChild || blk, blk);
      moveSelectedBlock(1);
    });
    container.appendChild(item);
  });
}

/* --------------------------------------------------------------------------
   3. Centered Draggable Pop-up Code Inspector & Tweaker Modal
   -------------------------------------------------------------------------- */
function openPopupInspector(tab = "el-html") {
  const modal = document.getElementById("popupInspectorModal");
  modal.classList.add("visible");
  switchPopupModalTab(tab);
}

function closePopupInspector() {
  document.getElementById("popupInspectorModal").classList.remove("visible");
}

function switchPopupModalTab(tab) {
  activeModalTab = tab;
  document.querySelectorAll(".pim-tab").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.tab === tab);
  });
  syncCodeViews();
}

function applyPopupModalCode() {
  const editor = document.getElementById("popupCodeTextarea");
  const val = editor.value;

  if (activeModalTab === "el-html") {
    if (!selectedElement) return;
    const temp = document.createElement("div");
    temp.innerHTML = val.trim();
    const newEl = temp.firstElementChild;
    if (newEl && selectedElement.parentNode) {
      selectedElement.parentNode.replaceChild(newEl, selectedElement);
      selectElement(newEl, selectedBlock);
      showToast("Applied Element HTML changes!");
    }
  } else if (activeModalTab === "el-css") {
    if (!selectedElement) return;
    selectedElement.setAttribute("style", val.replace(/\n/g, " ").trim());
    syncInspectorInputs();
    updateFloatingMenuPosition();
    showToast("Applied Element inline CSS!");
  } else if (activeModalTab === "el-js") {
    if (!selectedElement) return;
    selectedElement.setAttribute("onclick", val.trim());
    syncInspectorInputs();
    showToast("Applied Element JavaScript!");
  } else if (activeModalTab === "page-html") {
    applyRawCanvasHtml(val);
    showToast("Updated Full Canvas HTML!");
  }
  syncCodeViews();
}

function setupDraggableModal() {
  const modal = document.getElementById("popupInspectorModal");
  const header = document.getElementById("pimDragHeader");
  let isDown = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "BUTTON") return;
    isDown = true;
    const rect = modal.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    modal.style.left = `${Math.max(10, e.clientX - offsetX)}px`;
    modal.style.top = `${Math.max(10, e.clientY - offsetY)}px`;
  });

  document.addEventListener("mouseup", () => {
    isDown = false;
  });
}

/* --------------------------------------------------------------------------
   Bottom Live Code Drawer & Two-Way Code Sync
   -------------------------------------------------------------------------- */
function toggleBottomDrawer() {
  const drawer = document.getElementById("bottomCodeDrawer");
  drawer.classList.toggle("open");
  syncCodeViews();
}

function switchDrawerTab(tab) {
  activeDrawerTab = tab;
  document.querySelectorAll(".drawer-tab").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === tab);
  });
  syncCodeViews();
}

function getCleanCanvasHtml() {
  const clone = document.getElementById("canvasFrame").cloneNode(true);
  clone.querySelectorAll(".selected-element").forEach((n) => n.classList.remove("selected-element"));
  clone.querySelectorAll(".selected-block").forEach((n) => n.classList.remove("selected-block"));
  let out = "";
  clone.querySelectorAll(".canvas-block").forEach((blk) => {
    out += blk.innerHTML.trim() + "\n\n";
  });
  return out.trim();
}

function getFullExportedHtml() {
  const bodyContent = getCleanCanvasHtml();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My SiteCraft Website</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #0f172a; background: #ffffff; }
    ${customCssString}
  </style>
</head>
<body>
${bodyContent}
  <script>
    ${customJsString}
  <\/script>
</body>
</html>`;
}

function getBuilderAppSourceCode() {
  return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
}

function syncCodeViews() {
  // Bottom drawer
  const drawerArea = document.getElementById("drawerCodeTextarea");
  if (drawerArea) {
    if (activeDrawerTab === "html") drawerArea.value = getCleanCanvasHtml();
    else if (activeDrawerTab === "css") drawerArea.value = customCssString;
    else if (activeDrawerTab === "js") drawerArea.value = customJsString;
    else if (activeDrawerTab === "export") drawerArea.value = getFullExportedHtml();
    else if (activeDrawerTab === "source") drawerArea.value = getBuilderAppSourceCode();
  }

  // Pop-up modal
  const modalArea = document.getElementById("popupCodeTextarea");
  if (modalArea && document.getElementById("popupInspectorModal").classList.contains("visible")) {
    if (activeModalTab === "el-html") {
      if (selectedElement) {
        const clone = selectedElement.cloneNode(true);
        clone.classList.remove("selected-element");
        modalArea.value = clone.outerHTML;
      } else {
        modalArea.value = "<!-- Select any element on the canvas to inspect its HTML -->";
      }
    } else if (activeModalTab === "el-css") {
      modalArea.value = selectedElement ? (selectedElement.getAttribute("style") || "").split(";").map(s => s.trim()).filter(Boolean).join(";\n") : "";
    } else if (activeModalTab === "el-js") {
      modalArea.value = selectedElement ? (selectedElement.getAttribute("onclick") || "// Example: alert('Clicked!')") : "";
    } else if (activeModalTab === "page-html") {
      modalArea.value = getCleanCanvasHtml();
    } else if (activeModalTab === "app-source") {
      modalArea.value = getBuilderAppSourceCode();
    }
  }
}

function applyRawCanvasHtml(rawHtml) {
  const canvas = document.getElementById("canvasFrame");
  const temp = document.createElement("div");
  temp.innerHTML = rawHtml;
  canvas.innerHTML = "";
  Array.from(temp.children).forEach((child) => {
    const wrapper = document.createElement("div");
    wrapper.className = "canvas-block";
    wrapper.dataset.blockTitle = child.tagName;
    wrapper.draggable = true;
    wrapper.appendChild(child);
    canvas.appendChild(wrapper);
  });
  refreshLayersList();
}

function applyDrawerCodeChanges() {
  const val = document.getElementById("drawerCodeTextarea").value;
  if (activeDrawerTab === "html") {
    applyRawCanvasHtml(val);
    showToast("Synced HTML to Visual Canvas!");
  } else if (activeDrawerTab === "css") {
    customCssString = val;
    let styleTag = document.getElementById("customUserStyleTag");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "customUserStyleTag";
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = customCssString;
    showToast("Applied Custom Page CSS!");
  } else if (activeDrawerTab === "js") {
    customJsString = val;
    try {
      new Function(customJsString)();
      showToast("Executed Custom Page JS!");
    } catch (e) {
      alert("JS Error: " + e.message);
    }
  }
}

/* --------------------------------------------------------------------------
   UI Helpers (Tabs, Viewport, Preview, Export, Color Conversion)
   -------------------------------------------------------------------------- */
function switchLeftTab(tabName) {
  document.getElementById("leftTabBlocks").style.display = tabName === "blocks" ? "block" : "none";
  document.getElementById("leftTabLayers").style.display = tabName === "layers" ? "block" : "none";
  document.getElementById("tabBtnBlocks").classList.toggle("active", tabName === "blocks");
  document.getElementById("tabBtnLayers").classList.toggle("active", tabName === "layers");
}

function switchRightTab(tabName) {
  document.getElementById("rightTabStyle").style.display = tabName === "style" ? "block" : "none";
  document.getElementById("rightTabJs").style.display = tabName === "js" ? "block" : "none";
  document.getElementById("tabBtnStyle").classList.toggle("active", tabName === "style");
  document.getElementById("tabBtnJs").classList.toggle("active", tabName === "js");
}

function setViewport(mode, btn) {
  const frame = document.getElementById("canvasFrame");
  frame.classList.remove("vp-tablet", "vp-mobile");
  if (mode === "tablet") frame.classList.add("vp-tablet");
  if (mode === "mobile") frame.classList.add("vp-mobile");
  document.querySelectorAll(".vp-btn").forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  setTimeout(updateFloatingMenuPosition, 260);
}

function togglePreviewMode() {
  document.body.classList.toggle("preview-mode");
  const isPrev = document.body.classList.contains("preview-mode");
  document.getElementById("previewBtn").textContent = isPrev ? "✏️ Exit Preview" : "👁️ Preview";
  showToast(isPrev ? "Preview Mode enabled — test your page interactively" : "Returned to Visual Editor");
}

function downloadExportedWebsite() {
  const html = getFullExportedHtml();
  const blob = new Blob([html], { type: "text/html" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "my-website.html";
  a.click();
  showToast("Downloaded my-website.html!");
}

function copyActivePopupCode() {
  const area = document.getElementById("popupCodeTextarea");
  navigator.clipboard.writeText(area.value);
  showToast("Copied code to clipboard!");
}

function rgbToHex(rgb) {
  if (!rgb || rgb === "transparent" || rgb === "rgba(0, 0, 0, 0)") return "#ffffff";
  const m = rgb.match(/\d+/g);
  if (!m || m.length < 3) return "#000000";
  return "#" + m.slice(0, 3).map((x) => parseInt(x, 10).toString(16).padStart(2, "0")).join("");
}

function showToast(msg) {
  const t = document.getElementById("toastBox");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}
