const iosDevice = require("node-ios-device");

// continuously watch for devices to be connected or disconnected
const handle = iosDevice.watch();
handle.on("change", (devices) => {
  console.log("Connected devices:", devices);
});
handle.on("error", console.error);
