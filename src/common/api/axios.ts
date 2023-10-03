import axios from "axios";

export const instance = axios.create({
    baseURL: "http://slitvinenko.ddns.net:5000",
});

