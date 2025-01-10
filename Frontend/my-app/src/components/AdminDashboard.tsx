import { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminManageEvents from "./AdminManageEvents";

const AdminDashboard = (): JSX.Element => {
    const [eventToggle, setEventToggle] = useState(false);
    const [userToggle, setUserToggle] = useState(false);

    return (
        <div>
            <AdminNavbar eventsToggle={setEventToggle} usersToggle={setUserToggle} />
            {eventToggle ? <AdminManageEvents /> : null}
        </div>
    );
}

export default AdminDashboard;