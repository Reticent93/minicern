const AppointmentList = ({ appointments }) => {
    if (!appointments.length) return <p>No appointments found.</p>;

    return (
        <table border="1" cellPadding="8">
            <thead>
            <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Notes</th>

            </tr>
            </thead>
            <tbody>
            {appointments.map((appt) => (
                <tr key={appt.id}>
                    <td>{appt.patientName}</td>
                    <td>{appt.date}</td>
                    <td>{appt.time}</td>
                    <td>{appt.status}</td>
                    <td>{appt.notes}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default AppointmentList;
