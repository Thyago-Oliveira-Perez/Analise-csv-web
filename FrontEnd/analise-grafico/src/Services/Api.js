import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44379",
});

export default api;
