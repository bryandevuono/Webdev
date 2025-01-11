export type EventAttendance = {
  id: string;
  eventId: string;
  userId: string;
  attendedOn: string;
  feedback: string;
  rating: string;
};

export const AddFeedback = async (
  eventAttendance: EventAttendance
): Promise<boolean> => {
  const response = await fetch("http://localhost:5053/api/EventAttendance/", {
    method: "POST",
    credentials: "include" as RequestCredentials,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventAttendance),
  });

  const data = await response.json();
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
