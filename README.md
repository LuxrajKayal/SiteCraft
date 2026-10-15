# SiteCraft Studio — Interactive Drag-and-Drop Web Page Builder

SiteCraft Studio is a complete, zero-dependency visual website builder designed for users who don't know HTML or CSS, while also offering live **Pop-up Code Inspection & Tweaking** for HTML, CSS, and JavaScript.

---

## 📁 Project Structure

```text
sitecraft-studio-web-builder/
├── index.html                                  # Main modular application entry point
├── css/
│   └── style.css                               # Builder UI, Floating Pop-up & Modal styles
├── js/
│   ├── blocks.js                               # 13 Drag-and-Drop blocks & Starter Templates
│   └── app.js                                  # Canvas engine, Pop-up Menus & Live Code Inspector
├── standalone/
│   └── sitecraft-studio-singlefile.html        # All-in-one single-file version (HTML + CSS + JS combined)
└── README.md                                   # Documentation & quick-start guide
```

---

## 🚀 How to Run

1. **Unzip** `sitecraft-studio-web-builder.zip` to any folder on your computer.
2. Double-click **`index.html`** (or `standalone/sitecraft-studio-singlefile.html`) to open it directly in any modern browser (Chrome, Edge, Firefox, Safari). No Node.js or build step required!

---

## ✨ Key Features Included

### 1. Three Interactive Pop-up Menu Systems
- **Floating Element Pop-up Menu**: Click any block or element on the canvas to bring up the floating toolbar directly above it. Change **Text Color**, **Background Color**, **Font Size (`A-`/`A+`)**, **Bold (`B`)**, **Alignment**, **Corner Radius**, reorder/duplicate/delete blocks, or open the code inspector in 1 click.
- **Right-Click Context Pop-up Menu**: Right-click anywhere on the canvas to inspect element code, attach JS behaviors, insert a Pop-up Menu Bar or Pop-up Modal, duplicate/delete blocks, or view the builder's source code.
- **Draggable Pop-up Code Inspector & Tweaker Modal**: Click **⚡ Pop-up Inspector** in the top bar (or **🔍 Inspect HTML/CSS/JS** in the floating menu) to edit:
  - *Selected Element HTML*
  - *Selected Element CSS*
  - *Element JS / Pop-up Behavior*
  - *Full Page HTML*
  - *Builder App Source Code*

### 2. Interactive Pop-up Website Components
- **Pop-up Menu Bar**: Pre-built responsive navigation bar with an interactive dropdown pop-up menu.
- **Pop-up Modal**: Pre-built call-to-action section with an interactive modal dialog that works both on the canvas and in exported websites.

### 3. Visual Drag-and-Drop & Inline Editing
- Drag blocks from the Left Sidebar onto the canvas, or drag existing blocks to reorder them.
- **Double-click any text** on the canvas to edit it inline immediately.
- Switch between **Desktop**, **Tablet**, and **Mobile** viewports, toggle **Preview Mode**, and click **Export HTML** to download your finished website.
