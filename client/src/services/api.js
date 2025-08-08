import axios from "axios";

const API_BASE = import.meta.env.REACT_APP_API_BASE || 'http://localhost:5000';


export const fetchUser = async () => {
    const res = await axios.get(`${API_BASE}/users`);
    console.log("res", res);
    return res.data;
}


export const createUser = async (user) => {
    const res = await axios.post(`${API_BASE}/users`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(res);
    return res.data;
}


export const fetchAppointments = async () => {
    const res = await axios.get(`${API_BASE}/appointments`);
    console.log("res", res);
    return res.data;
}


export const createAppointment = async (appointment) => {
    const res = await axios.post(`${API_BASE}/appointments`, appointment, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.data;
}