import { request } from './common';

const baseEndpoint = 'http://153.109.130.143:5000/charts/'

const endpoints = {
  analyze: `${baseEndpoint}/analyze`,
  extract: `${baseEndpoint}/extract`,
  extractions: `${baseEndpoint}/extractions`,
  families: `${baseEndpoint}/feature-families`,
  models: `${baseEndpoint}/models`,
  labels: `${baseEndpoint}/labels`,
  tasks: `${baseEndpoint}/tasks`,
  charts: {
    lasagna: `${baseEndpoint}`
  }
};

class Backend {
  async getLasagnaData(albumId) {
    try {
      const url = `${endpoints.charts.lasagna}/${albumId}/lasagna`;
      return await request(url); // Add token management
    } catch (err) {
      throw err; // Just throw it for now
    }
  }
}

export default new Backend();
