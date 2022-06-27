const net = require("net");

net
  .createServer((c) => {
    const source = net.createConnection({ port: 12345 });
    source.on("error", () => {
      source.unref();
    });
    c.on("error", (e) => {
      c.destroy();
      source.unref();
    });
    c.on("end", () => {
      source.unref();
    });
    c.on("close", () => {
      source.destroy();
    });

    c.pipe(source);
    source.pipe(c);
  })
  .listen(8124);
