// Config server Mongodb
// MongoClient doc https://mongodb.github.io/node-mongodb-native/api-generated/mongoclient.html

const express = require('express');
const MongoClient = require ('mongodb').MongoClient;
const bodyParser = require('body-parser');
const faker = require('faker');
const app = express();
const db = "mongodb+srv://ShoopyApi:obKmRLS3UEF9rTR4@shoopy-4r2ms.gcp.mongodb.net/shoopy?retryWrites=true&w=majority";



// set port (localhost:<port>)
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD")
    next();
});
// npm install mongodb --save
// MongoClient.connect(url) deprecate from new version, use MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
// db.collection error, use client.db(<dbname>)
MongoClient.connect(db,  { useNewUrlParser: true, useUnifiedTopology: true },  (err, client) => {




const datab = client.db('shoopy')
if (err) return console.log(err)
require('./app/routes')(app, datab);
app.listen(port, () =>{
    console.log('Shoopy is on the port '+ port)
})
/*    if (err) return console.log(err)
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('Ok Mr.' + port)
    })*/
})
