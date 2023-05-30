import axios from 'axios'

export function getSystemStatus() {
    return axios.get<ResponseObject<SystemStatus>>("/api/status");
}