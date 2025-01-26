import "../EventReview.css";

interface ShowEventReviewProps {
  rating: number;
  review: string;
}

const ShowEventReview = ({
  rating,
  review,
}: ShowEventReviewProps): JSX.Element => {
  const maxRating = 5;
  return (
    <div className="event-review">
      <h3>Review</h3>
      <p>
        <b>Rating:</b>
        {Array.from({ length: maxRating }).map((_, index) => (
          <span key={index}>{index < rating ? "⭐" : ""} </span>
        ))}
      </p>
      <p className="event-review-review">
        <b>Review:</b> {review}
      </p>
    </div>
  );
};

export default ShowEventReview;
