import React from "react";
import { useState } from "react";
import { AttendEvent } from "../api/AttendEvent";
import { UnsubscribeEvent } from "../api/UnsubscribeEvent";
import { OfficeEvent } from "../api/Events";
import EventReview from "./EventReview";

interface EventAttendanceProps {
  setShowEventAttendance: Function;
  currentEvent: OfficeEvent;
  setAttendanceSuccess: Function;
  setAttendanceError: Function;
}

const EventAttendance = ({
  setShowEventAttendance,
  currentEvent,
  setAttendanceSuccess,
  setAttendanceError,
}: EventAttendanceProps): JSX.Element => {
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    if (currentEvent.kind == "event") {
      AttendEvent(
        currentEvent.eventId,
        setAttendanceSuccess,
        setAttendanceError
      );
      setShowEventAttendance(false);
    } else {
      setAttendanceError(true);
    }
  };

  return (
    <div className="popup-overlay">
      {showReviewPopup && (
        <EventReview
          currentEvent={currentEvent.title}
          setShowPopup={setShowReviewPopup}
        />
      )}
      {!showReviewPopup && (
        <form className="popup-form-event">
          <h1>{currentEvent.title}</h1>
          <p>Description: {currentEvent.description}</p>
          <p>Location: {currentEvent.location}</p>
          <p>Date: {String(currentEvent.start)}</p>
          <p>Choose an option:</p>
          <button onClick={() => setShowReviewPopup(true)}>
            Leave a review
          </button>
          <button onClick={(event) => handleSubmit(event)}>
            Attend this Event
          </button>
          <button>Unsubscribe</button>
          <button onClick={() => setShowEventAttendance(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default EventAttendance;
