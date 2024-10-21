import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
   
  })
);

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// Import Routes
import userRouter from "./routes/user.routes.js";
import errorHandler from "./middlewares/errorHandling.middleware.js";
import transactionRouter from "./routes/transaction.routes.js";
import requestRouter from "./routes/request.routes.js";
import adminRouter from "./routes/admin.routes.js";

// Declare Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/admin", adminRouter);

app.use(errorHandler);

export { app };
