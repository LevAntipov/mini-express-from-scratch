const os = require("os");
const cluster = require("cluster");

const cpus = os.cpus();
const cpusLength = cpus.length;
const numCPUs = os.availableParallelism();

if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs - 2; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Воркер с pid = ${worker.process.pid} умер`);
  });
} else {
  console.log(`Воркер с pid = ${process.pid} запущен`);
  setInterval(() => {
    console.log(`Воркер с pid = ${process.pid} всё еще работает !`);
  }, 5000);
}
