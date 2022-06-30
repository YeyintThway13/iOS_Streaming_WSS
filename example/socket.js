const net = require("net");
const http = require("http");
let io = require("socket.io");
const express = require("express");

const debug = require("debug")("example");
const { Parser } = require("minicap");

const app = express();
const server = http.createServer(app);

const port = 9002;

// configure socket io server, that listen for events and broadcast to web clients
const configureSocketServer = (server) => {
  io = io(server, {
    wsEngine: require("eiows").Server,
    perMessageDeflate: {
      threshold: 32768,
    },
    cors: {
      origin: "*",
    },
  });
  io.on("connection", function (socket) {
    console.log(`A user connected through socket io ${socket.id}`);

    socket.on("ios_device_stream", async () => {
      try {
        const stream = net.connect({
          port: 12345,
        });

        stream.on("error", function (error) {
          console.error("Be sure to run port forwarding" + error);
        });

        function onBannerAvailable(banner) {
          debug("banner", banner);
        }

        function onFrameAvailable(frame) {
          console.count("data");
          socket.emit("ios_device_stream", frame.buffer, {
            binary: true,
          });
        }

        const parser = new Parser({
          onBannerAvailable,
          onFrameAvailable,
        });

        function tryParse() {
          for (let chunk; (chunk = stream.read()); ) {
            parser.parse(chunk);
          }
        }

        stream.on("readable", tryParse);

        tryParse();
      } catch (error) {
        console.log(error);
      }
    });

    socket.on("disconnect", function () {
      console.log("Done destroy A user disconnected");
    });
  });
};

configureSocketServer(server);

server.listen(port);
console.info(`Listening on port ${port}`);
