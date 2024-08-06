import dbConnectPrimary from "../lib/dbConnectPrimary";
import dbConnectSecondary from "../lib/dbConnectSecondary";
import CampaignPrimary from "../models/CampaignPrimary";
import CampaignSecondary from "../models/CampaignSecondary";

async function cleanupExtraData() {
  await dbConnectPrimary();
  await dbConnectSecondary();

  // Fetch all IDs from the secondary database
  const secondaryIds = await CampaignSecondary.find().select("_id").lean();
  const secondaryIdSet = new Set(secondaryIds.map((doc) => doc._id.toString()));

  // Find all documents in the primary database
  const primaryDocs = await CampaignPrimary.find().lean();

  // Delete documents from the primary database that are not in the secondary database
  const deletionPromises = primaryDocs
    .filter((doc) => !secondaryIdSet.has(doc._id.toString()))
    .map((doc) => CampaignPrimary.findByIdAndDelete(doc._id));

  await Promise.all(deletionPromises);

  console.log("Cleanup complete: Extra data deleted from primary database");
}

export default cleanupExtraData;
