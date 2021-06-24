import React, { useState, useEffect } from "react";
import { Map, Filters, LoadingMap } from "components";
import DadosMunicipio from "./DadosMunicipio";
import * as api from "services/api";
import "./style.scss";
import statesData from "data/sp-cities.json";

const Mapa = () => {
  const [loading, setLoading] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [municipioSelected, setMunicipioSelected] = useState(null);
  const [dadosMapa, setDadosMapa] = useState([]);
  const [dadosFiltered, setDadosFiltered] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    async function fetchData() {
      const body = { year: "2019" };
      setFilter(body);
      const response = await api.getAnomalias(body);
      await setDadosMapa(response);
      await setDadosFiltered(response);
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
    setDadosFiltered(response);
    setMapLoading(false);
  };

  const handleSearch = async (name) => {
    setMapLoading(true);

    const cities = await statesData.map((c) => ({
      name: c.properties.name,
      id: c.properties.id,
    }));

    const prevDados = [...dadosMapa];

    const regx = new RegExp(`(${name})`, "gmi");
    const list = await cities
      .filter((c) => c.name.match(regx))
      .map((el) => Number(el.id.slice(0, -1)));

    const filtered = prevDados.filter((d) => list.includes(d.id));

    await setMunicipioSelected(null);

    await setDadosFiltered(filtered);
    setMapLoading(false);
  };

  return (
    <div>
      <h2>Mapa de anomalias por estado</h2>
      <Filters
        onFilter={handleFilter}
        filterLoading={mapLoading}
        cidades={dadosMapa}
      />
      {mapLoading ? (
        <LoadingMap />
      ) : (
        <Map
          onSearch={handleSearch}
          onClick={handleClick}
          dados={dadosFiltered}
        />
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
