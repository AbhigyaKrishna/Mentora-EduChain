// src/pages/Rewards.jsx

import React from 'react';

const Rewards = () => {
  // Sample data for rewards
  const rewards = [
    { id: 1, name: 'Course Completion Badge', description: 'Awarded for completing the JavaScript course.' },
    { id: 2, name: 'Top Performer Medal', description: 'Awarded for outstanding performance in the Python course.' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Rewards</h1>
      <ul>
        {rewards.map((reward) => (
          <li key={reward.id} className="mb-4 p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{reward.name}</h2>
            <p className="text-gray-600">{reward.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rewards;