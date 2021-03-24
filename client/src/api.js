import { APIRootPath } from '@vl4d1s/conf';
const axios = require('axios');

export const createApiClient = route => {
  return {
    getData: async route => {
      const res = await axios.get(`${APIRootPath}/${route}`);
      return res.data.data;
    },
  };
};
