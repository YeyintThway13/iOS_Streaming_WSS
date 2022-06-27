// const net = require("net");

// const tcpForwardPort = 11600;

// const addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/;

// const addr = {
//   from: addrRegex.exec(tcpForwardPort),
//   to: addrRegex.exec(12345),
// };

// const server = net
//   .createServer(function (from) {
//     console.log("Client connected");

//     from.on("error", (err) => {
//       console.log("error", err);
//     });

//     from.on("end", () => {
//       console.log("client disconnected");
//     });

//     var to = net.createConnection({
//       host: addr.to[2],
//       port: addr.to[3],
//     });
//     from.pipe(to);
//     to.pipe(from);
//   })
//   .listen(addr.from[3], addr.from[2], () => {
//     console.log("server is up");
//   });

// server.on("error", (err) => {
//   console.log(err);
// });

// var net = require("net");

// var sourceport = 12345;
// const destport = 12354;

// const addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/;

// const addr = {
//   from: addrRegex.exec(sourceport),
//   to: addrRegex.exec(destport),
// };

// console.log(addr);

// net
//   .createServer(function (s) {
//     console.log("In server");
//     var buff = "";
//     var connected = false;
//     var cli = net.createConnection({ host: addr.to[2], port: addr.to[3] });
//     s.on("data", function (d) {
//       if (connected) {
//         cli.write(d);
//       } else {
//         buff += d.toString();
//       }
//     });

//     cli.on("connect", function () {
//       connected = true;
//       cli.write(buff);
//     });
//     cli.pipe(s);
//   })
//   .listen(addr.from[3], addr.from[2], () => {
//     console.log("server is up");
//   });

const net = require("net");
const server = net.createServer((c) => {
  // 'connection' listener.
  console.log("client connected");
  const client = net.createConnection({ port: 12345 }, () => {
    // 'connect' listener.
    console.log("connected to server!");
  });
  client.on("error", () => {
    console.log("error");
    client.unref();
  });
  // client.on("data", (data) => {
  //   console.log(data);
  // });
  c.on("error", (e) => {
    console.log("error in c", e);
    c.destroy();
    client.unref();
  });
  c.on("end", () => {
    console.log("Client Disconnected");
    client.unref();
  });
  c.on("close", function () {
    console.log("In close callback");
    client.destroy();
    client.end();
    client.unref();
  });
  client.on("end", () => {
    console.log("disconnected from server");
  });

  if (!c.destroyed) {
    c.pipe(client);
    client.pipe(c);
  }
});
server.listen(8124, () => {
  console.log("server bound");
});

server.on("error", (error) => {
  console.log("server error", error);
});

server.on("end", () => {
  console.log("server end");
});

// net
//   .createServer((c) => {
//     // 'connection' listener.
//     console.log("client connected");
//     c.on("end", () => {
//       console.log("client disconnected");
//     });
//     c.write("hello\r\n");
//     c.pipe(c);
//   })
//   .listen(8125, () => {
//     console.log("server bound");
//   });

// const client = net.createConnection({ port: 12345 }, () => {
//   // 'connect' listener.
//   console.log("connected to server!");
// });
// client.on("data", (data) => {
//   console.log(data.toString());
// });

// setTimeout(() => {
//   console.log("In set time out");
//   client.pause();
// }, 3000);

// client.on("end", () => {
//   console.log("disconnected from server");
// });
