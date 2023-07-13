
const client = require('@mailchimp/mailchimp_marketing');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/Sign-up.html");
})

client.setConfig({
    apiKey: process.env.KEY,
    server: "us21"
})

app.post('/', function (req, res) {
    const name1 = req.body.fit;
    const name2 = req.body.sec;
    const email = req.body.thir;
    
    
    const subscribingUser = {
        name1: name1,
        name2: name2,
        email: email
    }

    const run = async () => {
        const response = await client.lists.addListMember("a947287a8b", {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.name1,
                LNAME: subscribingUser.name2
            }
          });
        res.sendFile(__dirname + "/Success.html");
    }

    run().catch(e => res.sendFile(__dirname + "/Failure.html"));

});

app.post('/Failure', function (req, res) {
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Up and running!");
});
