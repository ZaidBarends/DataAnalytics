import { useEffect } from "react";


const useResize = (setColumns, gridSize) => {
  const handleResize = () => {
    const screenWidth = window.outerWidth;
    setColumns(Math.floor(screenWidth / gridSize)); // Update columns based on the screen width
  };

  useEffect(() => {
    handleResize(); // Initial column count calculation
    window.addEventListener("resize", handleResize); // Listen to window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up listener on unmount
    };
  }, []);
};

export default useResize;