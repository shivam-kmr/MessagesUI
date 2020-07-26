import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(function(config) {
  config.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  return config;
});
export default axiosInstance;
