import axios from "axios";

const API_BASE = import.meta.env.REACT_APP_API_BASE || 'http://localhost:5000';


export const fetchUser = async () => {
    const res = await axios.get(`${API_BASE}/api/users`);
    console.log("res", res);
    return res.data;
}


export const createUser = async (user) => {
    const res = await axios.post(`${API_BASE}/api/users`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(res);
    return res.data;
}


export const fetchAppointments = async () => {
    const res = await axios.get(`${API_BASE}/api/appointments`);
    return res.data;
}