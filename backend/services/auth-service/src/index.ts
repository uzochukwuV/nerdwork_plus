import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import { globalErrorHandler, globalNotFoundHandler } from "./middleware/common.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "healthy", 
    service: "auth-service",
    timestamp: new Date().toISOString() 
  });
});

app.use(globalNotFoundHandler);
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Auth Service running at http://localhost:${PORT}`);
  });
}

export { app };