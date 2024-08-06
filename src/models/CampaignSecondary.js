import mongoose from "mongoose";

const CampaignSecondarySchema = new mongoose.Schema({
  name: String,
  description: String,
  userId: String,
});

const CampaignSecondary =
  mongoose.models.CampaignSecondary ||
  mongoose.model("CampaignSecondary", CampaignSecondarySchema);

export default CampaignSecondary;
