import axios from "axios";

const API_BASE = import.meta.env.REACT_APP_API_BASE || 'http://localhost:5000/api';


export const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE}/users`);
    return res.data;
}


export const createUser = async (user) => {
    const res = await axios.post(`${API_BASE}/users`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return res.data;
}


export const fetchAppointments = async () => {
    const res = await axios.get(`${API_BASE}/appointments`);
    return res.data;
}


export const createAppointment = async ({patient_id, provider_id, appointment_time, status, notes }) => {
    const res = await axios.post(`${API_BASE}/appointments`, {patient_id, provider_id, appointment_time, status, notes}, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log("ca", res);
    return res.data;
}


export const fetchProviders = async () => {
    const res = await axios.get(`${API_BASE}/providers`);
    return res.data;
};