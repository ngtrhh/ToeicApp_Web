import axios from "axios";
export default axios.create({
  baseURL: "http://192.168.10.186:3000/api",
});
