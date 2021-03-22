import express from 'express';
import connectDB from './config/db';
import { APIPath, serverAPIPort } from '../configuration/index';
import workers from './data/workers.json';
import interestRate from './data/interestRate.json';
import leavingProb from './data/leavingProb.json';
import lifeTableWomens from './data/lifeTableWomens.json';
import lifeTableMens from './data/lifeTableMens.json';

console.log('starting server', { serverAPIPort, APIPath });

const app = express();

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('I am a backend server');
});

app.get(`${APIPath}/workers`, (req, res) => {
  res.status(200).send({ data: workers });
});

app.get(`${APIPath}/interestrate`, (req, res) => {
  console.log('here');
  res.status(200).send({ data: interestRate });
});

app.get(`${APIPath}/lifetablemens`, (req, res) => {
  res.status(200).send({ data: lifeTableMens });
});

app.get(`${APIPath}/lifetablewomens`, (req, res) => {
  res.status(200).send({ data: lifeTableWomens });
});

app.get(`${APIPath}/leavingprob`, (req, res) => {
  res.status(200).send({ data: leavingProb });
});

app.listen(serverAPIPort, err => {
  if (err) {
    console.log(`Error: ${err.message}`);
  } else {
    console.log(`server runnig on port ${serverAPIPort}`);
  }
});
