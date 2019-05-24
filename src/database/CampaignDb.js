const Campaign = require("../entity/Campaign").Campaign;
const connection = require("typeorm").getConnection();

let axios = require('axios');

let addCampaign = async (campaignBody) => {
    const campaignRepository = await connection.getRepository(Campaign);
    let campaign = new Campaign();
    campaign.name = campaignBody.name;

    //if there is campaign with this name
    if (await campaignRepository.findOne({name: campaignBody.name}))
        return null;
    campaign.budget = campaignBody.budget;
    campaign.goal = campaignBody.goal;
    campaign.country = campaignBody.country;
    campaign.startDate = campaignBody.startDate;
    campaign.endDate = campaignBody.endDate;
    campaign.category = campaignBody.category;

    // if category is not provided, use api to get random category
    if (campaignBody.category === null) {
        await axios.get('https://ngkc0vhbrl.execute-api.eu-west-1.amazonaws.com/api/?url=https://arabic.cnn.com/')
            .then(response => {
                campaign.category = response.data.category.name;
            })
            .catch(error => {
                console.log(error);
            });
    }
    return await campaignRepository.save(campaign).then(campaign => campaign);
};


let getCampaign = async (parameters) => {

    /*const dimensions = [
        {
            id: 'category',
            name: 'Category'
        },
        {
            id: 'country',
            name: 'Country'
        },
    ];
    const fields = [
        {
            id: 'category',
            name: 'Category'
        },
        {
            id: 'country',
            name: 'Country'
        },
        {
            id: 'COUNT(id)',
            name: 'Count of dimensions'
        }
    ];

    const duration = {
        startDate: new Date(2019, 5, 23),
        endDate: new Date(2019, 5, 30)
    };*/

    const dimensions= parameters.dimensions;
    const fields = parameters.fields;
    const durationParam =JSON.parse(parameters.duration);
    const duration ={
        startDate: new Date(durationParam.startDate),
        endDate: new Date(durationParam.endDate)
    };
    const campaignRepository = await connection.getRepository(Campaign);

    let query= "SELECT COUNT(id) AS 'Count',";
    fields.forEach(field=>{
        field= JSON.parse(field);
       query+=`${field.id} as '${field.name}',`;
    });
    query = query.slice(0,-1);//for the last comma ,
    //2019-05-24 date format
    query+= ` FROM campaign WHERE `
        + `startDate >='${duration.startDate.getFullYear()}-${duration.startDate.getMonth()+1}-${ duration.startDate.getDate()}'`
        + `AND endDate <='${duration.endDate.getFullYear()}-${duration.endDate.getMonth()+1}-${ duration.endDate.getDate()}'`;

    query+= ' GROUP BY ';
    dimensions.forEach(dimension=>{
        dimension= JSON.parse(dimension);
        query+=`${dimension.id},`;
    });
    query = query.slice(0,-1);//for the last comma ,
    let result= await campaignRepository.query(query);
    console.log(result);
    return result;
};


module.exports = {
    addCampaign,
    getCampaign
};
