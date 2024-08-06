import mongoose from "mongoose";

const CampaignPrimarySchema = new mongoose.Schema({
  name: String,
  description: String,
});

const CampaignPrimary =
  mongoose.models.CampaignPrimary ||
  mongoose.model("CampaignPrimary", CampaignPrimarySchema);

export default CampaignPrimary;
