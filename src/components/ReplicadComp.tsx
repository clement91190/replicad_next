import React, { useEffect } from "react";
import Worker from "worker-loader!./worker";
import * as Comlink from "comlink";

interface WorkerApi {
  createBlob: (thickness: number) => Promise<any>;
  createMesh: (thickness: number) => Promise<any>;
  [Comlink.releaseProxy]: () => void;
}

interface ReplicadCompProps {
  setWorkerApiRef: any;
}

const ReplicadComp: React.FC<ReplicadCompProps> = ({ setWorkerApiRef }) => {
  useEffect(() => {
    const initWorker = async () => {
      console.log("initWorker called");
      const workerInstance = new Worker();
      const api = Comlink.wrap<WorkerApi>(workerInstance);

      console.log("workerInstance and api created");

      api.createMesh(1).then((m: any) => {
        console.log("Called create mesh successfully");
        console.log(api);
        setWorkerApiRef(api);
      });
    };

    initWorker();
  }, [setWorkerApiRef]);

  return null;
};

export default ReplicadComp;
