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
    await savePoseData(poseData);
  };

  const handleTrain = async () => {
    await trainModel();
  };

  const handlePredict = async () => {
    const prediction = await predictPose(poseData[poseData.length - 1].inputs); // assuming the last pose is the one to predict
    console.log("Prediction:", prediction);
  };

  const handleCalculateAccuracy = async () => {
    const accuracy = await calculateAccuracy();
    console.log("Accuracy:", accuracy);
  };

  const handleGetConfusionMatrix = async () => {
    const matrix = await getConfusionMatrix();
    console.log("Confusion Matrix:", matrix);
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
