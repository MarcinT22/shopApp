import axios from "axios";

const ApiManager = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export default ApiManager;
