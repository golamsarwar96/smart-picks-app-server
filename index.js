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
    const recommendationCollection = client
      .db("smartpicksDB")
      .collection("recommendations");

    //Creating New Queries
    app.post("/add-queries", async (req, res) => {
      const query = req.body;
      const result = await queryCollection.insertOne(query);
      console.log(query);
      res.send(result);
    });

    //Showing Queries in the client site
    app.get("/add-queries", async (req, res) => {
      // const search = req.query.search;
      // console.log(search);
      // let query = { $regex: new RegExp(query, "i") };
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

    //Update a specific query
    app.get("/query/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await queryCollection.findOne(query);
      res.send(result);
    });

    app.put("/update-query/:id", async (req, res) => {
      const id = req.params.id;
      const queryData = req.body;
      const updated = {
        $set: queryData,
      };
      const query = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const result = await queryCollection.updateOne(query, updated, options);
      console.log(result);
      res.send(result);
    });

    //recommendation collection
    app.post("/add-recommendation", async (req, res) => {
      const query = req.body;
      const result = await recommendationCollection.insertOne(query);

      const filter = { _id: new ObjectId(query.queryID) };
      console.log(filter);
      const update = {
        $inc: { recommendedCount: 1 },
      };
      const updateRecommendCount = await queryCollection.updateOne(
        filter,
        update
      );
      console.log(updateRecommendCount);
      console.log(query);
      res.send(result);
    });

    //All recommendations here
    app.get("/add-recommendation", async (req, res) => {
      const result = await recommendationCollection.find().toArray();
      res.send(result);
    });

    //get all recommendation posted by a user.
    app.get("/recommendation/:email", async (req, res) => {
      const email = req.params.email;
      const query = { rc_email: email };
      const result = await recommendationCollection.find(query).toArray();
      res.send(result);
    });

    app.delete("/recommendation/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      //get the product that we have recommended. Cause we are specifically changing a products recommended value.
      const recommendationToDelete = await recommendationCollection.findOne(
        query
      );
      if (recommendationToDelete) {
        const filter = { _id: new ObjectId(recommendationToDelete.queryID) };
        const update = {
          $inc: { recommendedCount: -1 },
        };
        const updateResult = await queryCollection.updateOne(filter, update);
        console.log(updateResult);
      }
      const result = await recommendationCollection.deleteOne(query);
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
