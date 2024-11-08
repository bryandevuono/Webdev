import moment from "moment";
import Calendar from "./Calendar";

interface Event {
    start: Date;
    end: Date;
    title: string;
    }

const events: Array<Event> = [
  {
    start: moment("2023-03-18T10:00:00").toDate(),
    end: moment("2023-03-18T11:00:00").toDate(),
    title: "In the office",
  },
  {
    start: moment("2023-03-18T14:00:00").toDate(),
    end: moment("2023-03-18T15:30:00").toDate(),
    title: "ENT Appsointment",
  },
];

export default function EventCalendar() {
  return <Calendar events={events} />;
}