import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// ? console.log(path.resolve(process.cwd(), ".env"));

const config = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI,

  NODE_ENV: process.env.NODE_ENV,

  MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
};

export default config;
