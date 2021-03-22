import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Page1 from '../pages/Page1/Page1';
import WorkersTabel from '../pages/Tabels/WorkersTabel/WorkersTabel';
import InterestRateTable from '../pages/Tabels/InterestRateTable/InterestRateTable';
import LeavingProbTable from '../pages/Tabels/LeavingProbTable/LeavingProbTable';
import lifesMensTable from '../pages/Tabels/lifesMensTable/lifesMensTable';
import lifesWomensTable from '../pages/Tabels/lifesWomensTable/lifesWomensTable';

import Home from '../pages/Home/Home';

const Routs = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/page1" component={Page1} />
      <Route path="/workers" component={WorkersTabel} />
      <Route path="/interestrate" component={InterestRateTable} />
      <Route path="/leavingprob" component={LeavingProbTable} />
      <Route path="/lifemens" component={lifesMensTable} />
      <Route path="/lifewomens" component={lifesWomensTable} />
    </Switch>
  );
};

export default Routs;
