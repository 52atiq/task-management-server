const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port = process.env.PORT || 8000;

// user:task-management
// pass:PvCRmuz9doINUH5o
//use Middleware
app.use(cors())
app.use(express.json())


const uri = "mongodb+srv://task-management:PvCRmuz9doINUH5o@cluster0.skppegl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async  function run(){
    try{
        await client.connect()
        const taskCollection = client.db('taskManagement').collection('task')
        app.post('/task', async(req, res) =>{
            const newTask = req.body;
            const result = await taskCollection.insertOne(newTask);
            res.send(result)
        })
    }
     finally{

     }
}
run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('running  task Management server')
})
app.listen(port, () =>{
    console.log('Task management working ')
})
