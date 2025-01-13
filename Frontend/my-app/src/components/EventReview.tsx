import React from "react";
import { OfficeEvent } from "../api/Events";
import "../App.css"; // Import the CSS file

interface EventReviewProps {
  currentEvent: OfficeEvent;
  setShowReview: Function;
  setEventMenu: Function;
}

const EventReview = ({ currentEvent, setShowReview, setEventMenu }: EventReviewProps): JSX.Element => {
  const handleReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEventMenu(false);
    setShowReview(false);
  };

  return (
    <div className="popup-overlay">
      <form className="popup-form" onSubmit={handleReview}>
        <h1>{currentEvent.title}</h1>
        <p>Choose a rating (1-5): </p>

        <div className="star-rating">
          <input type="radio" id="1" name="star-rating" value={1} />
          <label htmlFor="1">1★</label>
          <input type="radio" id="2" name="star-rating" value={2} />
          <label htmlFor="2">2★</label>
          <input type="radio" id="3" name="star-rating" value={3} />
          <label htmlFor="3">3★</label>
          <input type="radio" id="4" name="star-rating" value={4} />
          <label htmlFor="4">4★</label>
          <input type="radio" id="5" name="star-rating" value={5} />
          <label htmlFor="5">5★</label>
        </div>

        <br/>

        <textarea
          name="review"
          rows={5}
          cols={50}
          placeholder="What did you think about this event?"
        />
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setShowReview(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default EventReview;
