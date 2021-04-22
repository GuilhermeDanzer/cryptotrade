import axios from "axios";
import Cookies from "js-cookie";
const instance = axios.create({
  //baseURL: "https://criptocoin.rj.r.appspot.com/",
  baseURL: "http://localhost:3003/",
});
instance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default instance;
