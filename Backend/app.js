import express from "express";
import config from "../env.config.js";

import authRoutes from "./routes/user.routes.js";
import connectDB from "./db/configDB.js";
import cookieParser from "cookie-parser";
import path from "path";

import { rateLimit } from "express-rate-limit";
import { rateLimitHandler } from "./utils/rateLimitHandler.js";
import helmet from "helmet";
// ? import morgan from "morgan";
import cors from "cors";

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 3000;

app.use(express.json()); // * Middleware to parse json Payload
app.use(cookieParser()); // * Allow to parse Cookies

// ! HTTP logger - debugging Purpose
// ? app.use(morgan("dev"));

// ! setting various HTTP headers - hide X-Powered-By
app.use(helmet());

// ! use Rate Limiter to all Routes
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 5 * 12 requests per window
  handler: rateLimitHandler,
  statusCode: 429,
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

// * Authentication Routes
app.use("/api/auth", authRoutes);

// ? REACT APP START
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}
// ? REACT APP END

app.listen(port, async () => {
  connectDB();

  console.log(`Server Running : http://localhost:${port}`);
});
