require('reflect-metadata');
const express = require('express');
const bodyParser = require('body-parser');
const createConnection = require("typeorm").createConnection();

createConnection.then(() => {
    let app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    /* to solve this error:
    Access to XMLHttpRequest at 'http://localhost:5000/campaign'
    from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight
    request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present
    on the requested resource.*/
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });


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