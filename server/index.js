import express from 'express';
import connectDB from './config/db';
import { APIPath, serverAPIPort } from '../configuration/index';
import workers from './data/workers.json';

console.log('starting server', { serverAPIPort, APIPath });

const app = express();

// connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('I am a backend server');
});

app.get(`${APIPath}/workers`, (req, res) => {
  res.status(200).send({ workers });
});

app.listen(serverAPIPort, err => {
  if (err) {
    console.log(`Error: ${err.message}`);
  } else {
    console.log(`server runnig on port ${serverAPIPort}`);
  }
});
