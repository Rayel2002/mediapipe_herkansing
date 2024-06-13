import { useEffect, useRef } from 'react';
import { Hands } from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils';
import * as mpHands from '@mediapipe/hands';

const HandTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

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

    function onResults(results) {
      const canvasCtx = canvasRef.current.getContext('2d');
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          drawConnectors(canvasCtx, landmarks, mpHands.HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
          drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
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

  return (
    <div>
      <video ref={videoRef} style={{ display: 'none' }}></video>
      <canvas ref={canvasRef} width="1280" height="720" style={{ width: '100%' }}></canvas>
    </div>
  );
};

function drawConnectors(ctx, landmarks, connections, { color, lineWidth }) {
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
}

function drawLandmarks(ctx, landmarks, { color, lineWidth }) {
  ctx.fillStyle = color;
  ctx.lineWidth = lineWidth;

  landmarks.forEach((landmark) => {
    ctx.beginPath();
    ctx.arc(landmark.x * ctx.canvas.width, landmark.y * ctx.canvas.height, lineWidth, 0, 2 * Math.PI);
    ctx.fill();
  });
}

export default HandTracking;
