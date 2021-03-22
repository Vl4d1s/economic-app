const axios = require('axios');

// import { APIRootPath } from '../../configuration/index';

export const createApiClient = () => {
  return {
    getData: () => {
      return axios.get('http://localhost:3232/api/economic').then(res => res.data);
    },
  };
};
