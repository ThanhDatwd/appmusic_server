const express = require('express')
const morgan = require('morgan');
const path = require('path');
const multer  = require("multer");
const  customId = require("custom-id");
const fileUpload=require('express-fileupload')
const bodyParser = require('body-parser')


const dotenv = require('dotenv')
dotenv.config()


const route =require('./routes/index')
const db = require('./config/db');
const app = express()

db.connect()

app.use (bodyParser.json ({limit: '50mb', Extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb',
                               parameterLimit: 100000, 
                               extended: true }));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin',"*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader("Access-Control-Max-Age", "5800");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(morgan('combined'));
route(app)

console.log(process.env.NAME_SECRET_KEY)
app.listen(3001)