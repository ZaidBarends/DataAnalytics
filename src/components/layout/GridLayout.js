import React from "react";
import GridLayout from "react-grid-layout";
import {
  Card,
  CardContent,
  KeyMetrics,
  TimePeriodSelector,
  DataBreakdown,
  ModuleContent,
} from "../ui/card";
import { Grip } from "lucide-react";
import "react-grid-layout/css/styles.css";
import "../../App.css";

const CustomGridLayout = ({ modules, columns, gridWidth, rowHeight, handleLayoutChange }) => {
  return (
    <GridLayout
      className="layout"
      layout={modules.map((module, index) => ({
        i: module.id.toString(),
        x: (index % columns) * 4, // Distribute modules evenly across columns
        y: Math.floor(index / columns) * 4, // Stack rows evenly
        w: 4, // Adjust width to fit 2 modules next to each other
        h: 8, // Use a fixed height for each module (reasonable value for most screens)
        minW: 4, // Minimum width
        minH: 4, // Minimum height
      }))}
      cols={columns * 2} // Double the number of columns to fit 2 modules next to each other
      rowHeight={rowHeight}
      width={gridWidth}
      isDraggable={true}
      isResizable={true}
      compactType="vertical" // Compact modules vertically to fill empty space from the top
      preventCollision={true} // Prevent collision
      onLayoutChange={handleLayoutChange} // Handle custom layout changes
    >
      {modules.map((module) => (
        <div key={module.id}>
          <Card className="h-full w-full flex flex-col">
            <CardContent className="p-4 flex-grow flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">{module.name}</h2>
                <Grip className="drag-handle text-gray-400 cursor-move" size={20} />
              </div>
              <ModuleContent module={module} />
            </CardContent>
          </Card>
        </div>
      ))}
    </GridLayout>
  );
};

export default CustomGridLayout;