import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Benefits: React.FC = () => {
  const { ranking } = useSelector((state: RootState) => state.esg);
  const { user } = useSelector((state: RootState) => state.auth);

  const userRank = ranking.findIndex(rankUser => rankUser.userId === user?.uid);

  if (userRank >= 0 && userRank < 3) {
    // Logic to allow user to redeem points
    return (
      <div>
        <h2>Redeem Your Points</h2>
        <button>Redeem</button>
      </div>
    );
  }

  return null;
};

export default Benefits;
