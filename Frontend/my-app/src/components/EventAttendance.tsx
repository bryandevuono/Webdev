import React from "react";
import { AttendEvent } from "../api/AttendEvent";
import { OfficeEvent } from "../api/Events";

interface EventAttendanceProps {
    setShowEventAttendance: Function
    currentEvent: OfficeEvent
    setAttendanceSuccess: Function
    setAttendanceError: Function
}

const EventAttendance = ({setShowEventAttendance, currentEvent, setAttendanceSuccess, setAttendanceError}: EventAttendanceProps): JSX.Element => {
    const toggle = () => {
        setShowEventAttendance(false);
    }

    const handleSubmit = () => {
        if (currentEvent.kind === "event") {
            AttendEvent(currentEvent.eventId, setAttendanceSuccess, setAttendanceError);
            setShowEventAttendance(false);
        } else {
            setAttendanceError(true);
        }
    }
    return (
        <div className="popup-overlay">
            <div className="popup">
                <form className="popup-form">
                    <p>Would you like to attend this event?</p>
                    <button onClick={() => handleSubmit()}>Attend Event</button>
                    <button onClick={() => toggle()}>Cancel</button>
                </form>
            </div>
        </div>
    );
} 

export default EventAttendance;