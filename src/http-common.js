import axios from "axios";

const miswBackendServer = import.meta.env.VITE_PROYECTO_MISW_BACKEND;
const miswllBackendPort = import.meta.env.VITE_PROYECTO_MISW_PORT;

export default axios.create({
    baseURL: `http://${miswBackendServer}:${miswllBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});