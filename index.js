const http = require("http");
const cluster = require("cluster");
const { cpus } = require("os");
const express = require("express");
const sum = require("./tasks/sum.js");

const port = 3000;
const app = express();

let workers = [];

const setupWorkers = () => {
  for (let i = 0; i <= cpus().length; i++) {
    workers.push(cluster.fork());
  }

  cluster.on("online", function(worker) {
    console.log(`worker ${worker.process.pid} is online!`);
  });

  cluster.on("exit", function(worker, exitCode) {
    console.log(`worker ${worker.process.pid} exited with status ${exitCode}`);
    console.log("Starting a new worker...");
    cluster.fork();
  });
};

const setupRouting = () => {
  app.server = http.createServer(app);

  app.get("/sum", (req, res) => {
    console.log(`Worker ${process.pid} running.`);
    const result = sum();
    res.send(`${result}`);
  });

  app.server.listen(port, () => {
    console.log("listening on port 3000");
  });
};

const setupServer = () => {
  if (cluster.isMaster) {
    setupWorkers();
  } else {
    setupRouting();
  }
};

setupServer();
