import React from "react";

import { Map, Filters } from "components";

const Mapa = () => {
  return (
    <div>
      <h2>Mapa de anomalias por estado</h2>
      <Filters />
      <Map />
    </div>
  );
};

export default Mapa;
