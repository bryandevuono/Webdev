import { Event } from "react-big-calendar";
import moment from "moment";

export const getAllEvents = async (): Promise<Array<Event>> => {
  const response = await fetch(
    "http://localhost:5053/api/events/GetAllEvents",
    {
      method: "GET",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  const Events: Array<Event> = [];

  for (let i = 0; i < data.length; i++) {
    const EventToAdd: Event = {
      start: new Date(data[i].startTime),
      end: new Date(data[i].endTime),
      title: data[i].title,
    };
    Events.push(EventToAdd);
  }
  return Events;
};

export const GetEvent = async (eventTitle: string): Promise<Event> => {
  const response = await fetch(
    `http://localhost:5053/api/events/GetEvent?Title=${eventTitle}`,
    {
      method: "GET",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  const Event: Event = {
    start: new Date(data.startTime),
    end: new Date(data.endTime),
    title: data.title,
  };

  return Event;
};

export type EventRequestBody = {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
};

export const editEvent = async (
  eventTitle: string,
  eventInfo: EventRequestBody
): Promise<boolean> => {
  const response = await fetch(
    `http://localhost:5053/api/events/EditEvent?Title=${eventTitle}`,
    {
      method: "PUT",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventInfo),
    }
  );

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
