import { useState, useEffect } from 'react';
import { getPoseData } from '../utils/poseDataAPI.js';

const DisplayPoseData = () => {
  const [poseData, setPoseData] = useState([]);

  useEffect(() => {
    const fetchPoseData = async () => {
      try {
        const data = await getPoseData();
        setPoseData(data);
      } catch (error) {
        console.error('Error fetching pose data:', error);
      }
    };

    fetchPoseData();
  }, []);

  return (
    <div>
      <h2>Saved Pose Data</h2>
      {poseData.length === 0 ? (
        <p>No pose data available.</p>
      ) : (
        <ul>
          {poseData.map((pose, index) => (
            <li key={index}>
              {pose.label}: {JSON.stringify(pose.inputs)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayPoseData;
