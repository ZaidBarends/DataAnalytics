// utils/gridUtils.js

export const findAvailableSpace = (layout, columns, modules, w, h) => {
    const rows = Math.ceil(modules.length / columns);
  
    // Loop through all potential positions
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const occupied = layout.some((item) => {
          return (
            item.x < x + w &&
            item.x + item.w > x &&
            item.y < y + h &&
            item.y + item.h > y
          );
        });
  
        if (!occupied) {
          return { x, y }; // Return the first available space
        }
      }
    }
    return { x: 0, y: 0 }; // Fallback to top-left if no space found
  };
  
  export const shiftModulesUpwards = (modules, columns, rowHeight) => {
    // Sort modules by their Y positions to ensure the gaps are filled top-to-bottom
    modules.sort((a, b) => a.y - b.y);
  
    let lastY = 0;
    const newOrder = modules.map((module) => {
      const newY = Math.max(lastY, module.y); // Move module upwards into empty space
      lastY = newY + module.h; // Update lastY for the next module
      return { ...module, y: newY };
    });
  
    return newOrder;
  };
  
  export const updateColumns = (screenWidth) => {
    const maxColumns = Math.floor(screenWidth / 15); // Use width divided by grid size
    return Math.max(2, maxColumns); // Ensure at least 2 columns
  };
  