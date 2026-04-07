import dotenv from "dotenv";
dotenv.config();



import express from "express";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

import connectDB from "./config/mongoDBConfig.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// 🔥 Fix for ES modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



console.log("ENV CHECK:", process.env.MONGO_URI);

// ✅ Connect DB
connectDB();

const app = express();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/users", userRoutes);
app.use("/student", studentRoutes);
app.use("/attendance", attendanceRoutes);

// Static frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});