import axios from "axios";

export default axios.create({
    baseURL: process.env.PUBLIC_URL
});

export const axiosPrivate = axios.create({
    baseURL: process.env.PUBLIC_URL,
    headers: {'Content-Type' : 'application/json'},
    withCredentials: true
});
