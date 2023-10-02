import axios from "axios";

export const instance = axios.create({
    baseURL: "http://5.35.5.90:8080",
});

