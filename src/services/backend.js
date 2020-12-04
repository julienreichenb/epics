import { request } from './common';

const baseEndpoint = 'https://backend.quantimage2.ehealth.hevs.ch'

const endpoints = {
  analyze: `${baseEndpoint}/analyze`,
  extract: `${baseEndpoint}/extract`,
  extractions: `${baseEndpoint}/extractions`,
  families: `${baseEndpoint}/feature-families`,
  models: `${baseEndpoint}/models`,
  labels: `${baseEndpoint}/labels`,
  tasks: `${baseEndpoint}/tasks`,
  charts: `${baseEndpoint}/charts`,
}

class Backend {
  async getLasagnaData(albumId) {
    try {
      const url = `${endpoints.charts}/${albumId}/lasagna`;
      return await request(url); // Add token management
    } catch (err) {
      throw err; // Just throw it for now
    }
  }
  async getPCAData(albumId) {
    try {
      const url = `${endpoints.charts}/${albumId}/pca`;
      return await request(url); // Add token management
    } catch (err) {
      throw err; // Just throw it for now
    }
  }
}

export default new Backend();
