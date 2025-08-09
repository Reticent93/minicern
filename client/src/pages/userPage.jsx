import React, {useEffect, useState} from 'react';
import {createUser, fetchUsers} from "../services/api.jsx";

const UserPage = () => {
    const [user, setUser] = useState([]);
    const [form, setForm] = useState({
        name: '',
        email: '',
        role: 'patient'
    })

    useEffect(() => {
        fetchUsers().then(data => {
            console.log("My fetched users", data)
            setUser(Array.isArray(data) ? data : []);
        });
        console.log("User API Returned",user)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = await createUser(form);
        setUser([...user, newUser]);
        }


    return (
        <div>
            <h1>User Page</h1>
                {user.length === 0 ? (<p>No users found </p> ): (
                    <ul>
                        {Array.isArray(user) &&user.map((user) => (
                            <li key={user.id}>
                                {user.name} - {user.email} - {user.role}
                            </li>
                        ))}
            </ul> )}
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                    <option value="patient">Patient</option>
                    <option value="provider">Provider</option>
                </select>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default UserPage;