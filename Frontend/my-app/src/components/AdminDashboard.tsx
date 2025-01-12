import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminManageEvents from "./AdminManageEvents";
import AdminSeeAttendees from "./AdminSeeAttendees";

const AdminDashboard = (): JSX.Element => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const handleEventsToggle = () => {
        setActiveSection('events');
    };

    const handleUsersToggle = () => {
        setActiveSection('users');
    };

    const handleAttendeesToggle = () => {
        setActiveSection('attendees');
    };

    return (
        <div>
            <AdminNavbar 
                eventsToggle={handleEventsToggle} 
                usersToggle={handleUsersToggle} 
                attendeeToggle={handleAttendeesToggle} 
            />
            {activeSection === 'events' && <AdminManageEvents />}
            {activeSection === 'attendees' && <AdminSeeAttendees />}
        </div>
    );
}

export default AdminDashboard;