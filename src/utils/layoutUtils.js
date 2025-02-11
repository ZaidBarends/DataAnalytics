export const handleLayoutChange = (layout, modules, setModules) => {
  const newModules = modules.map((module) => {
    const layoutItem = layout.find((item) => item.i === module.id.toString());
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
