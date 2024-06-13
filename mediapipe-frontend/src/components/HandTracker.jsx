import { useRef, useEffect, useState } from "react";
import { Hands } from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import * as mpHands from "@mediapipe/hands";
import PoseDataCollector from "./PoseDataCollector";
import { savePoseData } from "../utils/poseDataAPI.js"; // Import the API functions
import { drawConnectors, drawLandmarks } from "../utils/drawingUtils"; // Importeer de helper functies

const HandTracking = () => {
  const videoRef = useRef(null); // Referentie naar het video element
  const canvasRef = useRef(null); // Referentie naar het canvas element
  const cameraRef = useRef(null); // Referentie naar de camera

  const [poseData, setPoseData] = useState([]); // State voor het opslaan van pose data
  const [isSaving, setIsSaving] = useState(false); // State voor het togglen van het opslaan van pose data

  // useEffect hook om het MediaPipe Hands model te initialiseren
  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 2, // Maximaal aantal handen om te detecteren
      modelComplexity: 1, // Model complexiteit
      minDetectionConfidence: 0.5, // Minimale detectie betrouwbaarheid
      minTrackingConfidence: 0.5, // Minimale tracking betrouwbaarheid
    });

    hands.onResults(onResults); // Callback voor wanneer er resultaten zijn

    // Camera initialiseren
    if (videoRef.current) {
      cameraRef.current = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current }); // Stuur video frames naar het MediaPipe Hands model
        },
        width: 1280,
        height: 720,
      });

      cameraRef.current.start(); // Start de camera
    }

    // Callback functie voor wanneer er resultaten zijn
    async function onResults(results) {
      const canvasCtx = canvasRef.current.getContext("2d"); // Canvas context ophalen
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Canvas schoonmaken
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height); // Teken het videoframe

      if (results.multiHandLandmarks) { // Als er handen zijn gedetecteerd
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

          const landmarksData = landmarks.map((lm) => ({ x: lm.x, y: lm.y })); // Zet landmarks om naar een eenvoudig formaat
          newPoseData.push({ inputs: landmarksData, label: "pose_label" }); // Voeg de nieuwe pose data toe
        });

        setPoseData((prevData) => [...prevData, ...newPoseData]); // Update de state met de nieuwe pose data

        // Sla nieuwe pose data op in de database als de toggle aan is
        if (isSaving) {
          try {
            await savePoseData(newPoseData);
          } catch (error) {
            console.error('Error saving pose data:', error);
          }
        }
      }
      canvasCtx.restore();
    }

    // Cleanup functie om de camera te stoppen wanneer de component unmount
    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
    };
  }, [isSaving]); // isSaving als dependency toevoegen zodat de effect opnieuw wordt uitgevoerd bij verandering

  const toggleSaving = () => {
    setIsSaving(prevState => !prevState); // Toggle de isSaving state
  };

  return (
    <div>
      <button onClick={toggleSaving}>
        {isSaving ? 'Stop Saving Pose Data' : 'Start Saving Pose Data'}
      </button>
      <video ref={videoRef} style={{ display: "none" }}></video> {/* Verborgen video element voor het camera beeld */}
      <canvas ref={canvasRef} width="1280" height="720" style={{ width: "100%" }}></canvas> {/* Canvas element voor het tekenen van resultaten */}
      <PoseDataCollector poseData={poseData} /> {/* Component voor het verzamelen van pose data */}
    </div>
  );
};

export default HandTracking;
