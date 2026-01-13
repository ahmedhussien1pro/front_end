import api from './api';

/**
 * Labs Service
 * Handles all labs-related API calls
 */
const labsService = {
  /**
   * Get all labs with optional filters
   * @param {Object} params - Query parameters {page, limit, category, difficulty}
   * @returns {Promise}
   */
  getAllLabs: async (params = {}) => {
    const response = await api.get('/labs', { params });
    return response.data;
  },

  /**
   * Get single lab by ID
   * @param {string} labId - Lab ID
   * @returns {Promise}
   */
  getLabById: async (labId) => {
    const response = await api.get(`/labs/${labId}`);
    return response.data;
  },

  /**
   * Get practice labs
   * @param {Object} params - Query parameters
   * @returns {Promise}
   */
  getPracticeLabs: async (params = {}) => {
    const response = await api.get('/practice-labs', { params });
    return response.data;
  },

  /**
   * Get practice lab by ID
   * @param {string} labId - Practice lab ID
   * @returns {Promise}
   */
  getPracticeLabById: async (labId) => {
    const response = await api.get(`/practice-labs/${labId}`);
    return response.data;
  },

  /**
   * Submit lab solution
   * @param {string} labId - Lab ID
   * @param {Object} solution - Solution data
   * @returns {Promise}
   */
  submitLabSolution: async (labId, solution) => {
    const response = await api.post(`/labs/${labId}/submit`, solution);
    return response.data;
  },

  /**
   * Get lab progress for current user
   * @param {string} labId - Lab ID
   * @returns {Promise}
   */
  getLabProgress: async (labId) => {
    const response = await api.get(`/progress/lab/${labId}`);
    return response.data;
  },

  /**
   * Update lab progress
   * @param {string} labId - Lab ID
   * @param {Object} progressData - Progress data
   * @returns {Promise}
   */
  updateLabProgress: async (labId, progressData) => {
    const response = await api.put(`/progress/lab/${labId}`, progressData);
    return response.data;
  },
};

export default labsService;
