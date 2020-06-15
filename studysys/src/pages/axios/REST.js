import Axios from "axios";
import { LoginError } from "../error/loginError";
import { TokenError } from "../error/tokenError";

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

export const REST = {
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
      console.log(e);
      return false;
    }
  },

  get: async (api_url) => {
    let res = undefined;

    try {
      res = await Axios.get(BASE_URL + api_url, getHeadersConfig());
      if (res.data.code == 5) throw new LoginError();
      if (res.data.code == 555) throw new TokenError();
      return res.data;
    } catch (e) {
      if (e instanceof TokenError) {
        //TODO Redirect to login page
      }
      console.log(e);
      return false;
    }
  },
};
