import { spawn } from "bun";

const cpus = navigator.hardwareConcurrency || 1;

const buns = new Array(cpus);

for (let i = 0; i < cpus; i++) {
  buns[i] = spawn({
    cmd: ["bun", "./server.ts"],
    stdout: "inherit",
    stderr: "inherit",
    stdin: "inherit",
  });
}

function kill() {
  for (const bunProc of buns) {
    try {
      bunProc.kill();
    } catch {
      // ignore
    }
  }
}

process.on("SIGINT", kill);
process.on("SIGTERM", kill);
process.on("exit", kill);

// Keep process alive
setInterval(() => {}, 1 << 30);
