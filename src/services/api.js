import axios from "axios";
import { message } from "antd";

const URL = {
  PROD: "https://data-science-unicamp.herokuapp.com/",
  DEV: "http://192.168.0.9:3000/",
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
      return JSON.parse(r.data);
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
