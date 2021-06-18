import React, { useEffect } from "react";
import L from "leaflet";
import "./style.scss";
import "leaflet/dist/leaflet.css";

import statesData from "data/sp-cities.json";

const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

const Map = ({ onClick, dados }) => {
  useEffect(() => {
    let map = L.map("map").setView([-23.533773, -46.62529], 7);

    const trueDado = statesData.map((data) => {
      const anomalias = dados.find((el) =>
        data.properties.id.includes(String(el.id))
      )?.anomalias;

      return {
        ...data,
        properties: {
          nome: data.properties.name,
          id: data.properties.id,
          anomalias: anomalias ?? [],
        },
      };
    });

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

    function getColor(d) {
      return d > 1000
        ? "#800026"
        : d > 500
        ? "#BD0026"
        : d > 200
        ? "#E31A1C"
        : d > 100
        ? "#FC4E2A"
        : d > 50
        ? "#FD8D3C"
        : d > 20
        ? "#FEB24C"
        : d > 10
        ? "#FED976"
        : d > 0
        ? "#FFEDA0"
        : "#55aa77";
    }

    function style(feature) {
      return {
        fillColor: getColor(feature.properties.anomalias.length),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.3,
      };
    }

    let geojson = L.geoJson();

    let info = L.control();

    info.onAdd = function (map) {
      this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
      this._div.innerHTML =
        "<h4>Município</h4>" +
        (props
          ? `<b>${props.nome}</b><br/>(Anomalias: ${props.anomalias.length})`
          : "Passe o mouse em um município.");
    };

    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.5,
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
        grades = [0, 1, 10, 20, 50, 100, 200, 500, 1000];

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
  }, []);

  return <div id="map"></div>;
};

export default React.memo(Map);
