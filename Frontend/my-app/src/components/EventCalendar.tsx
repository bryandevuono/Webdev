import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import CustomToolbar from "./Toolbar";
import { OfficeEvent } from "../api/Events";
import Legend from "./Legend";
import { Event } from "react-big-calendar";
import { getAllEvents } from "../api/Events";
import { GetAllOfficeAttendace, GetUserName } from "../api/OfficeAttendace";
import EventAttendance from "./EventAttendance";

export interface CalendarEvent extends Event {
  kind: string;
  start: Date;
  end: Date;
  title: string;
}

export default function EventCalendar(): JSX.Element {
  const [events, setEvents] = useState<CalendarEvent[]>();
  const [officeAttendance, setOfficeAttendance] = useState<CalendarEvent[]>();
  const [showEventAttendance, setShowEventAttendance] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | undefined>(undefined);
  const [currentView, setCurrentView] = useState('month');

  const [attendanceSuccess, setAttendanceSuccess] = useState(false);
  const [attendanceError, setAttendanceError] = useState(false);
  const [showUnsubscribeMessage, setShowUnsubscribeMessage] = useState(false);
  const [showUnsubscribeError, setShowUnsubscribeError] = useState(false);

  const getEvents = async () => {
    const AllEvents = await getAllEvents();
    setEvents(AllEvents as CalendarEvent[]);
  };

  const getOfficeAttendance = async () => {
    const AllOfficeAttendace = await GetAllOfficeAttendace();

    const convertedOfficeAttendace = await Promise.all(AllOfficeAttendace.map(async (attendance) => ({
      kind: 'office attendance',
      start: new Date(attendance.Start),
      end: new Date(attendance.End),
      title: await GetUserName(attendance.UserId),
    })));

    setOfficeAttendance(convertedOfficeAttendace as CalendarEvent[]);
  };

  const handleEventClick = (event: CalendarEvent) => {
    if (event.kind == 'event') {
      setCurrentEvent(event);
      setShowEventAttendance(true);
    }
  }

  useEffect(() => {
    getEvents();
    getOfficeAttendance();
  }, []);

  const makeEventCategories = (event: CalendarEvent) => {
    let backgroundColor = '';
    if (event.kind == 'event' && currentView == 'agenda') {
      backgroundColor = 'white';
    }
    if (event.kind == 'office attendance') {
      backgroundColor = 'grey';
    }
    return { style: { backgroundColor } };
  };

  return (
    <>
      <Calendar
        events={[...(events || []), ...(officeAttendance || [])]}
        components={{ toolbar: (props) => <CustomToolbar {...props} refreshOfficeAttendance={getOfficeAttendance} /> }}
        onSelectEvent={(event) => handleEventClick(event as CalendarEvent)}
        eventPropGetter={(event) => makeEventCategories(event as CalendarEvent)}
        onView={(view) => setCurrentView(view)}
      />

      <Legend/>
      
      {showEventAttendance ?
        <EventAttendance
          setShowEventAttendance={setShowEventAttendance}
          currentEvent={currentEvent as OfficeEvent}
          setAttendanceSuccess={setAttendanceSuccess}
          setAttendanceError={setAttendanceError}
          setShowUnsubscribeMessage={setShowUnsubscribeMessage}
          setShowUnsubscribeError={setShowUnsubscribeError}
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

      {showUnsubscribeMessage ? 
      <div className="popup-overlay">
        <div className="popup-form">
          <p>You have unsubscribed from this event</p>
          <button onClick={() => setShowUnsubscribeMessage(false)}>Close</button>
        </div> 
      </div>
      : null}

      {showUnsubscribeError ? 
        <div className="popup-overlay">
          <div className="popup-form">
            <p>There was an error unsubscribing from this event</p>
            <button onClick={() => setShowUnsubscribeError(false)}>Close</button>
          </div>
        </div>
      : null}
    </>
  );
}