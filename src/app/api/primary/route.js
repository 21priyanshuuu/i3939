import dbConnectPrimary from "../../../lib/dbConnectPrimary.js";
import dbConnectSecondary from "../../../lib/dbConnectSecondary.js";
import CampaignPrimary from "../../../models/CampaignPrimary.js";
import CampaignSecondary from "../../../models/CampaignSecondary.js";

// Function to generate a random user ID
function generateRandomUserId(length = 12) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function POST(req) {
  try {
    await dbConnectPrimary();
    await dbConnectSecondary();

    const body = await req.json(); // Parse the request body
    console.log("Request Body:", body); // Log the request body

    // Generate a new userId
    const userId = generateRandomUserId();

    const { name, description } = body; // Extract campaign data
    const campaignData = { name, description, userId }; // Include userId in campaign data

    // Create and save the campaign in the primary database
    const newPrimaryCampaign = new CampaignPrimary(campaignData);
    const savedPrimaryCampaign = await newPrimaryCampaign.save();

    // Create and save the campaign in the secondary database
    const newSecondaryCampaign = new CampaignSecondary(campaignData);
    const savedSecondaryCampaign = await newSecondaryCampaign.save();

    // Fetch all campaigns after saving the new one
    const allCampaigns = await CampaignPrimary.find().lean();
    console.log("All Campaigns:", allCampaigns); // Log all campaigns

    return new Response(
      JSON.stringify({
        savedPrimaryCampaign,
        savedSecondaryCampaign,
        allCampaigns,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during saving campaign:", error); // Log errors
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
