import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Page1 from '../Pages/Page1/Page1';
import WorkersTabel from '../Pages/Tabels/WorkersTabel/WorkersTabel';
import InterestRateTable from '../Pages/Tabels/InterestRateTable/InterestRateTable';
import LeavingProbTable from '../Pages/Tabels/LeavingProbTable/LeavingProbTable';
import lifesMensTable from '../Pages/Tabels/lifesMensTable/lifesMensTable';
import lifesWomensTable from '../Pages/Tabels/lifesWomensTable/lifesWomensTable';
import Home from '../Pages/Home/Home';

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
