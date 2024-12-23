import express from "express";
import config from "../env.config.js";

import cookieParser from "cookie-parser";

import authRoutes from "./routes/user.routes.js";
import connectDB from "./db/configDB.js";

import { rateLimit } from "express-rate-limit";
import { rateLimitHandler } from "./utils/rateLimitHandler.js";

import helmet from "helmet";

import morgan from "morgan";

const app = express();

app.use(express.json()); // * Middleware to parse json Payload
app.use(cookieParser()); // * Allow to parse Cookies

// ! HTTP logger - debugging Purpose
app.use(morgan("dev"));

// ! setting various HTTP headers - hide X-Powered-By
app.use(helmet());

// ! use Rate Limiter to all Routes
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per window
  message: "Too many requests, please try again after a minute.",
  handler: rateLimitHandler,
  headers: true,
});
app.use(limiter);

// * Testing Route
app.get("/", (_, res) => {
  res.status(200).send("Server Running...");
});

app.use("/api/auth", authRoutes);

const port = config.PORT || 3000;
app.listen(port, async () => {
  connectDB();

  console.log(`Server Running : http://localhost:${port}`);
});
