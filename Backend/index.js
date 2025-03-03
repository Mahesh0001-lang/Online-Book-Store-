import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const port = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;
// const URI = 'mongodb://127.0.0.1:27017/bookStore'

// Conncet to mongoDb
try {
    await mongoose.connect(URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/book",bookRoute);
app.use("/user",userRoute);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
      