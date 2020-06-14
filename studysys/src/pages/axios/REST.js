import Axios from "axios";

const BASE_URL = "http://t.ztest.org/api/";

const headersConfig = {};

let res = undefined;

export const REST = {
  post: async (requestBody, api_url) => {
    try {
      res = await Axios.post(BASE_URL + api_url, requestBody, {
        headers: headersConfig,
      });
    } catch (e) {
      res = e.response;
    } finally {
      return res;
    }
  },
};
