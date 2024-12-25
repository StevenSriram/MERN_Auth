import express from "express";
import config from "../env.config.js";

import authRoutes from "./routes/user.routes.js";
import connectDB from "./db/configDB.js";
import cookieParser from "cookie-parser";

import { rateLimit } from "express-rate-limit";
import { rateLimitHandler } from "./utils/rateLimitHandler.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

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
  max: 30, // Limit each IP to 30 requests per window
  message: "Too many requests, please try again after a minute.",
  handler: rateLimitHandler,
  headers: true,
});
app.use(limiter);

// ! Cross Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// * Testing Route
app.get("/", (_, res) => {
  res.status(200).send("Server Running...");
});

// * Authentication Routes
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  connectDB();

  console.log(`Server Running : http://localhost:${port}`);
});
