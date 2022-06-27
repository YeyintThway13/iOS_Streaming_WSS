import React, { useEffect, useRef } from "react";

const IOSDeviceScreen = ({ agent_id, udid, details }) => {
  const URL = "ws://192.168.100.97:9002";

  const ws = new WebSocket(URL, "minicap");

  ws.binaryType = "blob";

  const canvasRef = useRef();
  let canvas;
  let context;
  const BLANK_IMG =
    "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

  //   useEffect(() => {});

  ws.onopen = () => {
    console.log("here");
    canvas = canvasRef.current;
    canvas.width = "100%";
    canvas.height = "100%";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    // eslint-disable-next-line
    context = canvas.getContext("2d");
    const message = { agent_id, device_id: udid };
    ws.send(JSON.stringify(message));

    ws.onmessage = (data) => {
      //   canvas = canvasRef.current;
      //   canvas.width = "100%";
      //   canvas.height = "100%";
      //   canvas.style.width = "100%";
      //   canvas.style.height = "100%";
      console.log("------------data received-----------------");
      console.log(data.data);
      let blob = new Blob([data.data], { type: "image/jpeg" });
      const URL = window.URL || window.webkitURL;
      let img = new Image();
      let u;
      img.onload = function () {
        console.log(img.width, img.height);
        canvas.width = img?.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        img.onload = null;
        img.src = BLANK_IMG;
        img = null;
        u = null;
        blob = null;
      };
      u = URL.createObjectURL(blob);
      console.log({ u });
      img.src = u;
    };
  };

  return (
    <canvas
      ref={canvasRef}
      id="screen"
      style={{ border: "1px solid red" }}
    ></canvas>
  );
};

export default IOSDeviceScreen;
