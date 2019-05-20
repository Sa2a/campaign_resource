require('reflect-metadata');
const express = require('express');
const bodyParser = require('body-parser');
const createConnection = require("typeorm").createConnection();

createConnection.then(() => {
    let app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    //on windows terminal command -> set PORT=5000
    //default port = 5000
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`application has started on port ${port}`);
    });

    module.exports = {app};

    //handle requests files
    require('./clientrequests/CampaignReq');
}).catch(error => {
    console.log(error);
});