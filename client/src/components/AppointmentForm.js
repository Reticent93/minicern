import { useState } from "react";
import {createAppointment} from "../services/api.js";


const AppointmentForm = ({ onAdd }) => {
    const [patientName, setPatientName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const data  = await createAppointment({
                patientName,
                date,
                time
            })
            onAdd(data);
            setPatientName("");
            setDate("");
            setTime("");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
            />
            <button type="submit">Add Appointment</button>
        </form>
    );
}

export default AppointmentForm;