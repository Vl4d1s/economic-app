import { Route, Switch } from "react-router-dom";
import React from "react";
import page1 from "./pages/page1";
import page2 from "./pages/page2";

const Routs = () => {
  return (
    <Switch>
      <Route path="/" exact component={page1} />
      <Route path="/page1" component={page1} />
      <Route path="/page2" component={page2} />
    </Switch>
  );
};

export default Routs;
