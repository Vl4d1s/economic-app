export const createApiClient = () => {
  return {
    getTickets: () => {
      return axios.get(`${APIRootPath}?page=${page}`).then((res) => res.data);
    },
  };
};
