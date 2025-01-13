import React from "react";
import { AttendEvent } from "../api/AttendEvent";
import { UnsubscribeEvent } from "../api/UnsubscribeEvent";
import { OfficeEvent } from "../api/Events";

interface EventAttendanceProps {
    setShowEventAttendance: Function
    currentEvent: OfficeEvent
    setAttendanceSuccess: Function
    setAttendanceError: Function
    setUnsubscribeSuccess: Function
    setUnsubscribeError: Function
    isRegistered: boolean
}

const EventAttendance = ({setShowEventAttendance, currentEvent, setAttendanceSuccess, setAttendanceError}: EventAttendanceProps): JSX.Element => {
    const handleSubmit = (event: React.FormEvent) => {
        if (currentEvent.kind == "event") {
            AttendEvent(currentEvent.eventId, setAttendanceSuccess, setAttendanceError);
            setShowEventAttendance(false);
        } else {
            setAttendanceError(true);
        }
    }

    return (
        <div className="popup-overlay">
            <form className="popup-form-event">
                <h1>{currentEvent.title}</h1>
                <p>Description: {currentEvent.description}</p>
                <p>Location: {currentEvent.location}</p>
                <p>Date: {String(currentEvent.start)}</p>
                <p>Choose an option:</p>
                <button>Leave a review</button>
                <button onClick={(event) => handleSubmit(event)}>Attend this Event</button>
                <button>Unsubscribe</button>
                <button onClick={() => setShowEventAttendance(false)}>Cancel</button>
            </form>
            {}
        </div>
    );
} 

export default EventAttendance;