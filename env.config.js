import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// ? console.log(path.resolve(process.cwd(), ".env"));

const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
};

export default config;
