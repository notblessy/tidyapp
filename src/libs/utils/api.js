import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 20000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json; charset=utf-8",
  },
  validateStatus: function (status) {
    return status < 505;
  },
});

export const fetcher = async (url) => {
  return await instance.get(url).then((res) => {
    const r = res.data;

    return r.data;
  });
};

export default instance;
