import socketClient from "socket.io-client";

export let socket = socketClient(`http://192.168.100.97:9002`);

socket.on("connection", () => {
  console.log(" Socket Connected Client");
});

export const getFromIOSDeviceStream = (canvas, BLANK_IMG, context) => {
  socket.on("ios_device_stream", (data) => {
    console.log("Here");
    let blob = new Blob([data], { type: "image/jpeg" });
    const URL = window.URL || window.webkitURL;
    let img = new Image();
    let u;
    img.onload = function () {
      console.log(img.width, img.height);
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      img.onload = null;
      img.src = BLANK_IMG;
      img = null;
      u = null;
      blob = null;
    };
    u = URL.createObjectURL(blob);
    img.src = u;
  });
};

export const emitIOSDeviceStream = () => {
  console.log("here");
  socket.emit("ios_device_stream");
};
