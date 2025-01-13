import React, { useEffect } from "react";
import { AttendEvent } from "../api/AttendEvent";
import { UnsubscribeEvent } from "../api/UnsubscribeEvent";
import { checkUserRegistration } from "../api/AttendEvent";
import { getUserId } from "../api/Login";
import { OfficeEvent } from "../api/Events";

interface EventAttendanceProps {
    setShowEventAttendance: Function
    currentEvent: OfficeEvent
    setAttendanceSuccess: Function
    setAttendanceError: Function
    setShowUnsubscribeMessage: Function
    setShowUnsubscribeError: Function
}

const EventAttendance = ({setShowEventAttendance, currentEvent, setAttendanceSuccess, setAttendanceError, setShowUnsubscribeError, setShowUnsubscribeMessage}: EventAttendanceProps): JSX.Element => {
    const [isAttending, setIsAttending] = React.useState(false);
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (currentEvent.kind == "event") {
            AttendEvent(currentEvent.eventId, setAttendanceSuccess, setAttendanceError);
            setShowEventAttendance(false);
        } else {
            setAttendanceError(true);
        }
    }

    const handleUnsubsribe = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await UnsubscribeEvent(currentEvent.eventId);
        if (response) {
            setShowEventAttendance(false);
            setShowUnsubscribeMessage(true);
        }
        else {
            setShowUnsubscribeError(true);
        }
    }

    const checkIfAttending = async () => {
        const response = await checkUserRegistration(await getUserId(), currentEvent.eventId);
        setIsAttending(response);
        console.log(response);
    }

    useEffect (() => {
        checkIfAttending();
    }, []);

    return (
        <div className="popup-overlay">
            <form className="popup-form-event">
                <h1>{currentEvent.title}</h1>
                <p>Description: {currentEvent.description}</p>
                <p>Location: {currentEvent.location}</p>
                <p>Date: {String(currentEvent.start)}</p>
                <p>Choose an option:</p>
                
                {isAttending ? 
                    <button>Leave a review</button>
                : null}

                {isAttending ? 
                    <button onClick={(event) => handleUnsubsribe(event)}>Unsubscribe</button> 
                : 
                    <button onClick={(event) => handleSubmit(event)}>Attend this Event</button>
                }

                <button onClick={() => setShowEventAttendance(false)}>Cancel</button>
            </form>
        </div>
    );
} 

export default EventAttendance;