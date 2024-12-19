import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`\nMongoDB - ${con.connection.host}`);
  } catch (error) {
    console.error(`Error in Connection ${error.message}`);

    // ! 1 - Failure
    process.exit(1);
    // * 0 - Success
  }
};

export default connectDB;
