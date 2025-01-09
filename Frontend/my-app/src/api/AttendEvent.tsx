import { Event } from "react-big-calendar";
import { getUserId } from "./Login";
import { getEventId } from "./Events";

type AttendEventBody = {
    UserId: string,
    EventId: string,
    Rating: string,
    FeedBack: string
}

export const AttendEvent = async (event: string): Promise<boolean> => {
    console.log(event);
    const body: AttendEventBody = {
        UserId: await getUserId(),
        EventId: await getEventId(event as string),
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
    console.log(response);
    return true;
  } else {
    return false;
  }
};