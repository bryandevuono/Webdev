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

export const updateEventAttendance = async (
  eventId: string,
  userId: string,
  rating: string,
  feedback: string
): Promise<boolean> => {
  const body = JSON.stringify({ userId, eventId, rating, feedback });
  const response = await fetch(`http://localhost:5053/api/eventattendance`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export const getEventAttendanceId = async (
  eventId: string,
  userId: string
): Promise<string> => {
  const response = await fetch(
    `http://localhost:5053/api/eventattendance/getid/${userId}/${eventId}`
  );
  if (!response.ok) {
    return "";
  }
  return response.json();
};

export type Review = {
  userId: string;
  eventId: string;
  Rating: string;
  FeedBack: string;
};

export const ReviewEvent = async (review: Review): Promise<boolean> => {
  const response = await fetch(`http://localhost:5053/api/eventattendance`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  if (!response.ok) {
    return false;
  } else {
    return true;
  }
};

export const getAverageRating = async (eventId: string): Promise<{ averageRating: number, ratingCount: number }> => {
  const response = await fetch(`http://localhost:5053/api/eventattendance/averageRating/${eventId}`);
  const data = await response.json();
  return {averageRating: data.averageRating, ratingCount: data.ratingCount};
};