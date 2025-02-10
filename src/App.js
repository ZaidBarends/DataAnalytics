import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import { Card, CardContent } from "./components/ui/card";
import { Grip } from "lucide-react";
import "react-grid-layout/css/styles.css";

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
  const [columns, setColumns] = useState(3); // Start with 3 columns initially
  const gridWidth = 900; // Width of grid, adjust based on available space
  const rowHeight = 80; // Height of each row
  const gridSize = 200; // Grid size to control the snapping

  // Dynamically calculate the number of columns based on screen width
  const handleResize = () => {
    const screenWidth = window.outerWidth;
    setColumns(Math.floor(screenWidth / gridSize)); // Update columns based on the screen width
  };

  // Update columns when the window is resized
  useEffect(() => {
    handleResize(); // Initial column count calculation
    window.addEventListener("resize", handleResize); // Listen to window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener on unmount
    };
  }, []);

  // Handle module layout change (move or resize)
  const handleLayoutChange = (layout) => {
    const newModules = modules.map((module, index) => {
      const layoutItem = layout[index];
      return {
        ...module,
        x: layoutItem.x,
        y: layoutItem.y,
        w: layoutItem.w,
        h: layoutItem.h,
      };
    });

    setModules(newModules);
  };

  // Handle drag (shift modules while dragging)
  const handleDrag = (layout, oldItem, newItem) => {
    const draggedModuleId = oldItem.i; // The id of the module being dragged
    const draggedModule = modules.find((module) => module.id.toString() === draggedModuleId);

    // If a module is being dragged, we update its position and shift others
    const newModules = modules.map((module) => {
      if (module.id === draggedModule.id) {
        return {
          ...module,
          x: newItem.x,
          y: newItem.y,
        };
      } else if (module.y > newItem.y) {
        // Shift module down if it is below the dragged one
        return {
          ...module,
          x: module.x,
          y: module.y + newItem.h,
        };
      } else if (module.y < newItem.y) {
        // Shift module up if it is above the dragged one
        return {
          ...module,
          x: module.x,
          y: Math.max(module.y - newItem.h, 0), // Prevent negative Y values
        };
      }
      return module;
    });

    setModules(newModules);
  };

  // Calculate the page height based on the number of rows
  const calculateHeight = () => {
    const rows = Math.ceil(modules.length / columns);
    return rows * rowHeight + 100; // Add padding (100px)
  };

  return (
    <div
      className="min-h-screen bg-gray-50 overflow-auto"
      style={{ height: "auto" }} // Let the height adjust dynamically based on content
    >
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Data Analytics Dashboard</h1>
          <nav className="flex space-x-4">
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              Settings
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
              Help
            </button>
          </nav>
        </div>
      </header>

      {/* Grid Layout */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <GridLayout
          className="layout"
          layout={modules.map((module, index) => ({
            i: module.id.toString(),
            x: (index % columns) * gridSize, // Distribute modules evenly across columns
            y: Math.floor(index / columns) * gridSize, // Stack rows evenly
            w: gridSize - 40, // Adjust width to prevent them from being too large
            h: 3, // Use a fixed height for each module (reasonable value for most screens)
          }))}
          cols={columns} // Use dynamically calculated columns
          rowHeight={rowHeight}
          width={gridWidth}
          isDraggable={true}
          isResizable={true}
          compactType={null} // Do not compact automatically
          preventCollision={false}
          snapToGrid={true} // Enable snapping to grid
          grid={gridSize} // Set grid size for snapping
          onLayoutChange={handleLayoutChange} // Handle custom layout changes
          onDrag={handleDrag} // Handle drag event dynamically
        >
          {modules.map((module) => (
            <div key={module.id}>
              <Card className="h-full w-full">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">{module.name}</h2>
                    <Grip className="drag-handle text-gray-400 cursor-move" size={20} />
                  </div>
                  <div className="h-full bg-white flex items-center justify-center">
                    <p className="text-gray-500">Drop your module here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </GridLayout>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <p className="text-center text-sm text-gray-500">
            Dashboard v1.0 - Resize and rearrange modules freely.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
