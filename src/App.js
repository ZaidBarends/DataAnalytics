import React, { useState } from "react";
import CustomGridLayout from "./components/layout/GridLayout";
import useResize from "./hooks/useResize";
import { handleLayoutChange } from "./utils/layoutUtils";
import "./App.css";

const initialModules = [
  { id: 1, name: "Module A" },
  { id: 2, name: "Module B" },
  { id: 3, name: "Module C" },
  { id: 4, name: "Module D" },
  { id: 5, name: "Module E" },
  { id: 6, name: "Module F" },
];

const App = () => {
  const [modules, setModules] = useState(initialModules);
  const [columns, setColumns] = useState(3);
  const gridWidth = 1200;
  const rowHeight = 80;
  const gridSize = 200;

  useResize(setColumns, gridSize);

  return (
    <div
      className="min-h-screen bg-gray-900 overflow-auto"
      style={{ height: "auto" }}
    >
      {/* Header */}
      <header className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-100">Data Analytics Dashboard</h1>
          <nav className="flex space-x-4">
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700">
              Settings
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700">
              Help
            </button>
          </nav>
        </div>
      </header>

      {/* Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <CustomGridLayout
          modules={modules}
          columns={columns}
          gridWidth={gridWidth}
          rowHeight={rowHeight}
          handleLayoutChange={(layout) => handleLayoutChange(layout, modules, setModules)}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-center text-sm text-gray-400">
            Dashboard v1.0 - Resize and rearrange modules freely.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;