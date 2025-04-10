import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Instructors = () => {
  const { theme } = useTheme();

  const instructors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Senior Blockchain Developer',
      image: 'https://randomuser.me/api/portraits/women/32.jpg',
      bio: 'Dr. Chen has over 10 years of experience in blockchain development and smart contract security. She previously worked at major tech companies and now focuses on teaching the next generation of Web3 developers.',
      specialties: ['Smart Contracts', 'DeFi', 'Blockchain Architecture'],
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        website: 'https://example.com'
      }
    },
    {
      id: 2,
      name: 'James Wilson',
      title: 'Full Stack Web3 Engineer',
      image: 'https://randomuser.me/api/portraits/men/44.jpg',
      bio: 'James brings practical industry experience to his teaching, having built several successful DApps. He specializes in React and Solidity development with a focus on scalable architecture.',
      specialties: ['React', 'Solidity', 'Web3.js'],
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        website: 'https://example.com'
      }
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      title: 'Cryptography Expert',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      bio: 'With a PhD in Applied Cryptography, Maria helps students understand the fundamental security principles behind blockchain technology. She has published numerous papers on zero-knowledge proofs.',
      specialties: ['Cryptography', 'Zero-Knowledge Proofs', 'Protocol Design'],
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        website: 'https://example.com'
      }
    }
    ,
    {
      id: 4,
      name: 'Dr. Alex Thompson',
      title: 'DeFi Protocol Architect',
      image: 'https://randomuser.me/api/portraits/men/52.jpg',
      bio: 'Dr. Thompson specializes in DeFi protocol design and implementation. With experience at leading DeFi projects, he brings practical insights into building secure and efficient decentralized financial systems.',
      specialties: ['DeFi Protocols', 'Token Economics', 'Smart Contract Auditing'],
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        website: 'https://example.com'
      }
    },
    {
      id: 5,
      name: 'Emily Zhang',
      title: 'NFT & Gaming Expert',
      image: 'https://randomuser.me/api/portraits/women/89.jpg',
      bio: 'Emily is a pioneer in blockchain gaming and NFT development. She has helped launch several successful NFT marketplaces and advises Web3 gaming startups on technical implementation.',
      specialties: ['NFT Development', 'Game Smart Contracts', 'ERC Standards'],
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        website: 'https://example.com'
      }
    },
    {
      id: 6,
      name: 'Marcus Johnson',
      title: 'Layer 2 Solutions Specialist',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      bio: 'Marcus focuses on scaling solutions and Layer 2 technologies. His expertise in rollups and state channels helps students understand advanced blockchain scaling concepts.',
      specialties: ['Layer 2 Scaling', 'Rollups', 'State Channels'],
      social: {
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        website: 'https://example.com'
      }
    }
  ];

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text.primary} py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Meet Our Expert Instructors</h1>
          <p className={`text-lg ${theme.text.secondary} max-w-2xl mx-auto`}>
            Learn from industry professionals with years of experience in blockchain development and Web3 technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme.card} rounded-xl p-6 shadow-lg`}
            >
              <div className="flex flex-col items-center">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h2 className="text-xl font-semibold">{instructor.name}</h2>
                <p className={`${theme.text.secondary} mb-4`}>{instructor.title}</p>
                
                <p className="text-sm mb-4 text-center">{instructor.bio}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold mb-2">Specialties:</h3>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-sm ${theme.primary} text-white`}
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a href={instructor.social.linkedin} className="text-blue-500 hover:text-blue-600">
                    <FaLinkedin size={24} />
                  </a>
                  <a href={instructor.social.github} className="text-gray-700 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
                    <FaGithub size={24} />
                  </a>
                  <a href={instructor.social.website} className="text-green-500 hover:text-green-600">
                    <FaGlobe size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Instructors;
