import axiosInstance from "../src/Api";

const baseURL = "http://54.84.3.190:8081";

let APIService = {
  getApiData: async endpoint => {
    var url = baseURL + endpoint;
    return axiosInstance.get(url);
  },
  post: async (endpoint, postData) => {
    var url = baseURL + endpoint;
    return axiosInstance.post(url, postData);
  }
};

export { APIService };
