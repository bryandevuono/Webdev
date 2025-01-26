import React, { useEffect, useState } from "react";
import { checkUserRegistration, AttendEvent } from "../api/AttendEvent";
import { UnsubscribeEvent } from "../api/UnsubscribeEvent";
import { getUserId } from "../api/Login";
import { OfficeEvent, getEventReviews } from "../api/Events";
import { getAverageRating } from "../api/EventAttendance";
import EventReview from "./EventReview";

import ShowEventReview from "./ShowEventReview";
import { get } from "http";

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
  getEvents,
}: EventAttendanceProps): JSX.Element => {
  const [isAttending, setIsAttending] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [ratingCount, setRatingCount] = useState<number>(0);

  const [EventReviews, setEventReviews] = useState<string[]>([]);

  const showReviewAsReview = (reviews: string[]) => {
    return reviews
      .filter((reviewString) => {
        const [rating, review] = reviewString.split(":");
        return rating && review;
      })
      .map((reviewString, index) => {
        const [rating, review] = reviewString.split(":");
        return (
          <ShowEventReview
            key={index}
            rating={parseInt(rating, 10)}
            review={review}
          />
        );
      });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentEvent.kind === "event") {
      await AttendEvent(
        currentEvent.eventId,
        setAttendanceSuccess,
        setAttendanceError
      );
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
      const { averageRating, ratingCount } = await getAverageRating(
        currentEvent.eventId
      );
      setAverageRating(averageRating);
      setRatingCount(ratingCount);
    } catch (error) {
      console.error("Failed to fetch average rating:", error);
    }
  };

  const getReviews = async () => {
    const reviews = await getEventReviews(currentEvent.eventId);
    setEventReviews(reviews);
  };

  useEffect(() => {
    checkIfAttending();
    fetchAverageRating();
    getReviews();
  }, [currentEvent]);

  return (
    <div className="popup-overlay">
      <form className="popup-form-event">
        <div className="event-top">
          <h1>{currentEvent.title}</h1>
        </div>
        <div className="event-bottom">
          <div className="event-reviews">
            {ratingCount > 0 ? (
              <>
                <p>
                  <b>Average rating:</b> {averageRating?.toFixed(2)} (
                  {ratingCount} reviews)
                </p>
                <div className="event-reviews-list">
                  {showReviewAsReview(EventReviews)}
                </div>
              </>
            ) : (
              <p>No reviews yet</p>
            )}
          </div>
          <div className="event-info">
            <p>
              <b>Description:</b> {currentEvent.description}
            </p>
            <p>
              <b>Location:</b> {currentEvent.location}
            </p>
            <p>
              <b>Date:</b> {String(currentEvent.start)}
            </p>
          </div>
          <div className="event-buttons">
            {isAttending ? (
              <>
                <button onClick={handleReviewClick}>Leave a review</button>
                <button onClick={handleUnsubscribe}>Unsubscribe</button>
              </>
            ) : (
              <button onClick={handleSubmit}>Attend this Event</button>
            )}

            <button onClick={() => setShowEventAttendance(false)}>
              Cancel
            </button>
          </div>
        </div>
      </form>

      {showReview ? (
        <EventReview
          currentEvent={currentEvent}
          setShowReview={setShowReview}
          setEventMenu={setShowEventAttendance}
          updateReviews={getReviews}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default EventAttendanceMenu;
