import {useEffect, useState} from 'react';
import {fetchAppointments} from "../services/api.js";
import AppointmentForm from "../components/AppointmentForm.js";
import AppointmentList from "../components/AppointmentList.js";

    const API_BASE = import.meta.env.VITE_API_BASE;
const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                const data = fetchAppointments();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };
        console.log("Appointment API Returned",appointments)
        loadAppointments();
    }, []);

    const handleAddAppointment = (newAppointment) => {
        setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    }

    return (
        <div style={{padding: '2rem'}}>
            <h1>Appointment Page</h1>
            <AppointmentForm onAdd={handleAddAppointment} />

                {loading ? (
                    <p>Loading appointments...</p>
                    ) : (
                        <AppointmentList appointments={appointments} />
                    )}
        </div>
    );
};

export default AppointmentPage;