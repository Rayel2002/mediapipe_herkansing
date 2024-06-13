import express from "express";
import {
  savePoseDataHandler,
  getPoseDataHandler,
  trainModelHandler,
  predictPoseHandler,
  calculateAccuracyHandler,
  getConfusionMatrixHandler,
} from "../controller/poseController.js";

const router = express.Router();

router.post("/save", savePoseDataHandler);
router.get("/", getPoseDataHandler);
router.post("/train", trainModelHandler);
router.post("/predict", predictPoseHandler);
router.get("/accuracy", calculateAccuracyHandler);
router.get("/confusion-matrix", getConfusionMatrixHandler);

export default router;
