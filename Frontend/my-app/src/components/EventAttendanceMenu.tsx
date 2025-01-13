import React, { useEffect, useState } from "react";
import { checkUserRegistration, AttendEvent } from "../api/AttendEvent";
import { UnsubscribeEvent } from "../api/UnsubscribeEvent";
import { getUserId } from "../api/Login";
import { OfficeEvent } from "../api/Events";
import EventReview from "./EventReview";

interface EventAttendanceProps {
  setShowEventAttendance: Function;
  currentEvent: OfficeEvent;
  setAttendanceSuccess: Function;
  setAttendanceError: Function;
  setShowUnsubscribeMessage: Function;
  setShowUnsubscribeError: Function;
}

const EventAttendanceMenu = ({
  setShowEventAttendance,
  currentEvent,
  setAttendanceSuccess,
  setAttendanceError,
  setShowUnsubscribeMessage,
  setShowUnsubscribeError
}: EventAttendanceProps): JSX.Element => {
  
  const [isAttending, setIsAttending] = useState(false);
  const [showReview, setShowReview] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentEvent.kind === "event") {
      await AttendEvent(currentEvent.eventId, setAttendanceSuccess, setAttendanceError);
      setShowEventAttendance(false);
    } else {
      setAttendanceError(true);
    }
  };

  const handleReviewClick = (event: React.FormEvent) => {
    event.preventDefault();
    setShowReview(true);
  };

  const handleUnsubscribe = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await UnsubscribeEvent(currentEvent.eventId);
    if (response) {
      setShowUnsubscribeMessage(true);
      setShowEventAttendance(false);
    } else {
      setShowUnsubscribeError(true);
      setShowEventAttendance(false);
    }
  };

  const checkIfAttending = async () => {
    const userId = await getUserId();
    const response = await checkUserRegistration(userId, currentEvent.eventId);
    setIsAttending(response);
  };

  useEffect(() => {
    checkIfAttending();
  }, [currentEvent]);

  return (
    <div className="popup-overlay">
      <form className="popup-form-event">
        <h1>{currentEvent.title}</h1>
        <p>Description: {currentEvent.description}</p>
        <p>Location: {currentEvent.location}</p>
        <p>Date: {String(currentEvent.start)}</p>
        <p>Choose an option:</p>

        {isAttending ? (
          <>
            <button onClick={handleReviewClick}>Leave a review</button>
            <button onClick={handleUnsubscribe}>Unsubscribe</button>
          </>
        ) : (
          <button onClick={handleSubmit}>Attend this Event</button>
        )}

        <button onClick={() => setShowEventAttendance(false)}>Cancel</button>
      </form>

      {showReview ? (
        <EventReview currentEvent={currentEvent} setShowReview={setShowReview} setEventMenu={setShowEventAttendance}/>
      ) : null}
    </div>
  );
};

export default EventAttendanceMenu;