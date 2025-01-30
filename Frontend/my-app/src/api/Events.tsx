import { Event } from "react-big-calendar";
import { CalendarEvent } from "../components/EventCalendar";
import { checkUserRegistration } from "./AttendEvent";
import { getUserId } from "./Login";

export type OfficeEvent = CalendarEvent & {
  kind: "event";
  eventId: string;
  description?: string;
  location?: string;
  date?: string;
};

export const getAllEvents = async (
  checkIfAttending: boolean
): Promise<Array<Event>> => {
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
  let Events: Array<Event> = [];

  for (let i = 0; i < data.length; i++) {
    const EventToAdd: OfficeEvent = {
      Id: data[i].id,
      kind: "event",
      start: new Date(data[i].startTime),
      end: new Date(data[i].endTime),
      title: data[i].title,
      eventId: data[i].id,
      description: data[i].description,
      location: data[i].location,
      date: data[i].date,
    };
    if (
      checkIfAttending &&
      (await checkUserRegistration(await getUserId(), data[i].id))
    ) {
      Events = [...Events, EventToAdd];
    } else if (
      checkIfAttending &&
      !(await checkUserRegistration(await getUserId(), data[i].id))
    ) {
      continue;
    } else {
      Events = [...Events, EventToAdd];
    }
  }
  return Events;
};

export type EventRequestBody = {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
};

export const editEvent = async (
  eventId: string,
  eventInfo: EventRequestBody
): Promise<boolean> => {
  const response = await fetch(
    `http://localhost:5053/api/events/EditEvent?Id=${eventId}`,
    {
      method: "PUT",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventInfo),
    }
  );
  console.log(response);
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export const deleteEvent = async (eventId: string): Promise<boolean> => {
  const response = await fetch(
    `http://localhost:5053/api/events/DeleteEvent/${eventId}`,
    {
      method: "DELETE",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  if (response.ok) {
    console.log("deleted event");
    return true;
  } else {
    return false;
  }
};

export const addEvent = async (
  eventInfo: EventRequestBody
): Promise<boolean> => {
  const response = await fetch("http://localhost:5053/api/events/AddEvent", {
    method: "POST",
    credentials: "include" as RequestCredentials,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventInfo),
  });
  console.log(response);
  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export const getEvent = async (eventId: string): Promise<OfficeEvent> => {
  const response = await fetch(
    `http://localhost:5053/api/events?Id=${eventId}`,
    {
      method: "GET",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  const Event: OfficeEvent = {
    Id: data.id,
    kind: "event",
    start: new Date(data.startTime),
    end: new Date(data.endTime),
    title: data.title,
    eventId: data.id,
  };
  return Event;
};

export const getEventReviews = async (
  eventId: string
): Promise<Array<string>> => {
  const response = await fetch(
    `http://localhost:5053/api/events/reviews/${eventId}`,
    {
      method: "GET",
      credentials: "include" as RequestCredentials,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  let Reviews: Array<string> = [];

  for (let i = 0; i < data.length; i++) {
    Reviews = [...Reviews, data[i]];
  }
  return Reviews;
};
