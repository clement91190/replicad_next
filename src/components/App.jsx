import React, { useState, useEffect, useRef, useCallback } from "react";
import FileSaver from "file-saver";

import ThreeContext from "./ThreeContext.jsx";
import ReplicadMesh from "./ReplicadMesh.jsx";
import ReplicadComp from "./ReplicadComp"; // Import the ReplicadComp component

export default function ReplicadApp() {
  const [size, setSize] = useState(5);
  const [mesh, setMesh] = useState(null);
  const workerApiRef = useRef(null);

  const setWorkerApiRefCallback = useCallback((api) => {
    workerApiRef.current = api;
    if (api) {
      api.createMesh(size).then((m) => setMesh(m));
    }
  }, [size]);

  useEffect(() => {
    if (workerApiRef.current) {
      workerApiRef.current.createMesh(size).then((m) => setMesh(m));
    }
  }, [size]);

  const downloadModel = async () => {
    if (!workerApiRef.current) return;
    const blob = await workerApiRef.current.createBlob(size);
    FileSaver.saveAs(blob, "thing.stl");
  };

  return (
    <main>
      <h1>
        A{" "}
        <a
          href="https://replicad.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          replicad
        </a>{" "}
        sample app
      </h1>
      <p>
        You can find the code for this app{" "}
        <a
          href="https://github.com/sgenoud/replicad/tree/main/packages/replicad-app-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          on GitHub
        </a>
      </p>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <label htmlFor="thicknessInput">thickness</label>
          <input
            id="thicknessInput"
            type="number"
            step="1"
            min="1"
            max="10"
            value={size}
            onChange={(v) => {
              const val = parseInt(v.target.value);
              if (val > 0 && val <= 10) setSize(val);
            }}
          />
        </div>
        <button onClick={downloadModel}>Download STL</button>
      </section>
      <section style={{ height: "300px" }}>
        {mesh ? (
          <ThreeContext>
            <ReplicadMesh edges={mesh.edges} faces={mesh.faces} />
          </ThreeContext>
        ) : (
          <div
            style={{ display: "flex", alignItems: "center", fontSize: "2em" }}
          >
            Loading...
          </div>
        )}
      </section>
      <ReplicadComp setWorkerApiRef={setWorkerApiRefCallback} />

    </main>
  );
}
