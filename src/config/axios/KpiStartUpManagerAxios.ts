import axios, { AxiosInstance } from "axios";

export const kpiStartUpManagerAxios:AxiosInstance = axios.create({
    baseURL: 'https://kpistartupmanager.com/api/v1',
    responseType: "json",
    headers: {
        'x-rapidapi-key': 'bb2b00df27msh071e1e385987c1ep1cf96ejsna3bd421d334d',
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
    },
});