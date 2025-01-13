import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import toolBar from "./Toolbar";
import { OfficeEvent } from "../api/Events";
import Legend from "./Legend";
import { Event } from "react-big-calendar";
import { getAllEvents } from "../api/Events";
import { GetAllOfficeAttendace, GetUserName } from "../api/OfficeAttendace";
import { UnsubscribeEvent } from "../api/UnsubscribeEvent";
import EventAttendance from "./EventAttendance";
import { getUserId } from "../api/Login";
import { checkUserRegistration } from "../api/AttendEvent";

export interface CalendarEvent extends Event {
  kind: string;
  start: Date;
  end: Date;
  title: string;
  eventId: string;
}

export default function EventCalendar(): JSX.Element {
  const [events, setEvents] = useState<CalendarEvent[]>();
  const [officeAttendace, setOfficeAttendace] = useState<CalendarEvent[]>();
  const [showEventAttendance, setShowEventAttendance] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<CalendarEvent | undefined>(
    undefined
  );
  const [currentView, setCurrentView] = useState("month");

  const [attendanceSuccess, setAttendanceSuccess] = useState(false);
  const [attendanceError, setAttendanceError] = useState(false);

  const [unsubscribeSuccess, setUnsubscribeSuccess] = useState(false);
  const [unsubscribeError, setUnsubscribeError] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const getEvents = async () => {
    const AllEvents = await getAllEvents();
    setEvents(AllEvents as CalendarEvent[]);
  };

  const getOfficeAttendace = async () => {
    const AllOfficeAttendace = await GetAllOfficeAttendace();

    const convertedOfficeAttendace = await Promise.all(
      AllOfficeAttendace.map(async (attendance) => ({
        kind: "office attendance",
        start: new Date(attendance.Start),
        end: new Date(attendance.End),
        title: await GetUserName(attendance.UserId),
      }))
    );

    setOfficeAttendace(convertedOfficeAttendace as CalendarEvent[]);
  };

  const handleEventClick = async (event: CalendarEvent) => {
    if(event.kind == 'event') {
        const userId = await getUserId();
        try{ 
        const isUserRegistered = await checkUserRegistration(userId, event.eventId);
        setIsRegistered(isUserRegistered);
        setCurrentEvent(event);
        setShowEventAttendance(true);
        } catch (err) {
          console.error(err);
          setAttendanceError(true);
        }
    }
  };

  useEffect(() => {
    getEvents();
    getOfficeAttendace();
  }, []);

  const makeEventCategories = (event: CalendarEvent) => {
    let backgroundColor = "";
    if (event.kind == "event" && currentView == "agenda") {
      backgroundColor = "white";
    }
    if (event.kind == "office attendance") {
      backgroundColor = "lightgrey";
    }
    return { style: { backgroundColor } };
  };

  return (
    <>
      <Calendar
        events={[...(events || []), ...(officeAttendace || [])]}
        components={{ toolbar: toolBar }}
        onSelectEvent={(event) => handleEventClick(event as CalendarEvent)}
        eventPropGetter={(event) => makeEventCategories(event as CalendarEvent)}
        onView={(view) => setCurrentView(view)}
      />

      <Legend />

      {showEventAttendance ? (
        <EventAttendance
          setShowEventAttendance={setShowEventAttendance}
          currentEvent={currentEvent as OfficeEvent}
          setAttendanceSuccess={setAttendanceSuccess}
          setAttendanceError={setAttendanceError}
          setUnsubscribeSuccess={setUnsubscribeSuccess}
          setUnsubscribeError={setUnsubscribeError}
          isRegistered={isRegistered}
        />
      ) : null}

      {attendanceSuccess ? (
        <div className="popup-overlay">
          <div className="popup-form">
            <p>You are now attending this event!</p>
            <button onClick={() => setAttendanceSuccess(false)}>Close</button>
          </div>
        </div>
      ) : null}

      {attendanceError ? (
        <div className="popup-overlay">
          <div className="popup-form">
            <p>There was an error attending this event!</p>
            <p>Check if you already registered for this event.</p>
            <button onClick={() => setAttendanceError(false)}>Close</button>
          </div>
        </div>
      ) : null}
        
        {unsubscribeSuccess ? 
        <div className="popup-overlay">
          <div className="popup-form">
            <p>You have successfully unsubscribed from this event!</p>
            <button onClick={() => setUnsubscribeSuccess(false)}>Close</button>
          </div>
        </div>
      : null}

      {unsubscribeError ? 
        <div className="popup-overlay">
          <div className="popup-form">
            <p>There was an error unsubscribing from this event!</p>
            <button onClick={() => setUnsubscribeError(false)}>Close</button>
          </div>
        </div>
      : null}
    </>
  );
}
