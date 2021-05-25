import React from "react";
import { Switch, Route } from "react-router-dom";

import Mapa from "./Mapa";
import Introducao from "./Introducao";
import Previsoes from "./Previsoes";

export default function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <Introducao />
      </Route>

      <Route path="/mapa">
        <Mapa />
      </Route>

      <Route path="/previsoes">
        <Previsoes />
      </Route>
    </Switch>
  );
}
