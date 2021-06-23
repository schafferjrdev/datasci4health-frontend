import React from "react";
import { Switch, Route } from "react-router-dom";

import Mapa from "./Mapa";
import Introducao from "./Introducao";

export default function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <Introducao />
      </Route>

      <Route path="/mapa">
        <Mapa />
      </Route>
    </Switch>
  );
}
