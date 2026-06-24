import path from "node:path";
import fs from "node:fs/promises";
import express from "express";
import cors from "cors";

const carsPath = path.join(import.meta.dirname, "..", "assets/cars.json");
// Top level await
const carsJson = await fs.readFile(carsPath, "utf-8");
const cars = JSON.parse(carsJson);

const app = express();

app.use(cors());
// localhost:3005 (a.com)
// localhost:5173 (b.com)

app.get("/cars", (req, res) => {
  res.status(200).json(cars);
});

app.get("/cars/:carId", (req, res) => {
  const { carId } = req.params;

  const car = cars.find((c) => c.id === carId);
  if (!car) {
    res.status(404).json({ msg: "Car not found" });
  }

  res.status(200).json(car);
});

app.listen(3005, () => {
  console.log("Server is running on localhost:3005");
});
