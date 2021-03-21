import { Route, Switch } from "react-router-dom";
import React from "react";
import Page1 from "./pages/Page1/Page1";
import Tabels from "./pages/Tables/Tabels";
import Home from "./pages/Home/Home";

const Routs = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/Page1" component={Page1} />
      <Route path="/Tabels" component={Tabels} />
    </Switch>
  );
};

export default Routs;
