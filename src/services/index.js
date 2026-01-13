/**
 * Services Index
 * Central export file for all API services
 */

import api from './api';
import authService from './authService';
import labsService from './labsService';

// Export API instance for direct use
export { api };

// Export all services
export { authService, labsService };

// Default export with all services
export default {
  api,
  auth: authService,
  labs: labsService,
};
