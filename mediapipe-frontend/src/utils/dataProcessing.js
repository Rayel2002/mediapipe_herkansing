export const savePoseData = async (poseData) => {
    try {
      const response = await fetch('/api/poses/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ poses: poseData }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('There was an error saving the pose data!', error);
    }
  };
  
  export const trainModel = async () => {
    try {
      const response = await fetch('/api/poses/train', {
        method: 'POST'
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('There was an error training the model!', error);
    }
  };
  
  export const predictPose = async (pose) => {
    try {
      const response = await fetch('/api/poses/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pose }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log("Prediction:", data.prediction);
      return data.prediction;
    } catch (error) {
      console.error('There was an error predicting the pose!', error);
    }
  };
  
  export const calculateAccuracy = async () => {
    try {
      const response = await fetch('/api/poses/accuracy');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log("Accuracy:", data.accuracy);
      return data.accuracy;
    } catch (error) {
      console.error('There was an error calculating accuracy!', error);
    }
  };
  
  export const getConfusionMatrix = async () => {
    try {
      const response = await fetch('/api/poses/confusion-matrix');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log("Confusion Matrix:", data.confusionMatrix);
      return data.confusionMatrix;
    } catch (error) {
      console.error('There was an error getting the confusion matrix!', error);
    }
  };
  