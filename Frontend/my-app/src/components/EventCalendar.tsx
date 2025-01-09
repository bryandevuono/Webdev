import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import toolBar from "./Toolbar";
import {Event as BigCalendarEvent} from "react-big-calendar";
import { getAllEvents } from "../api/Events";
import { GetAllOfficeAttendace, GetUserName } from "../api/OfficeAttendace";
import EventAttendance from "./EventAttendance";

export interface CalendarEvent {
  start: Date;
  end: Date;
  title: string;
}

export default function EventCalendar(): JSX.Element {
  const [events, setEvents] = useState<CalendarEvent[]>();
  const [officeAttendace, setOfficeAttendace] = useState<CalendarEvent[]>();
  const [showEventAttendance, setShowEventAttendance] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<BigCalendarEvent|undefined> (undefined);
  
  const [attendanceSuccess, setAttendanceSuccess] = useState(false);
  const [attendanceError, setAttendanceError] = useState(false);

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

  const handleEventClick = (event: BigCalendarEvent) => {
    setCurrentEvent(event);
    setShowEventAttendance(true);
  }

  useEffect(() => {
    getEvents();
    getOfficeAttendace();
  }, []);

  return (
    <>
      <Calendar 
        events={[...(events || []), ...(officeAttendace || [])]} 
        components={{ toolbar: toolBar }} 
        onSelectEvent={(event) => handleEventClick(event)}
      />

      {showEventAttendance ?
        <EventAttendance 
          setShowEventAttendance={setShowEventAttendance}
          currentEvent={currentEvent as CalendarEvent}
          setAttendanceSuccess={setAttendanceSuccess}
          setAttendanceError={setAttendanceError}
        />
      : null}

      {attendanceSuccess ? 
        <div className="popup-overlay">
          <div className="popup-form">
            <p>You are now attending this event!</p>
            <button onClick={() => setAttendanceSuccess(false)}>Close</button>
          </div>
        </div>
      : null}

      {attendanceError ? 
        <div className="popup-overlay">
          <div className="popup-form">
            <p>There was an error attending this event!</p>
            <p>Check if you already registered for this event.</p>
            <button onClick={() => setAttendanceError(false)}>Close</button>
          </div>
        </div>
      : null}
    </>
  );
}
