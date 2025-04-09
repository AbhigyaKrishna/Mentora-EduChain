// src/pages/Certificates.jsx

import React from 'react';

const Certificates = () => {
  // Sample data for certificates
  const certificates = [
    { id: 1, name: 'JavaScript Mastery', nftLink: 'https://example.com/nft/js-mastery' },
    { id: 2, name: 'Python Proficiency', nftLink: 'https://example.com/nft/python-proficiency' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">NFT Certificates</h1>
      <ul>
        {certificates.map((certificate) => (
          <li key={certificate.id} className="mb-4 p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{certificate.name}</h2>
            <a href={certificate.nftLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View NFT
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certificates;