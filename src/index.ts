import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import myListRoutes from "./routes/myListRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/mylist", myListRoutes);
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Connected to MongoDb");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
