import React, { useEffect, useState } from "react";
import { checkUserRegistration, AttendEvent } from "../api/AttendEvent";
import { UnsubscribeEvent } from "../api/UnsubscribeEvent";
import { getUserId } from "../api/Login";
import { OfficeEvent } from "../api/Events";
import { getAverageRating } from "../api/EventAttendance";
import EventReview from "./EventReview";

interface EventAttendanceProps {
  setShowEventAttendance: Function;
  currentEvent: OfficeEvent;
  setAttendanceSuccess: Function;
  setAttendanceError: Function;
  setShowUnsubscribeMessage: Function;
  setShowUnsubscribeError: Function;
  getEvents: Function;
}

const EventAttendanceMenu = ({
  setShowEventAttendance,
  currentEvent,
  setAttendanceSuccess,
  setAttendanceError,
  setShowUnsubscribeMessage,
  setShowUnsubscribeError,
  getEvents
}: EventAttendanceProps): JSX.Element => {

  const [isAttending, setIsAttending] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [ratingCount, setRatingCount] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentEvent.kind === "event") {
      await AttendEvent(currentEvent.eventId, setAttendanceSuccess, setAttendanceError);
      setShowEventAttendance(false);
      getEvents();    
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
      getEvents();
    } else {
      setShowUnsubscribeError(true);
      setShowEventAttendance(false);
      getEvents();
    }
  };

  const checkIfAttending = async () => {
    const userId = await getUserId();
    const response = await checkUserRegistration(userId, currentEvent.eventId);
    setIsAttending(response);
  };

  const fetchAverageRating = async () => {
    try {
        const { averageRating, ratingCount } = await getAverageRating(currentEvent.eventId);
        setAverageRating(averageRating);
        setRatingCount(ratingCount);
    } catch (error) {
        console.error("Failed to fetch average rating:", error);
    }
  };

  useEffect(() => {
    checkIfAttending();
    fetchAverageRating();
  }, [currentEvent]);

  return (
    <div className="popup-overlay">
      <form className="popup-form-event">
        <h1>{currentEvent.title}</h1>
        {ratingCount > 0 ? 
          <p>Average rating: {averageRating} ({ratingCount} reviews)</p>
        :
          <p>No reviews yet</p>
        }
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