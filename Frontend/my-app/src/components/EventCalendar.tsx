import moment from "moment";
import Calendar from "./Calendar";
import toolBar from "./Toolbar"

interface Event {
  start: Date;
  end: Date;
  title: string;
}

const events: Array<Event> = [// list would be created with the api later
  {
    start: moment("2024-11-18T10:00:00").toDate(),
    end: moment("2024-11-18T11:10:00").toDate(),
    title: "In the office",
  }
];

export default function EventCalendar(): JSX.Element {
  return <Calendar events={events} components={{toolbar: toolBar}}/>;
}