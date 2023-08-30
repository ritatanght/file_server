const net = require("net");
const fs = require("fs");

const server = net.createServer((client) => {
  client.setEncoding("utf8");
  console.log("A client has connected");

  client.write("Please input a file name: ");

  // data from client
  client.on("data", (file) => {
    console.log("Client requested the file:", file);
    if (fs.existsSync(file)) {
      fs.readFile(`./${file}`, "utf8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        client.write(`${data}\n`);
      });
    } else {
      client.write("File not found...\n");
    }
  });

  client.on("end", () => {
    server.close();
  });
});

server.on("error", (err) => {
  throw err;
});

server.listen(1234, () => {
  console.log("server bound");
});

// server.close(() => {
//   console.log("server closed.");
//   server.unref();
// });
