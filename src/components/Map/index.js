import React, { useEffect } from "react";
import L from "leaflet";
import "./style.scss";
import "leaflet/dist/leaflet.css";
import { Input } from "antd";

import statesData from "data/sp-cities.json";

const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

function getColor(d) {
  return d >= 1000
    ? "#800026"
    : d >= 500
    ? "#E31A1C"
    : d >= 100
    ? "#FC4E2A"
    : d >= 50
    ? "#FEB24C"
    : d >= 10
    ? "#FED976"
    : "#d3cea1";
}

function style(feature) {
  return {
    fillColor: getColor(feature.properties.total_anomalias),
    weight: 2,
    opacity: 1,
    color: "white",
    dashArray: "3",
    fillOpacity: 0.7,
  };
}

const Map = ({ onClick, onSearch, dados }) => {
  useEffect(() => {
    var container = L.DomUtil.get("map");
    if (container != null) {
      delete container._leaflet_id;
    }

    let map = L.map("map").setView([-23.533773, -46.62529], 7);

    const trueDado = statesData
      .map((data) => {
        const mun = dados.find((el) =>
          data.properties.id.includes(String(el.id))
        );

        return {
          ...data,
          properties: {
            nome: data.properties.name,
            id: data.properties.id,
            anomalias: mun?.anomalias ?? [],
            total_anomalias: mun?.total,
            nasc_vivos_ano: mun?.totalCidade,
            total_nascidos: mun?.totalYear,
          },
        };
      })
      .filter((el) => el.properties.total_anomalias > 0);

    const features = { type: "FeatureCollection", features: trueDado };

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
        process.env.REACT_APP_LEAFLET_TOKEN_ACCESS,
      {
        id: "mapbox/light-v9",
        attribution: ATTRIBUTION,
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(map);

    let geojson = L.geoJson();

    let info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
      const hasOne = props?.anomalias.length === 1;
      let text = "";
      if (hasOne) {
        const anom = props?.anomalias[0];
        text = `Anomalia:${anom?.descricao}<hr/>Ocorrências: ${props?.total_anomalias}`;
      } else {
        text = `Anomalias: ${props?.total_anomalias}`;
      }
      this._div.innerHTML =
        "<h4>Município</h4>" +
        (props
          ? `<b>${props.nome}</b>          
          ${
            props.nasc_vivos_ano
              ? "<br/><hr/>Total de nascidos vivos:" + props.nasc_vivos_ano
              : ""
          }         
          <br/><hr/>
          ${text}
          `
          : "Passe o mouse em um município.");
    };

    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 2,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }

      info.update(layer.feature.properties);
    }

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
      info.update();
    }

    function zoomToFeature(e) {
      var layer = e.target;
      onClick(layer.feature.properties);
      map.fitBounds(layer.getBounds());
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      });
    }

    info.addTo(map);

    var legend = L.control({ position: "bottomright" });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info legend"),
        grades = [1, 10, 50, 100, 500, 1000];

      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' +
          getColor(grades[i]) +
          '"></i> ' +
          grades[i] +
          (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
      }

      return div;
    };

    legend.addTo(map);

    geojson = L.geoJson(features, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(map);

    // eslint-disable-next-line
  }, [dados]);

  return (
    <div>
      <Input.Search
        allowClear
        placeholder="Filtre pelo nome do município"
        onSearch={onSearch}
      />
      <div id="map"></div>
    </div>
  );
};

export default React.memo(Map);
