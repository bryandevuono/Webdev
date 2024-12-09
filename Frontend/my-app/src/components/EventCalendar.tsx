import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import toolBar from "./Toolbar";
import { GetAllEvents } from "../api/Events";

export interface Event {
  start: Date;
  end: Date;
  title: string;
}

export default function EventCalendar(): JSX.Element {
  const [Events, setEvents] = useState<Event[]>();

  const GetEvents = async () => {
    const AllEvents = await GetAllEvents();
    setEvents(AllEvents as Event[]);
  };

  useEffect(() => {
    GetEvents();
  }, []);

  return <Calendar events={Events} components={{ toolbar: toolBar }} />;
}
