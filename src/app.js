import path from "node:path";
import fs from "node:fs/promises";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import "dotenv/config";

const carsPath = path.join(import.meta.dirname, "..", "assets/cars.json");
// Top level await
const carsJson = await fs.readFile(carsPath, "utf-8");
const cars = JSON.parse(carsJson);

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,PATCH,POST,DELETE",
  }),
);
app.use(helmet());
// req.body
app.use(express.json());

const loggerMiddleware = (req, res, next) => {
  console.log(`loggerMiddleware: ${req.method} ${req.url}`);
  next();
};

const logTime = (req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()}`);
  next();
};

app.use(logTime);
app.use(loggerMiddleware);

app.get("/cars", (req, res) => {
  console.log("get cars controller");
  res.status(200).json(cars);
});

app.get("/cars/:carId", (req, res) => {
  console.log("get carById controller");
  const { carId } = req.params;

  const car = cars.find((c) => c.id === carId);
  if (!car) {
    res.status(404).json({ msg: "Car not found" });
  }

  res.status(200).json(car);
});

app.post("/cars", (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "new car" });
});

app.get("/my-error", (req, res) => {
  throw new Error("My custom erorr! HELP!");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd ? "Oops something went wrong 😑" : err.stack,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on localhost:${process.env.PORT}`);
});
