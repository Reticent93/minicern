import { useState } from "react";
import { createAppointment } from "../services/api.jsx";

const AppointmentForm = () => {
    const [patientName, setPatientName] = useState("");
    const [providerId, setProviderId] = useState(""); // Add provider selection
    const [patientId, setPatientId] = useState(""); // Add patient selection
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("scheduled");
    const [notes, setNotes] = useState("");


    const [patients, setPatients] = useState([]);
    const [providers, setProviders] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!patientId || !providerId) {
            alert("Please select both patient and provider");
            return;
        }

        const payload = {
            patient_id: parseInt(patientId), // Ensure it's a number
            provider_id: parseInt(providerId), // Ensure it's a number
            appointment_time: `${date}T${time}:00Z`,
            status,
            notes
        };

        try {
            const result = await createAppointment(payload);
            console.log("Appointment created:", result);

            // Reset form
            setPatientName("");
            setPatientId("");
            setProviderId("");
            setDate("");
            setTime("");
            setStatus("scheduled");
            setNotes("");

        } catch (e) {
            console.error("Error creating appointment:", e);
            // Show error to user
            alert("Error creating appointment. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <select
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                required
            >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                    <option key={patient.id} value={patient.id}>
                        {patient.name}
                    </option>
                ))}
            </select>

            <select
                value={providerId}
                onChange={(e) => setProviderId(e.target.value)}
                required
            >
                <option value="">Select Provider</option>
                {providers.map(provider => (
                    <option key={provider.id} value={provider.id}>
                        {provider.name} - {provider.specialty}
                    </option>
                ))}
            </select>

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
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <textarea
                placeholder="Notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <button type="submit">Add Appointment</button>
        </form>
    );
}

export default AppointmentForm;