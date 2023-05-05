import { drawRoundedRectangle } from "replicad";

export function drawBox(thickness) {
  try {
    console.log("Start drawBox");
    const roundedRectangle = drawRoundedRectangle(30, 50);
    console.log("Rounded Rectangle:", roundedRectangle);

    const sketch = roundedRectangle.sketchOnPlane();
    console.log("Sketch:", sketch);

    const extruded = sketch.extrude(20);
    console.log("Extruded:", extruded);

    const shelled = extruded.shell(thickness, (f) => f.inPlane("XY", 20));
    console.log("Shelled:", shelled);

    return shelled;
  } catch (error) {
    console.error("Error in drawBox:", error);
    throw error;
  }
}
