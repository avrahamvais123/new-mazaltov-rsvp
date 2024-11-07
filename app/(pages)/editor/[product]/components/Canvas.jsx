import React, { useEffect, useRef } from "react";
import * as fabricModule from "fabric";

const Canvas = ({ canvas, imageUrl, canvasRef }) => {
  useEffect(() => {
    if (!canvas || !imageUrl || !canvasRef.current) return;

    const { fabric } = fabricModule;
    
    fabric.Image.fromURL(
      imageUrl,
      (img) => {
        img.scaleToWidth(canvas?.width);
        img.scaleToHeight(canvas?.height);
        img.set({
          originX: "center",
          originY: "center",
          left: canvas?.width / 2,
          top: canvas?.height / 2,
        });

        canvas?.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          centeredScaling: true,
          isMainImage: true,
        });
      },
      { crossOrigin: "anonymous" }
    );

    return () => {
      canvas.off();
    };
  }, [imageUrl, canvasRef.current, canvas]);

  return (
    <canvas
      className="size-full"
      ref={canvasRef}
    ></canvas>
  );
};

export default Canvas;
