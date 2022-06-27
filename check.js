var portUsed = require("port-used");
const find = require("find-process");

// let i;
// portUsed.check(44201, "127.0.0.1").then(
//   (inUse) => {
//     console.log("Port 44201 usage: " + inUse);
//     i = 10;
//   },
//   (err) => {
//     console.error("Error on check:", err.message);
//   }
// );

// console.log(Array.from({ length: 100 - 0 }, (_, i) => 1  + i));

// console.log(i);

const getFreePort = async (port) => {
  let list = await find("port", port);
  if (list.length === 0) {
    return port;
  }
};

const hee = async () => {
  const port = await getFreePort(123456);
  console.log(port);
  return port;
};

const port = hee();
console.log(port);
console.log("here");
