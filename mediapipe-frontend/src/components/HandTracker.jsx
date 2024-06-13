import { useRef, useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import * as mpHands from "@mediapipe/hands";
import PoseDataCollector from "./PoseDataCollector";
import { savePoseData, getPoseData } from "../utils/poseDataAPI.js"; // Import the API functions

const HandTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const [poseData, setPoseData] = useState([]);

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    if (videoRef.current) {
      cameraRef.current = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current });
        },
        width: 1280,
        height: 720,
      });

      cameraRef.current.start();
    }

    async function onResults(results) {
      const canvasCtx = canvasRef.current.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.multiHandLandmarks) {
        const newPoseData = [];

        results.multiHandLandmarks.forEach((landmarks) => {
          drawConnectors(canvasCtx, landmarks, mpHands.HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5,
          });
          drawLandmarks(canvasCtx, landmarks, {
            color: "#FF0000",
            lineWidth: 2,
          });

          const landmarksData = landmarks.map((lm) => ({ x: lm.x, y: lm.y }));
          newPoseData.push({ inputs: landmarksData, label: "pose_label" }); // replace "pose_label" with actual label
        });

        setPoseData((prevData) => [...prevData, ...newPoseData]);

        // Save new pose data to the database
        try {
          await savePoseData(newPoseData);
        } catch (error) {
          console.error('Error saving pose data:', error);
        }
      }
      canvasCtx.restore();
    }

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    // Fetch existing pose data from the database when the component mounts
    const fetchData = async () => {
      try {
        const data = await getPoseData();
        setPoseData(data);
      } catch (error) {
        console.error('Error fetching pose data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }}></video>
      <canvas ref={canvasRef} width="1280" height="720" style={{ width: "100%" }}></canvas>
      <PoseDataCollector poseData={poseData} />
    </div>
  );
};

const drawConnectors = (ctx, landmarks, connections, { color, lineWidth }) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

  connections.forEach(([i, j]) => {
    const point1 = landmarks[i];
    const point2 = landmarks[j];
    ctx.beginPath();
    ctx.moveTo(point1.x * ctx.canvas.width, point1.y * ctx.canvas.height);
    ctx.lineTo(point2.x * ctx.canvas.width, point2.y * ctx.canvas.height);
    ctx.stroke();
  });
};

const drawLandmarks = (ctx, landmarks, { color, lineWidth }) => {
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;

  landmarks.forEach((landmark) => {
    ctx.beginPath();
    ctx.arc(landmark.x * ctx.canvas.width, landmark.y * ctx.canvas.height, lineWidth, 0, 2 * Math.PI);
    ctx.fill();
  });
};

export default HandTracking;
