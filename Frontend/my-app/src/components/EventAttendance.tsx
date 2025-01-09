import React from "react";

interface EventAttendanceProps {
    setShowEventAttendance: Function
}
const EventAttendance = ({setShowEventAttendance}: EventAttendanceProps): JSX.Element => {
    const toggle = () => {
        setShowEventAttendance(false);
    }
    return (
        <div className="popup-overlay">
            <div className="popup">
                <form className="popup-form">
                    <p>Would you like to attend this event?</p>
                    <button onClick={toggle}>Attend Event</button>
                    <button onClick={toggle}>Cancel</button>
                </form>
            </div>
        </div>
    );
} 

export default EventAttendance;