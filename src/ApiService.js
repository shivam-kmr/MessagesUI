import axiosInstance from "../src/Api";
import qs from "qs";

const baseURL = "http://messageapi.shivamkmr.me";

let APIService = {
  getApiData: async endpoint => {
    var url = baseURL + endpoint;
    return axiosInstance.get(url);
  },
  post: async (endpoint, postData) => {
    var data = qs.stringify(postData);
    var url = baseURL + endpoint;
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    };
    return axiosInstance.post(url, data, headers);
  },
  sendOTP: async url => {
    return axiosInstance.get(url);
  }
};

export { APIService };
