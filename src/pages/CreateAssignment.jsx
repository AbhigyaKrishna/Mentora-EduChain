import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAssignmentManager } from '../hooks/useAssignmentManager';
import { FaPlus, FaSpinner, FaTrash, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ipfsService from '../utils/ipfsStorage';

const CreateAssignment = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { getClient, error: contractError } = useAssignmentManager();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    question: '',
    evaluationCriteria: [''],
    metaPrompt: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCriteriaChange = (index, value) => {
    const newCriteria = [...formData.evaluationCriteria];
    newCriteria[index] = value;
    setFormData(prev => ({
      ...prev,
      evaluationCriteria: newCriteria
    }));
  };

  const addCriteriaBox = () => {
    setFormData(prev => ({
      ...prev,
      evaluationCriteria: [...prev.evaluationCriteria, '']
    }));
  };

  const removeCriteriaBox = (index) => {
    if (formData.evaluationCriteria.length > 1) {
      setFormData(prev => ({
        ...prev,
        evaluationCriteria: prev.evaluationCriteria.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Filter out empty criteria
      const validCriteria = formData.evaluationCriteria.filter(criteria => criteria.trim() !== '');
      
      if (validCriteria.length === 0) {
        throw new Error('At least one checkpoint is required');
      }

      // Upload meta prompt to IPFS
      const metaPromptHash = await ipfsService.uploadJSON({
        prompt: formData.metaPrompt
      });

      // Create assignment
      const result = await getClient().createAssignment(
        formData.title,
        formData.description,
        formData.question,
        validCriteria,
        metaPromptHash
      );

      // Navigate to assignments page on success
      navigate('/assignments');
    } catch (err) {
      setError(err.message || 'Failed to create assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${theme.background} ${theme.text.primary} py-12 px-4 sm:px-6 lg:px-8`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Assignment</h1>
          <p className={`${theme.text.secondary}`}>
            Create a new assignment for your students. Fill in all the required details below.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {contractError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {contractError}
          </div>
        )}

        <form onSubmit={handleSubmit} className={`${theme.card} rounded-lg p-6 shadow-lg`}>
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} bg-gray-800 text-white`}
                placeholder="Enter assignment title"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} bg-gray-800 text-white`}
                placeholder="Enter assignment description"
              />
            </div>

            {/* Question */}
            <div>
              <label htmlFor="question" className="block text-sm font-medium mb-1">
                Question <span className="text-red-500">*</span>
              </label>
              <textarea
                id="question"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                required
                rows={6}
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} bg-gray-800 text-white`}
                placeholder="Enter the assignment question"
              />
            </div>

            {/* Evaluation Criteria */}
            <div>
              <label htmlFor="evaluationCriteria" className="block text-sm font-medium mb-1">
                Checkpoints <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {formData.evaluationCriteria.map((criteria, index) => (
                  <div key={index} className="flex gap-2">
                    <textarea
                      value={criteria}
                      onChange={(e) => handleCriteriaChange(index, e.target.value)}
                      placeholder={`Checkpoint ${index + 1}`}
                      className={`flex-1 p-3 rounded-lg border ${theme.border} bg-gray-800 text-white`}
                      rows={3}
                    />
                    <button
                      type="button"
                      onClick={() => removeCriteriaBox(index)}
                      className={`p-3 rounded-lg ${theme.border} text-white ${formData.evaluationCriteria.length > 1 ? 'bg-red-600 hover:bg-red-700 transition-colors duration-200' : 'hidden'}`}
                      title="Remove checkpoint"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCriteriaBox}
                  className={`flex items-center justify-center w-full p-3 rounded-lg ${theme.border} text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 shadow-md`}
                >
                  <FaCheckCircle className="mr-2" />
                  Add New Checkpoint
                </button>
              </div>
            </div>

            {/* Meta Prompt */}
            <div>
              <label htmlFor="metaPrompt" className="block text-sm font-medium mb-1">
                Meta Prompt <span className="text-red-500">*</span>
              </label>
              <textarea
                id="metaPrompt"
                name="metaPrompt"
                value={formData.metaPrompt}
                onChange={handleInputChange}
                required
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${theme.border} bg-gray-800 text-white`}
                placeholder="Enter meta prompt"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-6 py-3 rounded-lg text-white font-medium ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <FaPlus className="mr-2" />
                  Create Assignment
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateAssignment; 