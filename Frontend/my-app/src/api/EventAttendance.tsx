export const getEventAttendees = async (
  eventId: string
): Promise<{ userId: string }[]> => {
  const response = await fetch(
    `http://localhost:5053/api/eventattendance/${eventId}/attendees`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch attendees");
  }
  return response.json();
};

export type Review = {
  starRating: number;
  review: string;
};

export const ReviewEvent = async (
  id: string,
  review: Review
): Promise<boolean> => {
  const response = await fetch(
    `http://localhost:5053/api/eventattendance/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }
  );
  if (!response.ok) {
    return false;
  } else {
    return true;
  }
};
