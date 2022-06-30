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

         //Get all task
     app.get('/task', async (req,res) =>{
        const query = {};
        const cursor = taskCollection.find(query);
        const tasks= await cursor.toArray();
        res.send(tasks)
       })

        //delete task
     app.delete('/task/:id', async(req, res) => {
        const id = req.params.id;
        const query ={_id: ObjectId(id)}
        const result = await taskCollection.deleteOne(query);
        res.send(result);
       })

       app.get('/task/:id', async (req,res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await taskCollection.findOne(query);
        res.send(result);
       })

        //  update task 
    app.put('/task/:id', async(req, res) =>{
        const id = req.params.id;
        const updatedTask = req.body;
        const filter = {_id: ObjectId(id)};
        const options ={upsert : true};
        const updatedDoc ={
          $set:{
            name: updatedTask.name,
         
          }
        }
        const result = await taskCollection.updateOne(filter, updatedDoc, options);
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
