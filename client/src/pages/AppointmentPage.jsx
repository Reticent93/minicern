// src/pages/AppointmentPage.jsx
import { useEffect, useState } from "react";
import { fetchAppointments, fetchUsers, fetchProviders, createAppointment } from "../services/api.jsx";

const AppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [users, setUsers] = useState([]);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [patientId, setPatientId] = useState("");
    const [providerId, setProviderId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [status, setStatus] = useState("scheduled");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch appointments (now includes joined names from backend)
                const appointmentsData = await fetchAppointments();
                setAppointments(appointmentsData);

                // Still fetch users and providers for the form dropdowns
                const [usersData, providersData] = await Promise.all([
                    fetchUsers(),
                    fetchProviders()
                ]);

                setUsers(usersData);
                setProviders(providersData);
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!patientId || !providerId) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            const appointmentData = {
                patient_id: parseInt(patientId),
                provider_id: parseInt(providerId),
                appointment_time: `${date}T${time}:00Z`,
                status,
                notes
            };

            const newAppt = await createAppointment(appointmentData);
            setAppointments((prev) => [...prev, newAppt]);

            // Reset form
            setPatientId("");
            setProviderId("");
            setDate("");
            setTime("");
            setStatus("scheduled");
            setNotes("");

        } catch (err) {
            console.error("Error creating appointment:", err);
            alert("Error creating appointment. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Appointments</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: "2rem", maxWidth: "400px" }}>
                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Patient:</label>
                    <select
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="">Select Patient</option>
                        {users.filter(user => user.role === 'patient').map(patient => (
                            <option key={patient.id} value={patient.id}>
                                {patient.name} ({patient.email})
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Provider:</label>
                    <select
                        value={providerId}
                        onChange={(e) => setProviderId(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="">Select Provider</option>
                        {providers.map(provider => (
                            <option key={provider.id} value={provider.id}>
                                {provider.name} - {provider.specialty}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Time:</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                        style={{ width: "100%", padding: "8px" }}
                    />
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>Notes:</label>
                    <textarea
                        placeholder="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{ width: "100%", padding: "8px", minHeight: "60px" }}
                    />
                </div>

                <button type="submit" style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px"
                }}>
                    Add Appointment
                </button>
            </form>

            <h2>Appointments List</h2>
            {appointments.length === 0 ? (
                <p>No appointments found.</p>
            ) : (
                <div style={{ display: "grid", gap: "1rem" }}>
                    {appointments.map((appt) => (
                        <div key={appt.id} style={{
                            border: "1px solid #ddd",
                            padding: "1rem",
                            borderRadius: "8px",
                            backgroundColor: "black",
                        }}>
                            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>
                                {appt.patient_name || `Patient #${appt.patient_id}`}
                            </h3>
                            <p><strong>Provider:</strong> {appt.provider_name || `Provider #${appt.provider_id}`}</p>
                            {appt.provider_specialty && <p><strong>Specialty:</strong> {appt.provider_specialty}</p>}
                            <p><strong>Date & Time:</strong> {new Date(appt.appointment_time).toLocaleString()}</p>
                            <p><strong>Status:</strong>
                                <span style={{
                                    color: appt.status === 'completed' ? 'green' :
                                        appt.status === 'cancelled' ? 'red' : 'orange',
                                    fontWeight: 'bold',
                                    marginLeft: '5px'
                                }}>
                                    {appt.status.toUpperCase()}
                                </span>
                            </p>
                            {appt.notes && <p><strong>Notes:</strong> {appt.notes}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppointmentPage;