// import { APIRootPath } from "@vl4d1s/conf";
const axios = require('axios');
const herokuServerPath = 'https://economic-app-server.herokuapp.com/api/economic';

export const createApiClient = route => {
  return {
    getData: async route => {
      const res = await axios.get(`${herokuServerPath}/${route}`);
      return res.data.data;
    },
  };
};
