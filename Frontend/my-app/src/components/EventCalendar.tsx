import {useEffect, useState} from 'react'
import moment from "moment";
import Calendar from "./Calendar";
import toolBar from "./Toolbar"
import { GetAllEvents } from "../api/Events";

interface Event {
  start: Date;
  end: Date;
  title: string;
}


export default function EventCalendar(): JSX.Element {
  const [Events, setEvents] = useState<Event[]>();

  const GetEvents = async () => {
    const AllEvents = await GetAllEvents();
    setEvents(AllEvents);
  }

  useEffect(() => {
    GetEvents()
  }, []);

  return <Calendar events={Events} components={{ toolbar: toolBar }} />;
}