export type Event = {
  Title: string;
  Description: string;
  Date: string;
  StartTime: string;
  EndTime: string;
  Location: string;
  AdminAproval: boolean;
};

export const postEvent = async (event: Event): Promise<void> => {
  const url = "http://localhost:5053/api/events/AddEvent";

  event.Date = `${event.Date}T00:00:00Z`;
  event.StartTime = `${event.Date}T${event.StartTime}:00Z`;
  event.EndTime = `${event.Date}T${event.EndTime}:00Z`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (response.status == 200) {
      console.log("Event posted successfully");
    } else {
      throw new Error("Error posting event");
    }
  } catch (error) {
    console.error("Error posting event:", error);
  }
};
