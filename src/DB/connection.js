import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
 mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB Connection"))
  .catch((err) => console.error(err));
};

export default connectDB;
