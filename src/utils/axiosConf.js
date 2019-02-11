import axios from "axios";

const instance = axios.create({
  baseURL: "http://159.89.13.182:5000"
});

export default instance;
