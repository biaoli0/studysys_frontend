import Axios from "axios";

const BASE_URL = "http://t.ztest.org/api/";

function getToken() {
  return localStorage.getItem("token");
}

function getHeadersConfig() {
  return { token: getToken() };
}

export const REST = {
  post: async (requestBody, api_url) => {
    let res = undefined;

    try {
      res = await Axios.post(BASE_URL + api_url, requestBody, {
        headers: getHeadersConfig(),
      });
      return res.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
};
