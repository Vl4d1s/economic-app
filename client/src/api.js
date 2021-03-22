const axios = require('axios');

// import { APIRootPath } from '../../configuration/index';

export const createApiClient = () => {
  return {
    getWorkers: async () => {
      const res = await axios.get('http://localhost:3232/api/economic/workers');
      return res.data.data;
    },
    getInterestRate: async () => {
      const res = await axios.get('http://localhost:3232/api/economic/interestrate');
      return res.data.data;
    },
    getLeavingProb: async () => {
      const res = await axios.get('http://localhost:3232/api/economic/leavingprob');
      return res.data.data;
    },
    getLifesMens: async () => {
      const res = await axios.get('http://localhost:3232/api/economic/lifetablemens');
      return res.data.data;
    },
    getLifesWomens: async () => {
      const res = await axios.get('http://localhost:3232/api/economic/lifetablewomens');
      return res.data.data;
    },
  };
};
