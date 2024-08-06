"use client";
import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("");

  const startMonitoring = async () => {
    const response = await fetch("/api/monitor");
    const data = await response.json();
    setStatus(data.status);
  };

  return (
    <div>
      <h1>MongoDB Monitoring System</h1>
      <button onClick={startMonitoring}>Start Monitoring</button>
      <p>{status}</p>
    </div>
  );
}
