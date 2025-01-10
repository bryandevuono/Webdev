import { Event } from "react-big-calendar";
import { getUserId } from "./Login";

type AttendEventBody = {
  UserId: string,
  EventId: string,
  Rating: string,
  FeedBack: string
}

export const AttendEvent = async (eventId: string, setAttendanceSuccess:Function, setAttendanceError: Function): Promise<boolean> => {
    const body: AttendEventBody = {
        UserId: await getUserId(),
        EventId: eventId,
        Rating: "",
        FeedBack: ""
    }

    const requestOptions = {
        method: 'POST',
        credentials: 'include' as RequestCredentials,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
    
  const response = await fetch("http://localhost:5053/api/eventattendance/attend", requestOptions);
  
  if (response.ok) {
    setAttendanceSuccess(true);
    return true;
  } else {
    setAttendanceError(true);
    return false;
  }
};