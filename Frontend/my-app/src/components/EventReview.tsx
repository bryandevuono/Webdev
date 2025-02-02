import React from "react";
import { useState } from "react";
import { Review, ReviewEvent } from "../api/EventAttendance";
import { OfficeEvent } from "../api/Events";
import { getUserId } from "../api/Login";

interface EventReviewProps {
  currentEvent: OfficeEvent;
  setShowReview: Function;
  setEventMenu: Function;
  updateReviews: () => void;
}

const EventReview = ({
  currentEvent,
  setShowReview,
  updateReviews,
}: EventReviewProps): JSX.Element => {
  const [starRating, setStarRating] = useState("");
  const [review, setReview] = useState("");

  const handleExit = () => {
    setShowReview(false);
  };

  const handleReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userId = await getUserId();
    const eventId = currentEvent.eventId;

    const reviewInfo: Review = {
      userId: userId,
      eventId: eventId,
      Rating: starRating,
      FeedBack: review,
    };

    if ((await ReviewEvent(reviewInfo)) === false) {
      alert("Failed to submit review");
    } else {
      alert("Review submitted");
      updateReviews();
    }

    setShowReview(false);
  };

  return (
    <div className="event-details">
      <div className="event-details-top">
        <h1>{currentEvent.title}</h1>
        <button className="exit-button" onClick={handleExit}>
          X
        </button>
      </div>

      <div className="event-details-bottom">
        <div className="review">
          <h4>Give this event a review</h4>
          <form onSubmit={handleReview}>
            <label htmlFor="1">1⭐</label>
            <input
              type="radio"
              id="1"
              name="star-rating"
              value={1}
              onChange={(e) => setStarRating(e.target.value)}
            />
            <label htmlFor="2">2⭐</label>
            <input
              type="radio"
              id="2"
              name="star-rating"
              value={2}
              onChange={(e) => setStarRating(e.target.value)}
            />
            <label htmlFor="3">3⭐</label>
            <input
              type="radio"
              id="3"
              name="star-rating"
              value={3}
              onChange={(e) => setStarRating(e.target.value)}
            />
            <label htmlFor="4">4⭐</label>
            <input
              type="radio"
              id="4"
              name="star-rating"
              value={4}
              onChange={(e) => setStarRating(e.target.value)}
            />
            <label htmlFor="5">5⭐</label>
            <input
              type="radio"
              id="5"
              name="star-rating"
              value={5}
              onChange={(e) => setStarRating(e.target.value)}
            />
            <br />
            <textarea
              rows={5}
              cols={50}
              maxLength={150}
              placeholder="What did you think about this event?"
              onChange={(e) => setReview(e.target.value)}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventReview;
