import axios from "axios";
import { message } from "antd";

const URL = {
  PROD: "https://data-science-unicamp.herokuapp.com/",
  DEV: "",
};

const api = axios.create({
  baseURL: URL.PROD,
});

export const getAnomalias = (body) => {
  const { year } = body;
  return api
    .get(`getAnomalias?year=${year}`)
    .then((r) => {
      console.log("Deu certo");
      return JSON.parse(r.data);
    })
    .catch((e) => {
      // const error = e;
      console.log("error", e);
      message.error("Erro");
      return [];
    });
};

export const getDadosMunicipios = (id) => {
  return api
    .get("https://run.mocky.io/v3/2fb4b1ad-6f87-4f8d-8c14-8d35dd67a3b6")
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      console.log(e);
    });
};
