const Campaign = require("../entity/Campaign").Campaign;
const connection = require("typeorm").getConnection();

let addCampaign = async (campaignBody) => {
    let campaignRepository = await connection.getRepository(Campaign);
    let campaign = new Campaign();
    campaign.name = campaignBody.name;
    campaign.budget = campaignBody.budget;
    campaign.category = campaignBody.category;
    campaign.country = campaignBody.country;
    campaign.goal = campaignBody.goal;
    return await campaignRepository.save(campaign).then(campaign => campaign);
};


module.exports = {
    addCampaign
};
