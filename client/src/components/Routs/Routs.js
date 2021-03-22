import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Page1 from '../pages/Page1/Page1';
import WorkersTabel from '../pages/Tabels/WorkersTabel/WorkersTabel';
import InterestRateTable from '../pages/Tabels/InterestRateTable/InterestRateTable';
import LeavingProbTable from '../pages/Tabels/LeavingProbTable/LeavingProbTable';
import Home from '../pages/Home/Home';

const Routs = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/page1" component={Page1} />
      <Route path="/workers" component={WorkersTabel} />
      <Route path="/interestrate" component={InterestRateTable} />
      <Route path="/leavingprob" component={LeavingProbTable} />
    </Switch>
  );
};

export default Routs;
