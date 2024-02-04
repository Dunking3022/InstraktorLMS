import { Excalidraw } from "@excalidraw/excalidraw";
import React, { useLayoutEffect, useEffect, useState } from "react";

const DrawBoard = () => {
  const [excalidrawData, setExcalidrawData] = useState(null);

  useLayoutEffect(() => {
    const savedData = localStorage.getItem("excalidrawData");
    if (savedData) {
      setExcalidrawData(JSON.parse(savedData));
    }
  }, []); // Empty dependency array to run once on mount

  const handleExcalidrawChange = (nextData) => {
    setExcalidrawData(nextData);
    localStorage.setItem("excalidrawData", JSON.stringify(nextData));
  };

  return (
    <>
      <div style={{ height: "500px" }}>
        <Excalidraw
          initialData={excalidrawData} 
          onChange={handleExcalidrawChange} 
        />
      </div>
    </>
  );
};

export default DrawBoard;
