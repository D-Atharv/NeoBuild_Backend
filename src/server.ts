import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./config/db";
import { PORT } from "./config/dotenv";
import auth from "./routes/auth_routes"

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", auth);


app.listen(PORT, async() => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectDB();
});
