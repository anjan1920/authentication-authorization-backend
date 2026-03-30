import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import './config/redis_connect.js'  // radis connection on startup

const app = express();
app.set("trust proxy", 1);
// basic configurations
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// cors configurations
app.use(
  cors({
    origin: [
       process.env.CLIENT_URL
      // "http://localhost:5500", //when frontend running in localhost
      // "http://127.0.0.1:5500",
       
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


//import the routes
import  adminRouter from "./routes/admin.routes.js"
import authRouter from "./routes/auth.routes.js";


//
app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

//routes
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/auth", authRouter);

//home page
app.get("/", (req, res) => {
  console.log("Home page hit..");
  res.send("Welcome to Home");
});

// global err handle 

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    ...(err.message && err.message !== "" && { message: err.message }),
    ...(err.errors && { errors: err.errors }),
  });
});

export default app;