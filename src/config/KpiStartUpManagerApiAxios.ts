import axios from "axios";

export const kpiApiAxios = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/db072vt8g/image/upload",
});
