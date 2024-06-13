import PropTypes from 'prop-types';
import {
  savePoseData,
  trainModel,
  predictPose,
  calculateAccuracy,
  getConfusionMatrix,
} from '../utils/dataProcessing.js';

const PoseDataCollector = ({ poseData }) => {
  const handleSave = async () => {
    try {
      await savePoseData(poseData);
    } catch (error) {
      console.error('There was an error saving the pose data!', error);
    }
  };

  const handleTrain = async () => {
    try {
      const response = await trainModel();
      console.log(response.message);
    } catch (error) {
      console.error('There was an error training the model!', error);
    }
  };

  const handlePredict = async () => {
    try {
      const prediction = await predictPose(poseData[poseData.length - 1].inputs);
      console.log('Prediction:', prediction);
    } catch (error) {
      console.error('There was an error predicting the pose!', error);
    }
  };

  const handleCalculateAccuracy = async () => {
    try {
      const accuracy = await calculateAccuracy();
      console.log('Accuracy:', accuracy);
    } catch (error) {
      console.error('There was an error calculating accuracy!', error);
    }
  };

  const handleGetConfusionMatrix = async () => {
    try {
      const matrix = await getConfusionMatrix();
      console.log('Confusion Matrix:', matrix);
    } catch (error) {
      console.error('There was an error getting the confusion matrix!', error);
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Save Pose Data</button>
      <button onClick={handleTrain}>Train Model</button>
      <button onClick={handlePredict}>Predict Pose</button>
      <button onClick={handleCalculateAccuracy}>Calculate Accuracy</button>
      <button onClick={handleGetConfusionMatrix}>Get Confusion Matrix</button>
    </div>
  );
};

PoseDataCollector.propTypes = {
  poseData: PropTypes.arrayOf(
    PropTypes.shape({
      inputs: PropTypes.arrayOf(
        PropTypes.shape({
          x: PropTypes.number.isRequired,
          y: PropTypes.number.isRequired,
        })
      ).isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PoseDataCollector;
