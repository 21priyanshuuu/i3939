import dbConnectPrimary from "../lib/dbConnectPrimary";
import dbConnectSecondary from "../lib/dbConnectSecondary";
import CampaignPrimary from "../models/CampaignPrimary";
import CampaignSecondary from "../models/CampaignSecondary";

async function monitorChanges() {
  try {
    await dbConnectPrimary();
    console.log("Connected to primary database");
    await dbConnectSecondary();
    console.log("Connected to secondary database");

    const changeStreamPrimary = CampaignPrimary.watch();
    const changeStreamSecondary = CampaignSecondary.watch();

    changeStreamPrimary.on("change", async (change) => {
      console.log("Change detected in primary database:", change);
      try {
        const document = await CampaignPrimary.findById(change.documentKey._id);
        if (document) {
          console.log("Syncing document to secondary database:", document);
          await CampaignSecondary.findByIdAndUpdate(
            change.documentKey._id,
            document,
            { upsert: true }
          );
        } else {
          console.log("Document not found in primary database");
        }
      } catch (error) {
        console.error("Error syncing with secondary database:", error);
      }
    });

    changeStreamSecondary.on("change", async (change) => {
      console.log("Change detected in secondary database:", change);
      try {
        const document = await CampaignSecondary.findById(
          change.documentKey._id
        );
        if (document) {
          console.log("Syncing document to primary database:", document);
          await CampaignPrimary.findByIdAndUpdate(
            change.documentKey._id,
            document,
            { upsert: true }
          );
        } else {
          console.log("Document not found in secondary database");
        }
      } catch (error) {
        console.error("Error syncing with primary database:", error);
      }
    });
  } catch (error) {
    console.error("Error setting up monitoring:", error);
  }
}

monitorChanges().catch(console.error);
