import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.CONNECTION_STRING as string
    );
    console.log("mongoDB connection successfully");
  } catch (error) {
   
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("Unknown error occurred");
    }
    process.exit(1);
  }
};

export default connectdb;
