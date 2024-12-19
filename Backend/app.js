import express from "express";
import config from "../env.config.js";

import authRoutes from "./routes/user.routes.js";
import connectDB from "./db/configDB.js";

const app = express();

app.use(express.json()); // * Middleware to parse json Payload

app.use("/api/auth", authRoutes);

const port = config.PORT || 3000;
app.listen(port, async () => {
  connectDB();

  console.log(`Server Running : http://localhost:${port}`);
});
