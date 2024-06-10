import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRanking } from '../../store/slices/esgSlice';
import { RootState, AppDispatch } from '../../store/store';

const Community: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { ranking, loading } = useSelector((state: RootState) => state.esg);

  useEffect(() => {
    dispatch(fetchRanking());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Community</h1>
      {ranking.map((user, index) => (
        <div key={index}>
          <p>User ID: {user.userId}</p>
          <p>Points: {user.points}</p>
        </div>
      ))}
    </div>
  );
};

export default Community;
