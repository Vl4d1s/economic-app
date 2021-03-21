import { Route, Switch } from "react-router-dom";
import React from "react";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Home from "./pages/Home";

const Routs = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Page1" component={Page1} />
      <Route path="/Page2" component={Page2} />
    </Switch>
  );
};

export default Routs;
