import { APIPath, serverAPIPort } from '@vl4d1s/conf';
import morgan from 'morgan';
import express from 'express';
// import connectDB from './config/db';
import workersRouter from './routes/workersRouts';
import interesRateRouter from './routes/interesRateRouts';
import lifeTableMensRouter from './routes/lifeTableMensRouts';
import lifeTableWomensRouter from './routes/lifeTableWomensRouts';
import leavingProbRouter from './routes/leavingProbRouts';

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

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('I am a backend server');
});

app.use(`${APIPath}/workers`, workersRouter);
app.use(`${APIPath}/interestrate`, interesRateRouter);
app.use(`${APIPath}/lifetablemens`, lifeTableMensRouter);
app.use(`${APIPath}/lifetablewomens`, lifeTableWomensRouter);
app.use(`${APIPath}/leavingprob`, leavingProbRouter);

app.listen(serverAPIPort, err => {
  if (err) {
    console.log(`Error: ${err.message}`);
  } else {
    console.log(`server runnig on port ${serverAPIPort}`);
  }
});
