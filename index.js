const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;


//middleware

app.use(cors())
app.use(express());




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zlgqora.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const menuCollection = client.db("tidbits").collection("menu");
    const reviewCollection = client.db("tidbits").collection("review");
    const cartCollection = client.db("tidbits").collection("carts");

    app.get('/menu', async(req,res)=>{
        const result = await menuCollection.find().toArray();
        res.send(result)

    })
    app.get('/review', async(req,res)=>{
        const result = await reviewCollection.find().toArray();
        res.send(result)

    })


    //Cart Collection

    app.post('/carts', async(req,res)=>{
      const item = req.body;
      const result = await cartCollection.insertOne(item);
      res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res)=>{

    res.send("Tasty Tidbits is Running")
} )
app.listen(port, ()=>{
    console.log(`tasty Tidbits is running on port ${port}`)
})