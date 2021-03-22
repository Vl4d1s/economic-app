const axios = require('axios');

// import { APIRootPath } from '../../configuration/index';

export const createApiClient = () => {
  return {
    getWorkers: async () => {
      const res = await axios.get('http://localhost:3232/api/economic/workers');
      return res.data;
    },
    getInterestRate: async () => {
      const res = await axios.get('http://localhost:3232/api/economic/interestrate');
      return res.data;
    },
  };
};
