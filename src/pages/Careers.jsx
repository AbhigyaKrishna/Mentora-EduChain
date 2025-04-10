import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBriefcase, FaCode, FaChartLine, FaShieldAlt, FaServer, FaPencilAlt,
  FaMicroscope, FaTasks, FaPalette, FaCogs, FaCoins, FaExchangeAlt
} from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Careers = () => {
  const { theme } = useTheme();

  const careers = [
    {
      title: 'Blockchain Developer',
      icon: <FaCode className="text-blue-500" />,
      description: 'Design and implement blockchain protocols and smart contracts. Work with technologies like Solidity, Web3.js, and various blockchain platforms.',
      requirements: [
        'Strong programming background',
        'Experience with blockchain technologies',
        'Knowledge of cryptography',
        'Smart contract development expertise'
      ],
      salary: '$100,000 - $150,000'
    },
    {
      title: 'DeFi Protocol Engineer',
      icon: <FaChartLine className="text-green-500" />,
      description: 'Develop and maintain decentralized finance protocols. Create innovative financial instruments and ensure protocol security.',
      requirements: [
        'DeFi ecosystem experience',
        'Financial systems knowledge',
        'Smart contract auditing',
        'Protocol optimization skills'
      ],
      salary: '$120,000 - $180,000'
    },
    {
      title: 'Smart Contract Security Auditor',
      icon: <FaShieldAlt className="text-red-500" />,
      description: 'Audit smart contracts for vulnerabilities and ensure protocol security. Implement best practices for secure blockchain development.',
      requirements: [
        'Security analysis expertise',
        'Smart contract development experience',
        'Bug bounty experience',
        'Audit report writing'
      ],
      salary: '$130,000 - $200,000'
    },
    {
      title: 'Backend Blockchain Engineer',
      icon: <FaServer className="text-purple-500" />,
      description: 'Build and maintain blockchain infrastructure. Develop APIs and backend services for blockchain applications.',
      requirements: [
        'Backend development experience',
        'Distributed systems knowledge',
        'API development',
        'Database management'
      ],
      salary: '$90,000 - $140,000'
    },
    {
      title: 'Technical Content Writer',
      icon: <FaPencilAlt className="text-yellow-500" />,
      description: 'Create technical documentation and educational content for blockchain platforms and protocols.',
      requirements: [
        'Strong writing skills',
        'Technical background',
        'Blockchain knowledge',
        'Documentation experience'
      ],
      salary: '$70,000 - $100,000'
    },
    {
      title: 'Blockchain Research Scientist',
      icon: <FaMicroscope className="text-blue-500" />,
      description: 'Conduct research on blockchain scalability, consensus mechanisms, and novel cryptographic solutions.',
      requirements: [
        'PhD in Computer Science or related field',
        'Research publication experience',
        'Cryptography expertise',
        'Protocol design knowledge'
      ],
      salary: '$130,000 - $190,000'
    },
    {
      title: 'Web3 Product Manager',
      icon: <FaTasks className="text-indigo-500" />,
      description: 'Lead product strategy and development for Web3 applications. Bridge technical and business requirements.',
      requirements: [
        'Product management experience',
        'Web3 domain knowledge',
        'Agile methodology',
        'Stakeholder management'
      ],
      salary: '$110,000 - $170,000'
    },
    {
      title: 'NFT Platform Developer',
      icon: <FaPalette className="text-pink-500" />,
      description: 'Build NFT marketplaces and tools. Implement token standards and develop NFT-related smart contracts.',
      requirements: [
        'NFT standard expertise',
        'Frontend development',
        'Marketplace experience',
        'Asset management systems'
      ],
      salary: '$95,000 - $145,000'
    },
    {
      title: 'Blockchain DevOps Engineer',
      icon: <FaCogs className="text-gray-500" />,
      description: 'Manage blockchain infrastructure, node deployment, and network maintenance. Implement monitoring solutions.',
      requirements: [
        'DevOps experience',
        'Node management',
        'Infrastructure automation',
        'Security best practices'
      ],
      salary: '$100,000 - $160,000'
    },
    {
      title: 'Tokenomics Designer',
      icon: <FaCoins className="text-yellow-600" />,
      description: 'Design and implement token economics models. Create sustainable token distribution and incentive mechanisms.',
      requirements: [
        'Economics background',
        'Token design experience',
        'Game theory knowledge',
        'Financial modeling'
      ],
      salary: '$115,000 - $175,000'
    },
    {
      title: 'Smart Contract Auditor',
      icon: <FaShieldAlt className="text-red-500" />,
      description: 'Perform comprehensive security audits of smart contracts. Identify vulnerabilities and provide remediation guidance.',
      requirements: [
        'Smart contract expertise',
        'Security background',
        'Audit experience',
        'Bug bounty participation'
      ],
      salary: '$140,000 - $200,000'
    },
    {
      title: 'DeFi Protocol Engineer',
      icon: <FaExchangeAlt className="text-green-500" />,
      description: 'Design and implement decentralized finance protocols. Build lending, trading and yield farming systems.',
      requirements: [
        'DeFi protocol knowledge',
        'Financial engineering',
        'Solidity mastery',
        'Testing frameworks'
      ],
      salary: '$120,000 - $180,000'
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
          <h1 className="text-4xl font-bold mb-4">Careers in Web3</h1>
          <p className={`text-lg ${theme.text.secondary} max-w-2xl mx-auto`}>
            Join the future of technology and finance. Explore exciting career opportunities in the Web3 space.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${theme.card} rounded-xl p-6 shadow-lg`}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-opacity-20 bg-blue-500">
                  {career.icon}
                </div>
                <h2 className="text-xl font-semibold ml-4">{career.title}</h2>
              </div>
              
              <p className={`${theme.text.secondary} mb-4`}>{career.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Requirements:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {career.requirements.map((req, i) => (
                    <li key={i} className={`${theme.text.secondary} text-sm`}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className={`${theme.primary} text-white px-4 py-2 rounded-full text-center mt-4`}>
                {career.salary}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
