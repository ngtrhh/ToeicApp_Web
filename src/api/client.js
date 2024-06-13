import axios from "axios";
export default axios.create({
  baseURL: "http://192.168.11.118:3000/api",
});
