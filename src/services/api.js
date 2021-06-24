import axios from "axios";
import { message } from "antd";

const URL = {
  PROD: "https://data-science-unicamp.herokuapp.com/",
  DEV: "http://192.168.0.9:5000/",
};

const api = axios.create({
  baseURL: URL.PROD,
});

export const getAnomalias = (body) => {
  return api
    .get(`getAnomalias`, {
      params: body,
    })
    .then((r) => {
      return JSON.parse(r.data);
    })
    .catch((e) => {
      const errorMessage = e?.response?.data?.message ?? "Error";
      message.error(errorMessage);
      return [];
    });
};

export const getListAnomalias = () => {
  return api
    .get(`getListAnomalias`)
    .then((r) => {
      //TODO Ajuste provisório
      const parsed = JSON.parse(r.data);
      const filtered = parsed.filter(
        (el) => el.CID10.length > 3 || el.CID10 === "Q02"
      );
      return filtered;
    })
    .catch((e) => {
      const errorMessage = e?.response?.data?.message ?? "Error";
      message.error(errorMessage);
      return [];
    });
};

export const getListYears = () => {
  return api
    .get(`getListYears`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      const errorMessage = e?.response?.data?.message ?? "Error";
      message.error(errorMessage);
      return [];
    });
};

export const getAnomalieDecade = (body) => {
  return api
    .get(`getOcurrencesLastDecade`, {
      params: body,
    })
    .then((r) => {
      return JSON.parse(r.data);
    })
    .catch((e) => {
      const errorMessage = e?.response?.data?.message ?? "Error";
      message.error(errorMessage);
      return [];
    });
};
