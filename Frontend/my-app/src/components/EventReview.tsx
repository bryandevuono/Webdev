import React from "react";
import { useState } from "react";
import { EventAttendance, AddFeedback } from "../api/EventAttendance";

interface EventReviewProps {
  currentEvent: string;
  setShowPopup: Function;
}

const EventReview = ({
  currentEvent,
  setShowPopup,
}: EventReviewProps): JSX.Element => {
  const handleExit = () => {
    setShowPopup(false);
  };

  const handleReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // review event

    setShowPopup(false);
  };

  return (
    <div className="event-details">
      <div className="event-details-top">
        <h1>{currentEvent}</h1>
        <button className="exit-button" onClick={handleExit}>
          X
        </button>
      </div>
      <div className="event-details-bottom">
        <p>Event details</p>
        <div className="review">
          <h4>Give this event a review</h4>
          <form onSubmit={handleReview}>
            <label htmlFor="1">1</label>
            <input type="radio" id="1" name="star-rating" value={1} />
            <label htmlFor="2">2</label>
            <input type="radio" id="2" name="star-rating" value={2} />
            <label htmlFor="3">3</label>
            <input type="radio" id="3" name="star-rating" value={3} />
            <label htmlFor="4">4</label>
            <input type="radio" id="4" name="star-rating" value={4} />
            <label htmlFor="5">5</label>
            <input type="radio" id="5" name="star-rating" value={5} />
            <textarea
              rows={5}
              cols={50}
              placeholder="What did you think about this event?"
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