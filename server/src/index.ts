import express from "express";
import { initDB } from "../src/database/database";
import videosRouter from "./routes/videosRouter";
import { Request, Response, NextFunction } from "express";
import path from "path";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = 3001;

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/v1/videos", videosRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: "error",
    message: error.message,
  });
});

app.listen(port, async () => {
  await initDB();
  console.log("✅ Server running at http://localhost:3001");
});

// ! taskkill /F /IM node.exe /T