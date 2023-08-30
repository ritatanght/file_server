const net = require("net");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const conn = net.createConnection({ host: "localhost", port: 1234 });

conn.setEncoding("utf8");

conn.on("connect", () => {
  console.log("Successfully connected to server");
});

rl.on("line", (input) => {
  console.log(`Requesting: ${input}`);
  conn.write(input);
});

// data from server
conn.on("data", (data) => {
  process.stdout.write(data);
});
