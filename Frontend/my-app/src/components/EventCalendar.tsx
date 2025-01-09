import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { momentLocalizer } from "react-big-calendar";
import toolBar from "./Toolbar";
import moment from "moment";
import { getAllEvents } from "../api/Events";
import { GetAllOfficeAttendace, GetUserName } from "../api/OfficeAttendace";
import EventAttendance from "./EventAttendance";

export interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
}
const localizer = momentLocalizer(moment);

export default function EventCalendar(): JSX.Element {
  const [events, setEvents] = useState<CalendarEvent[]>();
  const [officeAttendace, setOfficeAttendace] = useState<CalendarEvent[]>();
  const [showEventAttendance, setShowEventAttendance] = useState(false);

  const getEvents = async () => {
    const AllEvents = await getAllEvents();
    setEvents(AllEvents as CalendarEvent[]);
  };

  const getOfficeAttendace = async () => {
    const AllOfficeAttendace = await GetAllOfficeAttendace();
    const convertedOfficeAttendace = await Promise.all(AllOfficeAttendace.map(async (attendance) => ({
      start: new Date(attendance.Start),
      end: new Date(attendance.End),
      title: await GetUserName(attendance.UserId),
    })));
    setOfficeAttendace(convertedOfficeAttendace as CalendarEvent[]);
  };

  useEffect(() => {
    getEvents();
    getOfficeAttendace();
  }, []);

  return (
    <>
      <Calendar 
        events={[...(events || []), ...(officeAttendace || [])]} 
        components={{ toolbar: toolBar }} 
        onSelectEvent={() => setShowEventAttendance(true)}
      />

      {showEventAttendance ?
        <EventAttendance setShowEventAttendance={setShowEventAttendance}/>
      : null}
    </>
  );
}
