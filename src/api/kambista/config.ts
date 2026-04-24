import axios from "axios";
const api_url = "https://api.kambista.com/v1/exchange/kambista/current";

export const KambistaExchangeApi = axios.create({
  baseURL: `${api_url}`,
});
