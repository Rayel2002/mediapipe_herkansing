import express from "express";
import bodyParser from "body-parser";
import poseRoutes from './routes/poseRoutes.js';
import "dotenv/config";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});

app.use('/poseData', poseRoutes);
export default app;
