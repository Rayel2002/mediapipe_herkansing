// Functie om lijnen te tekenen tussen de landmarks
export const drawConnectors = (ctx, landmarks, connections, { color, lineWidth }) => {
    ctx.strokeStyle = color; // Stel de kleur in
    ctx.lineWidth = lineWidth; // Stel de lijndikte in
  
    connections.forEach(([i, j]) => { // Voor elke verbinding tussen landmarks
      const point1 = landmarks[i];
      const point2 = landmarks[j];
      ctx.beginPath();
      ctx.moveTo(point1.x * ctx.canvas.width, point1.y * ctx.canvas.height); // Begin op de eerste landmark
      ctx.lineTo(point2.x * ctx.canvas.width, point2.y * ctx.canvas.height); // Teken naar de tweede landmark
      ctx.stroke(); // Teken de lijn
    });
  };
  
  // Functie om cirkels te tekenen op de landmarks
  export const drawLandmarks = (ctx, landmarks, { color, lineWidth }) => {
    ctx.fillStyle = color; // Stel de kleur in
    ctx.lineWidth = lineWidth; // Stel de lijndikte in
  
    landmarks.forEach((landmark) => {
      ctx.beginPath();
      ctx.arc(landmark.x * ctx.canvas.width, landmark.y * ctx.canvas.height, lineWidth, 0, 2 * Math.PI); // Teken een cirkel op de landmark positie
      ctx.fill(); // Vul de cirkel
    });
  };
  