// pages/api/opencascadeHandler.js

import { setOC } from "replicad";
import { drawBox } from "@/components/cad";

let loaded = false;
const init = async () => {
  if (loaded) return Promise.resolve(true);

  const opencascade = (await import("replicad-opencascadejs/src/replicad_single.js")).default;
  const opencascadeWasm = (await import("replicad-opencascadejs/src/replicad_single.wasm?url")).default;
  const OC = await opencascade({ locateFile: () => opencascadeWasm });

  loaded = true;
  setOC(OC);

  return true;
};
const started = init();

async function createBlob(thickness) {
  await started;
  return drawBox(thickness).blobSTL();
}

async function createMesh(thickness) {
  await started;
  const box = drawBox(thickness);
  return {
    faces: box.mesh(),
    edges: box.meshEdges(),
  };
}

export default async function handler(req, res) {
  const { operation, thickness } = req.body;

  try {
    switch (operation) {
      case "createBlob":
        const blob = await createBlob(thickness);
        res.status(200).json({ result: blob });
        break;
      case "createMesh":
        const mesh = await createMesh(thickness);
        res.status(200).json({ result: mesh });
        break;
      default:
        res.status(400).json({ error: "Invalid operation" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
