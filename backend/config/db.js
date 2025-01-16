import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${res.connection.host}:${res.connection.port} ✌`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure code
  }
};

export default connectDB;
