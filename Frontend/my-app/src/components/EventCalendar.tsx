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

const AddEvent = async () => {
  try {
    const response = await fetch("http://localhost:5053/api/events/AddEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Title: "title",
        Description: "lorem ipsum",
        Date: "2004-02-09T00:00:00Z",
        StartTime: "2024-11-11T09:00:00Z",
        EndTime: "2024-11-11T11:00:00Z",
        Location: "New York",
        AdminAproval: true
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export default function EventCalendar(): JSX.Element {
  return <Calendar events={events} components={{ toolbar: toolBar }} />;
}