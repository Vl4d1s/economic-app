const serverAPIPort = 3232;
const host = 'http://localhost';
const APIDomain = 'economic';
const APIPath = `/api/${APIDomain}`;
const APIRootPath = `${host}:${serverAPIPort}${APIPath}`;

module.exports = {
  serverAPIPort,
  host,
  APIDomain,
  APIPath,
  APIRootPath,
};
