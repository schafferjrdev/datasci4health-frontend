import React, { useState, useEffect } from "react";
import { Map, Filters, LoadingMap } from "components";
import DadosMunicipio from "./DadosMunicipio";
import * as api from "services/api";
import "./style.scss";

const Mapa = () => {
  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [municipioSelected, setMunicipioSelected] = useState(null);
  const [dadosMapa, setDadosMapa] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    async function fetchData() {
      const body = { year: "2019" };
      setFilter(body);
      const response = await api.getAnomalias(body);

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
    setFilter(obj);
    setMapLoading(true);
    setMunicipioSelected(null);
    const response = await api.getAnomalias(obj);
    setDadosMapa(response);
    setMapLoading(false);
  };

  return (
    <div>
      <h2>Mapa de anomalias por estado</h2>
      <Filters onFilter={handleFilter} />
      {mapLoading ? (
        <LoadingMap />
      ) : (
        <Map onClick={handleClick} dados={dadosMapa} />
      )}

      <DadosMunicipio
        onClear={handleClear}
        loading={loading}
        dados={municipioSelected}
        filter={filter}
      />
    </div>
  );
};

export default Mapa;
