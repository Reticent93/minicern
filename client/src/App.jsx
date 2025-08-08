import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import './App.css'
import UserPage from "./pages/userPage.jsx";
import AppointmentPage from "./pages/AppointmentPage.js";

function App() {


  return (
    <Router>
        <nav>
            <Link to="/users">Users</Link> |{" "}
            <Link to="/appointments">Appointments</Link>
        </nav>
        <Routes>
            <Route path='/users' element={<UserPage />} />
            <Route path='/appointments' element={<AppointmentPage />} />
        </Routes>

    </Router>
  )
}

export default App
