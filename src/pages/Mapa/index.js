import React, { useState, useEffect } from "react";
import { Map, Filters } from "components";
import DadosMunicipio from "./DadosMunicipio";
import * as api from "services/api";
import "./style.scss";

const Mapa = () => {
  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [municipioSelected, setMunicipioSelected] = useState(null);
  const [dadosMapa, setDadosMapa] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.getAnomalias("2019");

      await setDadosMapa(response);
      setMapLoading(false);
    }
    setMapLoading(true);
    fetchData();
  }, []);

  const handleClick = async (e) => {
    await setLoading(true);
    await setMunicipioSelected(e);
    await setLoading(false);
  };

  const handleClear = () => {
    setMunicipioSelected(null);
  };

  const handleFilter = async (obj) => {
    setMapLoading(true);
    console.log("Buscando filtro:", obj);
    await api.getAnomalias(obj);
    setMapLoading(false);
  };

  return (
    <div>
      <h2>Mapa de anomalias por estado</h2>
      <Filters onFilter={handleFilter} />
      {mapLoading ? (
        <span>carregando</span>
      ) : (
        <Map onClick={handleClick} dados={dadosMapa} />
      )}

      <DadosMunicipio
        onClear={handleClear}
        loading={loading}
        dados={municipioSelected}
      />
    </div>
  );
};

export default Mapa;
