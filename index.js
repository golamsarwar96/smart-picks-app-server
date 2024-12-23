require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i16dm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const queryCollection = client.db("smartpicksDB").collection("queries");

    //Creating New Queries
    app.post("/add-queries", async (req, res) => {
      const query = req.body;
      const result = await queryCollection.insertOne(query);
      console.log(query);
      res.send(result);
    });

    //Showing Queries in the client site
    app.get("/add-queries", async (req, res) => {
      const result = await queryCollection.find().toArray();
      res.send(result);
    });

    //Get all queries posted by a specific user
    app.get("/queries/:email", async (req, res) => {
      const email = req.params.email;
      const query = { "buyer.user_email": email };
      const result = await queryCollection.find(query).toArray();
      res.send(result);
    });

    //Delete a Specific Query
    app.delete("/query/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await queryCollection.deleteOne(query);
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Smart Picks Running at port: ${port}`);
});
