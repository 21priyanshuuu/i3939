import cleanupExtraData from "./cleanupExtraData.js";

const interval = 60 * 1000; // 1 minute in milliseconds

function startCleanupTimer() {
  console.log("Starting cleanup timer...");

  // Run cleanup immediately
  cleanupExtraData().catch(console.error);

  // Set up timer to run cleanup every minute
  setInterval(async () => {
    try {
      console.log("Running scheduled cleanup...");
      await cleanupExtraData();
    } catch (error) {
      console.error("Error during scheduled cleanup:", error);
    }
  }, interval);
}

startCleanupTimer();
