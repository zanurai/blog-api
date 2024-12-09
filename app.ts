const express = require("express");
const cors = require("cors");
import cookieParser from "cookie-parser";

import connectdb from "./config/db";
import userRouter from "./routes/user-route";
import blogRouter from "./routes/blog-route";
import { NextFunction, Request, Response } from "express";
import { errorHandler, notFound } from "./middleware/error-middleware";

import dotenv from "dotenv";
import path from "path";



dotenv.config();

connectdb();

const app = express();

const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cookieParser());

app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

app.use("/api/users", userRouter);
app.use("/api/users/blog", blogRouter);

app.get("/", (req: Request, res: Response) => res.send("Server is ready"));

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
