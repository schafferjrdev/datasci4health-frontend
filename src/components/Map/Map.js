import React, { useEffect } from "react";
import "./Map.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import statesData from "data/sp-cities.json";

const TOKEN_ACCESS =
  "pk.eyJ1Ijoic2NoYWZmZXJqciIsImEiOiJja3AzOHZ5eTcxcXIwMnVsZDVicGt6cWdnIn0.86qVz6HMTw9f5wjyQ857xQ";

const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

function Map() {
  useEffect(() => {
    let map = L.map("map").setView([-23.533773, -46.62529], 7);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
        TOKEN_ACCESS,
      {
        id: "mapbox/light-v9",
        attribution: ATTRIBUTION,
        tileSize: 512,
        zoomOffset: -1,
      }
    ).addTo(map);

    function style(feature) {
      return {
        fillColor: "#55aa7777",
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
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
          ? `<b>${props.name}</b><br/>(ID: ${props.id})`
          : "Passe o mouse em um município.");
    };

    function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
        weight: 5,
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
      map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
      layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
      });
    }

    info.addTo(map);

    geojson = L.geoJson(statesData, {
      style: style,
      onEachFeature: onEachFeature,
    }).addTo(map);
  });

  return <div id="map"></div>;
} // app

export default Map;
