const axios = require('axios');

// import { APIRootPath } from '../../configuration/index';

export const createApiClient = () => {
  return {
    getWorkers: () => {
      return axios.get('http://localhost:3232/api/economic/workers').then(res => res.data);
    },
  };
};
