const app = require('../app').app;
const db = require('../database/CampaignDb');

app.post('/campaign', async (req, res) => {
    /*
    * req.body example
    {
        "campaign": {
                    "name": "n1",
                    "country": "USA",
                    "budget": 149,
                    "goal": "Awareness",
                    "category": "Technology",
                    "startDate":
                    "endDate":
                    }
    }
    */
    let campaign = await db.addCampaign(req.body.campaign);
    console.log(campaign);
    campaign === null?
        res.status(405).send('A campaign with the same name exists, Try another name.')//405 Method Not Allowed
        :res.send({campaign});
});

app.get('/campaign', async (req, res) => {
    console.log(req.query);
    res.send({results: await db.getCampaign(req.query)});
});
