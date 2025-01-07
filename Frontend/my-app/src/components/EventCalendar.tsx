import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { momentLocalizer } from "react-big-calendar";
import toolBar from "./Toolbar";
import moment from "moment";
import { getAllEvents } from "../api/Events";

export interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
}
const localizer = momentLocalizer(moment);

export default function EventCalendar(): JSX.Element {
  const [events, setEvents] = useState<CalendarEvent[]>();

  const getEvents = async () => {
    const AllEvents = await getAllEvents();
    setEvents(AllEvents as CalendarEvent[]);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return <Calendar events={events} components={{ toolbar: toolBar }} />;
}
