import React from "react";
import { AttendEvent } from "../api/AttendEvent";
import Event from "react-big-calendar";
import { CalendarEvent } from "./EventCalendar";

interface EventAttendanceProps {
    setShowEventAttendance: Function
    currentEvent: CalendarEvent
}
const EventAttendance = ({setShowEventAttendance, currentEvent}: EventAttendanceProps): JSX.Element => {
    const toggle = () => {
        setShowEventAttendance(false);
    }

    const handleSubmit = () => {
        AttendEvent(currentEvent.title);
        setShowEventAttendance(false);
    }
    return (
        <div className="popup-overlay">
            <div className="popup">
                <form className="popup-form">
                    <p>Would you like to attend this event?</p>
                    <button onClick={(event) => handleSubmit()}>Attend Event</button>
                    <button onClick={() => toggle()}>Cancel</button>
                </form>
            </div>
        </div>
    );
} 

export default EventAttendance;