import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Compensation from '../Pages/Compensation/Compensation';
import WorkersTabel from '../Pages/Tabels/WorkersTabel/WorkersTabel';
import InterestRateTable from '../Pages/Tabels/InterestRateTable/InterestRateTable';
import LeavingProbTable from '../Pages/Tabels/LeavingProbTable/LeavingProbTable';
import lifesMensTable from '../Pages/Tabels/lifesMensTable/lifesMensTable';
import lifesWomensTable from '../Pages/Tabels/lifesWomensTable/lifesWomensTable';
// import Home from '../Pages/Home/Home';

const Routs = () => {
  return (
    <Switch>
      <Route path="/" exact component={Compensation} />
      <Route path="/compensation" component={Compensation} />
      <Route path="/workers" component={WorkersTabel} />
      <Route path="/interestrate" component={InterestRateTable} />
      <Route path="/leavingprob" component={LeavingProbTable} />
      <Route path="/lifemens" component={lifesMensTable} />
      <Route path="/lifewomens" component={lifesWomensTable} />
    </Switch>
  );
};

export default Routs;
