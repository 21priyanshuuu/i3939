import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function GET() {
  const monitorProcess = spawn("node", ["scripts/monitorChanges.js"]);

  monitorProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  monitorProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  monitorProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });

  return NextResponse.json({ status: "Monitoring started" });
}
