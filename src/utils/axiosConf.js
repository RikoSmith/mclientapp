import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.110.120.88:5000"
});

export default instance;
