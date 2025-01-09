import React from "react";
import { AttendEvent } from "../api/AttendEvent";
import Event from "react-big-calendar";
import { CalendarEvent } from "./EventCalendar";

interface EventAttendanceProps {
    setShowEventAttendance: Function
    currentEvent: CalendarEvent
    setAttendanceSuccess: Function
    setAttendanceError: Function
}

const EventAttendance = ({setShowEventAttendance, currentEvent, setAttendanceSuccess, setAttendanceError}: EventAttendanceProps): JSX.Element => {
    const toggle = () => {
        setShowEventAttendance(false);
    }

    const handleSubmit = () => {
        AttendEvent(currentEvent.title, setAttendanceSuccess, setAttendanceError);
        setShowEventAttendance(false);
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