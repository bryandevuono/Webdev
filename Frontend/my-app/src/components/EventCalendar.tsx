import moment from "moment";
import Calendar from "./Calendar";
import toolBar from "./Toolbar";
import { useState, useEffect } from "react";
import { fetchOfficeAttendance } from "../api/OfficeAttendance";
import { fetchEventAttendance } from "../api/EventAttendance";

interface Event {
  start: Date;
  end: Date;
  title: string;
}

export default function EventCalendar(): JSX.Element {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadOfficeAttendance();
    loadEventAttendance();
  }, []);

  const loadOfficeAttendance = async () => {
    try {
      const officeAttendance = await fetchOfficeAttendance();

      const mappedEvents: Event[] = officeAttendance.map((attendanceItem) => ({
        start: new Date(attendanceItem.start),
        end: new Date(attendanceItem.end),
        title: `Office Attendance`,
      }));

      setEvents(mappedEvents);
    } catch (error) {
      console.error("Error fetching office attendance:", error);
    }
  };

  const loadEventAttendance = async () => {
    try {
      const eventAttendance = await fetchEventAttendance();

      const mappedEvents: Event[] = eventAttendance.map((attendanceItem) => ({
        start: new Date(attendanceItem.start),
        end: new Date(attendanceItem.end),
        title: `Event Attendance`,
      }));

      setEvents(mappedEvents);
    } catch (error) {
      console.error("Error fetching event attendance:", error);
    }
  };

  return <Calendar events={events} components={{ toolbar: toolBar }} />;
}
