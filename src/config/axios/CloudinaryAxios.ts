import axios, { AxiosInstance } from "axios";

export const cloudinaryAxios:AxiosInstance  = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/db072vt8g/image/upload",
});
