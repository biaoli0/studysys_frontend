import Axios from "axios";
import Router from "next/router";
import { URL_TARGET } from "./UrlTarget";
import { Log } from "../Log";

const BASE_URL = "http://t.ztest.org/api/";

function getToken() {
  return localStorage.getItem("token");
}

function getHeadersConfig() {
  return {
    withCredentials: true,
    headers: { token: getToken() },
  };
}

export const Rest = {
  post: async (requestBody, api_url) => {
    let res = undefined;

    try {
      res = await Axios.post(
        BASE_URL + api_url,
        requestBody,
        getHeadersConfig()
      );
      return res.data;
    } catch (e) {
      Log.print(e);
      return false;
    }
  },

  get: async (api_url) => {
    let res = undefined;

    try {
      res = await Axios.get(BASE_URL + api_url, getHeadersConfig());
      if (res.data.code === 5) Router.push(URL_TARGET.TEACHER_LOGIN);
      if (res.data.code === 555) Router.push(URL_TARGET.TEACHER_LOGIN);
      return res.data;
    } catch (e) {
      Log.print(e);
      return false;
    }
  },
};
