import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Page1 from '../pages/Page1/Page1';
import WorkersTabel from '../pages/Tabels/WorkersTabel/WorkersTabel';
import InterestRateTable from '../pages/Tabels/InterestRateTable/InterestRateTable';
import Home from '../pages/Home/Home';

const Routs = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Page1" component={Page1} />
      <Route path="/workers" component={WorkersTabel} />
      <Route path="/interestrate" component={InterestRateTable} />
    </Switch>
  );
};

export default Routs;
