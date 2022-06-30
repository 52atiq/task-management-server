const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port = process.env.PORT || 5000;

// user:task-management
// pass:PvCRmuz9doINUH5o
//use Middleware
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://task-management:PvCRmuz9doINUH5o@cluster0.skppegl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


