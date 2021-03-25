const serverAPIPort = process.env.PORT || 3232;
const host = 'http://localhost';
const APIDomain = 'economic';
const APIPath = `/api/${APIDomain}`;
const APIRootPath = `${host}:${serverAPIPort}${APIPath}`;
const vladis = 'vladis';

module.exports = {
  vladis,
  serverAPIPort,
  host,
  APIDomain,
  APIPath,
  APIRootPath,
};
