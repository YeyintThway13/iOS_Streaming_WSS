import React, { useEffect, useRef } from "react";
import { emitIOSDeviceStream, getFromIOSDeviceStream } from "./socketServices";

const IOSDeviceScreen = ({ agent_id, udid, details }) => {
  const canvasRef = useRef();
  let canvas;
  let context;
  const BLANK_IMG =
    "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

  useEffect(() => {
    emitIOSDeviceStream();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    canvas = canvasRef.current;
    canvas.width = "100%";
    canvas.height = "100%";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    // eslint-disable-next-line
    context = canvas.getContext("2d");
    getFromIOSDeviceStream(canvas, BLANK_IMG, context);
    // eslint-disable-next-line
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="screen"
      style={{ border: "1px solid red" }}
    ></canvas>
  );
};

export default IOSDeviceScreen;
