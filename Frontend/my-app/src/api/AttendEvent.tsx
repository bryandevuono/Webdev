import { Event } from "react-big-calendar";
import { getUserId } from "./Login";
import { getEventId } from "./Events";

type AttendEventBody = {
    UserId: string,
    EventId: string,
    Rating: string,
    FeedBack: string
}

export const AttendEvent = async (event: string, setAttendanceSuccess:Function, setAttendanceError: Function): Promise<boolean> => {
    console.log(await getEventId(event));
    const body: AttendEventBody = {
        UserId: await getUserId(),
        EventId: await getEventId(event),
        Rating: "",
        FeedBack: ""
    }

    const requestOptions = {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
    console.log(requestOptions.body);
  const response = await fetch("http://localhost:5053/api/eventattendance/attend", requestOptions);
  
  if (response.ok) {
    setAttendanceSuccess(true);
    return true;
  } else {
    setAttendanceError(true);
    return false;
  }
};