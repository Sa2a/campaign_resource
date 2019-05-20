const app = require('../app').app;
const db = require('../database/CampaignDb');

app.post('/campaign', async (req, res) => {
    let campaign = await db.addCampaign(req.body.campaign);
    res.send({campaign});
});