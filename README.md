# 🖌️ Stateless 2D Canvas Editor with Shareable Links

A lightweight web-based canvas editor built with **React**, **Fabric.js**, and **Firebase Firestore**, allowing users to create and edit shapes/text, draw freely, and share their work via unique public links — no login required.

live-demo: [canvas](https://canvas-gules.vercel.app/)

---

## 🚀 Features

### 🎨 Canvas Editing

- **Add Shapes** — Rectangle, Circle
- **Add Text** — Editable text with customizable font size and color
- **Pen Tool** — Freehand drawing with adjustable brush size and color
- **Move, Resize, Rotate, Delete** objects
- **Color Editing** — Change fill and stroke colors of selected objects
- **Keyboard Shortcuts**
  - `Delete` / `Backspace`: Remove selected object(s)
- **Object Selection**
  - Single or multiple object selection

### 💾 Scene Management

- **Stateless URL System**
  - `/` generates a new unique scene ID and redirects to `/canvas/:id`
  - `/canvas/:id` loads the saved canvas state from Firestore
- **Auto-Save with Debounce**
  - Updates are saved to Firestore in real time without excessive writes
  - Color/style changes also trigger saves
- **Public Share Link**
  - Shareable link to allow anyone to edit the same canvas (no login)

### 📤 Export Options

- **Export as PNG** — High-quality raster image
- **Export as SVG** — Vector version, editable in design tools

### 📱 Responsive Canvas

- Canvas resizes automatically to fit the container
- Maintains background and object placement

---

## 🛠 Technologies Used

- **React** — UI library for building the editor
- **Fabric.js** — Canvas rendering and object manipulation
- **Firebase Firestore** — Real-time database for saving/loading canvas states
- **Lodash** — Debouncing save operations
- **Radix UI** — Prebuilt accessible components for toolbar and buttons
- **CSS** — Styling and layout

---

## 📂 Project Structure

src/

│

├── components/

│   ├── FabricCanvas.jsx   # Main canvas component

│   ├── ToolBar.jsx        # Toolbar with shape, text, pen, export tools

│

├── firebase.js            # Firebase config and Firestore instance

├── App.jsx                 # App routing

└── index.js                # Entry point

---

## ⚙️ How It Works

1. When visiting `/`, a new UUID is generated and the user is redirected to `/canvas/:id`.
2. The canvas state is stored in Firestore under `scenes/{id}`.
3. All changes to the canvas (adding, moving, coloring, deleting objects) are auto-saved.
4. Visiting `/canvas/:id` loads the corresponding state from Firestore.
5. Users can export their work as PNG or SVG.

---

## 📦 Installation & Setup

```bash
# Clone the repository
git clone <repo-url>
cd <repo-folder>

# Install dependencies
npm install

# Run development server
npm run dev
```

## Possible Future Enhancements

* Snap-to-grid
* Undo/Redo
* Templates for quick starts
* View-only mode (`?viewOnly=true`)
* Object locking/unlocking
