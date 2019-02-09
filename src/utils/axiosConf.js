import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.101.18.35:5000"
});

export default instance;
