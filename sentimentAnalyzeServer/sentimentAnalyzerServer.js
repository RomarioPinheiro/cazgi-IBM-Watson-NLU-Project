const express = require('express');
const app = new express();
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUndestandingV1 = require ('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require ('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUndestandingV1({
      version: '2021-03-25',
      authenticator: new IamAuthenticator({
       apikei: api_key,   
      }),
      serviceUrl: api_url,  
    });
    return naturalLanguageUnderstanding;

}

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get(getNLUInstance(), (req,res) => {

    return res.send({"happy":"90","sad":"10"});
});

app.get(getNLUInstance(), (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get(getNLUInstance(), (req,res) => {
    return res.send({"happy":"10","sad":"90"});
});

app.get(getNLUInstance(), (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

