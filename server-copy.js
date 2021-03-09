const express = require('express');
const app = new express();
const http=require('http');
const path=require('path');
const cors=require('cors');
var fs = require('fs');
var router = express.Router();
app.use(express.json({limit:105906176,extended:true}));
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(cors({origin: '*'}));
router.options('/api', cors()); // ADDED 
const dboperations=require('./dboperation.js');
// router.use((request,response,next)=>{
//     console.log('middleware');
//     next();
//  })

 app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
    // router.options('/api', cors()); // ADDED 
    // router.get('/AllUserData', cors(), (req, res) => {
    //     dboperations.getUserData().then(result => {
    //         res.json(result[0]);
    //              })  
    //  })// ADDED
 router.route('/AllUserData').get( (request,response)=>{
    // response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

     dboperations.getUserData().then(result => {
        response.json(result[0]);
     })
 
 })
 const port=process.env.port||'3500';
app.set('port',port);
const server=http.createServer(app);
server.listen(port,()=>{console.log(`Running on localhost:${port}`)});