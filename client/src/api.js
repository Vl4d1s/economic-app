const axios = require('axios');

// import { APIRootPath } from '../../configuration/index';

export const createApiClient = route => {
  return {
    getData: async route => {
      const res = await axios.get(`http://localhost:3232/api/economic/${route}`);
      return res.data.data;
    },
  };
};
