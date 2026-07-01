import path from "node:path";
import fs from "node:fs/promises";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import studentsRoutes from "./routes/studentsRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,PATCH,POST,DELETE",
  }),
);
app.use(helmet());
app.use(express.json());

app.use(studentsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});
