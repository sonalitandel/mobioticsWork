// const express = require('express');
// const app = new express();
// const http = require('http');
// const path = require('path');
// const cors = require('cors');
// var fs = require('fs');
// var router = express.Router();
// app.use(express.json({ limit: 105906176, extended: true }));
// app.use(express.urlencoded({ extended: true }));

const dboperations = require('./dboperation.js');
var express = require('express')
var bodyParser = require('body-parser')
const cors = require('cors');
const upload = require('./file-upload');

var app = express()
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.listen(3500);

 
app.get("/api/AllUserData", (request, response) => {
 dboperations.getUserData().then(result => {
      response.json(result[0]);
   })

});
app.post('/api/v1/upload', upload.array('image', 1), (req, res) => {
     console.log('inside server.js upload')
   
   res.send({ image: req.file });
 });

app.post("/api/newUser", function (req, res) {
   dboperations.addUserData(req.body).then(req,res,err => {
      if (err) throw err;
      console.log('Replaced!');
        })
   res.status(200).send(200, {"statusCode":200});
});
const port = process.env.port || '3500';
app.set('port', port);
// const server = http.createServer(app);
// server.listen(port, () => { console.log(`Running on localhost:${port}`) });