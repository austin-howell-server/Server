import express from "express";
import tokenRouter from "./routes/token.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("starting server");
});

app.use("/defy", tokenRouter);

export default app;