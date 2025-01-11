import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminManageEvents from "./AdminManageEvents";
import AdminSeeAttendees from "./AdminSeeAttendees";

const AdminDashboard = (): JSX.Element => {
    const [eventToggle, setEventToggle] = useState(false);
    const [userToggle, setUserToggle] = useState(false);
    const [attendeeToggle, setAttendeeToggle] = useState(false);

    return (
        <div>
            <AdminNavbar eventsToggle={setEventToggle} usersToggle={setUserToggle} attendeeToggle={setAttendeeToggle} />
            {eventToggle ? <AdminManageEvents /> : null}
            
            {attendeeToggle ? <AdminSeeAttendees /> : null}
        </div>
    );
}

export default AdminDashboard;